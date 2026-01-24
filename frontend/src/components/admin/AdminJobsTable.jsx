import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchJobByText } from '@/redux/jobSlice'


const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { //error
    const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true
      };
      return company?.name?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs); //state change hoga
  }, [allAdminJobs, searchJobByText]) //agr inmei se koi ek bhi change hoga to useEffect call ho jaayega
  // console.log(companies);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Company name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAdminJobs.length === 0 ? ( //error
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                You haven't registered any company yet.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map(job => (
              <TableRow key={job._id}>

                {/* Name */}
                <TableCell className="font-medium">
                  {job?.company?.name}
                </TableCell>

                {/* Date */}
                <TableCell>
                  {job?.createdAt?.split('T')[0]}
                </TableCell>

                {/* Action */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/admin/jobs/${job._id}`)}>
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                        <Eye className='w-4'/>
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable

// {/* //https://img.freepik.com/free-vector/abstract-company-logo_53876-120501.jpg?semt=ais_hybrid&w=740&q=80 */ }

// (3) [{…}, {…}, {…}]0: {_id: '695d2e70ea07a73de624785e', name: 'Merk India', userId: '6958e6943d2a165416cafd7e', createdAt: '2026-01-06T15:46:56.402Z', updatedAt: '2026-01-06T15:47:48.245Z', …}1: {_id: '695d2f62ea07a73de6247862', name: 'Google India', userId: '6958e6943d2a165416cafd7e', createdAt: '2026-01-06T15:50:58.606Z', updatedAt: '2026-01-06T15:51:57.649Z', …}2: {_id: '695d44b0ea07a73de624786b', name: 'Juspay', userId: '6958e6943d2a165416cafd7e', createdAt: '2026-01-06T17:21:52.919Z', updatedAt: '2026-01-06T17:22:08.343Z', …}length: 3[[Prototype]]: Array(0)
// installHook.js:1 [object Object],[object Object],[object Object]
// AdminJobsTable.jsx:25 (3) [{…}, {…}, {…}]0: {_id: '695d2e70ea07a73de624785e', name: 'Merk India', userId: '6958e6943d2a165416cafd7e', createdAt: '2026-01-06T15:46:56.402Z', updatedAt: '2026-01-06T15:47:48.245Z', …}1: {_id: '695d2f62ea07a73de6247862', name: 'Google India', userId: '6958e6943d2a165416cafd7e', createdAt: '2026-01-06T15:50:58.606Z', updatedAt: '2026-01-06T15:51:57.649Z', …}2: {_id: '695d44b0ea07a73de624786b', name: 'Juspay', userId: '6958e6943d2a165416cafd7e', createdAt: '2026-01-06T17:21:52.919Z', updatedAt: '2026-01-06T17:22:08.343Z', …}length: 3[[Prototype]]: Array(0)
// installHook.js:1 [object Object],[object Object],[object Object]
// AdminJobsTable.jsx:25 (3) [{…}, {…}, {…}]
// installHook.js:1 [object Object],[object Object],[object Object]
// AdminJobsTable.jsx:25 (3) [{…}, {…}, {…}]
// installHook.js:1 [object Object],[object Object],[object Object]

// import React, { useEffect, useState } from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { Edit2, MoreHorizontal } from 'lucide-react'
// import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { setSearchJobByText } from '@/redux/jobSlice'


// const AdminJobsTable = () => {
//   const { companies, searchCompanyByText = [] } = useSelector(store => store.company || {}); //error
//   const {allAdminJobs, setSearchJobByText} = useSelector(store=>store.job);
//   const [filterJobs, setFilterJobs] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => { //error
//     const filteredCompany = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
//       if(!searchCompanyByText){
//         return true
//       };
//       return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
//     });
//     setFilterJobs(filteredCompany); //state change hoga
//   }, [companies, searchCompanyByText]) //agr inmei se koi ek bhi change hoga to useEffect call ho jaayega
// console.log(companies);

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your recent posted jobs</TableCaption>

//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px]">Company name</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {companies.length === 0 ? ( //error
//             <TableRow>
//               <TableCell colSpan={4} className="text-center text-muted-foreground">
//                 You haven't registered any company yet.
//               </TableCell>
//             </TableRow>
//           ) : (
//             filterJobs.map(job => (
//               <TableRow key={job._id}>

//                 {/* Name */}
//                 <TableCell className="font-medium">
//                   {job?.company?.name}
//                 </TableCell>

//                 {/* Date */}
//                 <TableCell>
//                   {job?.createdAt?.split('T')[0]}
//                 </TableCell>

//                 {/* Action */}
//                 <TableCell className="text-right">
//                   <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal className="cursor-pointer" />
//                     </PopoverTrigger>
//                     <PopoverContent className="w-32">
//                       <div className="flex items-center gap-2 cursor-pointer" onClick={()=>navigate(`/admin/companies/${job._id}`)}>
//                         <Edit2 className="w-4" />
//                         <span>Edit</span>
//                       </div>
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }

// export default AdminJobsTable

// I tried consoling but this is appearing in console
// And nothing is displaying on the screen no role,no company,no date(even though I registerd new job)