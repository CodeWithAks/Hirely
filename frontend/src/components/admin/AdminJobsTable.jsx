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

                {/* Role */}
                <TableCell>
                  {job?.title}
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
