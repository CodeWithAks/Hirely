import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant.js'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const companyArray = [];

const PostJobs = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });

    const [loading,setLoading] = useState(false);

    const { companies } = useSelector(store => store.company);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase()==value);
        setInput({...input,companyId:selectedCompany._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);
        try {
            const res = await axios.post(`${JOB_API_END_POINT}/post`,input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
                    <div className='grid grid-cols-2 gap-2'>
                        {/* Title */}
                        <div>
                            <Label>Title</Label>
                            <Input type="text" name="title" value={input.title} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visibile:ring-0 my-1" />
                        </div>

                        {/* Description */}
                        <div>
                            <Label>Description</Label>
                            <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visibile:ring-0 my-1" />
                        </div>

                        {/* Requirements */}
                        <div>
                            <Label>Requirements</Label>
                            <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visibile:ring-0 my-1" />
                        </div>

                        {/* Salary */}
                        <div>
                            <Label>Salary</Label>
                            <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visibile:ring-0 my-1" />
                        </div>

                        {/* Location */}
                        <div>
                            <Label>Location</Label>
                            <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visibile:ring-0 my-1" />
                        </div>

                        {/* Job Type */}
                        <div>
                            <Label>Job Type</Label>
                            <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visibile:ring-0 my-1" />
                        </div>

                        {/* Experience Level */}
                        <div>
                            <Label>Experience Level</Label>
                            <Input type="number" name="experience" value={input.experience} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visibile:ring-0 my-1" />
                        </div>

                        {/* Position */}
                        <div>
                            <Label>No.of Position</Label>
                            <Input type="number" name="position" value={input.position} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visibile:ring-0 my-1" />
                        </div>
                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler} >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company)=> {
                                                    return(
                                                        <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                    )
                                                })
                                            }
                                            <SelectItem  />
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    {/* <Button className="w-full mt-4">Post New Job</Button> */}
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className="w-full my-4">Post New Job</Button>
                    }

                    {
                        companies.length == 0 && <p className='text-sm text-red-500 font-bold text-center my-3'>*Please register a company first, before posting a job</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJobs
// import React, { useState } from "react";
// import Navbar from "../shared/Navbar";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";

// const PostJobs = () => {
//   const [input, setInput] = useState({
//     title: "",
//     description: "",
//     requirements: "",
//     salary: "",
//     location: "",
//     jobType: "",
//     experience: "",
//     position: "",
//     companyId: "",
//   });

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     console.log(input);
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//         <form
//           onSubmit={submitHandler}
//           className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8"
//         >
//           {/* Heading */}
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//             Post a New Job
//           </h2>

//           {/* Job Title */}
//           <div className="mb-4">
//             <Label>Job Title</Label>
//             <Input
//               type="text"
//               name="title"
//               value={input.title}
//               onChange={changeEventHandler}
//               placeholder="Frontend Developer"
//               className="mt-1"
//             />
//           </div>

//           {/* Description */}
//           <div className="mb-4">
//             <Label>Job Description</Label>
//             <Input
//               type="text"
//               name="description"
//               value={input.description}
//               onChange={changeEventHandler}
//               placeholder="Describe the role and responsibilities"
//               className="mt-1"
//             />
//           </div>

//           {/* Requirements */}
//           <div className="mb-4">
//             <Label>Requirements</Label>
//             <Input
//               type="text"
//               name="requirements"
//               value={input.requirements}
//               onChange={changeEventHandler}
//               placeholder="React, Tailwind, REST APIs"
//               className="mt-1"
//             />
//           </div>

//           {/* Grid Section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div>
//               <Label>Salary</Label>
//               <Input
//                 type="text"
//                 name="salary"
//                 value={input.salary}
//                 onChange={changeEventHandler}
//                 placeholder="₹6-10 LPA"
//                 className="mt-1"
//               />
//             </div>

//             <div>
//               <Label>Location</Label>
//               <Input
//                 type="text"
//                 name="location"
//                 value={input.location}
//                 onChange={changeEventHandler}
//                 placeholder="Bangalore / Remote"
//                 className="mt-1"
//               />
//             </div>

//             <div>
//               <Label>Job Type</Label>
//               <Input
//                 type="text"
//                 name="jobType"
//                 value={input.jobType}
//                 onChange={changeEventHandler}
//                 placeholder="Full-time / Internship"
//                 className="mt-1"
//               />
//             </div>

//             <div>
//               <Label>Experience</Label>
//               <Input
//                 type="text"
//                 name="experience"
//                 value={input.experience}
//                 onChange={changeEventHandler}
//                 placeholder="0-2 years"
//                 className="mt-1"
//               />
//             </div>
//           </div>

//           {/* Positions */}
//           <div className="mb-6">
//             <Label>Number of Positions</Label>
//             <Input
//               type="number"
//               name="position"
//               value={input.position}
//               onChange={changeEventHandler}
//               placeholder="2"
//               className="mt-1"
//             />
//           </div>

//           {/* Submit Button */}
//           <Button type="submit" className="w-full text-lg">
//             Post Job
//           </Button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default PostJobs;
