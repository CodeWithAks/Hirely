import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { RadioGroup } from "@/components/ui/radio-group"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'

const Signup = () => {

    const [input, setInput] = useState({ //form ka sara data yha store hoga 
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const navigate = useNavigate(); //dusre pg pe jaane k liye 
    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        console.log(e.target.name);  //vo specific field(fullname,email)
        console.log(e.target.value);  //jo value usmein humne add kri h (fullname->"Akshara")
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();   //pg reload hone se rokta h


        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });
            if (res.data.success) {  //agr data mil gya to
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
                toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }

    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4'>
                <form onSubmit={submitHandler} className='w-full md:w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>

                    {/* full name */}
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input type="text" placeholder="Akshara Goyal" value={input.fullname} name="fullname" onChange={changeEventHandler} ></Input>
                    </div>

                    {/* email */}
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type="email" placeholder="aks123@email.com" value={input.email} name="email" onChange={changeEventHandler}></Input>
                    </div>

                    {/* Phone Number */}
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input type="text" placeholder="8957859348" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler}></Input>
                    </div>

                    {/* Password */}
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password" placeholder="Enter your password" value={input.password} name="password" onChange={changeEventHandler}></Input>
                    </div>

                    {/* Role Selection */}
                    <div className='flex items-center justify-between'>
                        <RadioGroup className='flex items-center gap-4 my-5'>
                            <div className="flex items-center gap-3">
                                <Input type="radio" name="role" value="student" className="cursor-pointer"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Input type="radio" name="role" value="recruiter" className="cursor-pointer"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Profile */}
                    <div className='flex flex-col space-y-1 w-full'>
                        <Label className="text-gray-700 font-medium">Profile</Label>
                        <Input accept="image/*" type="file" className="cursor-pointer w-full"
                            onChange={changeFileHandler}
                        />
                    </div>

                    {
                        loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className="w-full my-4">Signup</Button>
                    }

                    {/* Signup Button */}
                    {/* <Button type="submit" className="w-full my-4">Signup</Button> */}
                    <span>Already have an account ? <Link to="/login" className="text-blue-600">Login</Link></span>
                </form>

            </div>
        </div>
    )
}

export default Signup
