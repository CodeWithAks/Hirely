import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobsTable from './AppliedJobsTable'
import UpdateProfiledDialogue from './UpdateProfiledDialogue'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open,setOpen] = useState(false);
  const {user} = useSelector(store=>store.auth);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Profile Card */}
      <div className='max-w-4xl mx-auto bg-white shadow-md border border-gray-200 rounded-2xl my-8 p-8'>

        {/* profile pic and bio */}
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-5'>
            <Avatar>
              <AvatarImage 
                src={user?.profile?.profilePhoto} 
                className="h-24 w-24 rounded-full object-cover border-2 border-gray-300" 
                alt="profile" 
              />
            </Avatar>
            <div>
              <h1 className='font-semibold text-2xl'>{user?.fullname}</h1>
              <p className="text-gray-600 text-sm">
                {user?.profile?.bio || "No bio added yet"}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <Button 
            onClick={() => setOpen(true)} 
            variant="outline" 
            className="rounded-full hover:bg-gray-100"
          >
            <Pen size={18} />
          </Button>
        </div>

        {/* Divider */}
        <div className="border-t my-6" />

        {/* Mail and contact info */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='flex items-center gap-3 text-gray-700'>
            <Mail size={18} />
            <span>{user?.email}</span>
          </div>

          <div className='flex items-center gap-3 text-gray-700'>
            <Contact size={18} />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>  

        {/* Skills */}
        <div className='my-6'>
          <h1 className="font-semibold mb-2">Skills</h1>
          <div className='flex flex-wrap gap-2'>
            {
              user?.profile?.skills.length != 0 
              ? user?.profile?.skills.map((item, idx) => (
                  <Badge key={idx} className="px-3 py-1 text-sm">
                    {item}
                  </Badge>
                )) 
              : <span className="text-gray-500">Not Applicable</span>
            }
          </div>
        </div>

        {/* Resume */}
        <div className='mt-4'>
          <Label className="text-md font-semibold">Resume</Label>
          <div className="mt-1">
            {
              isResume 
              ? (
                <a 
                  target="blank" 
                  href={user?.profile?.resume} 
                  className='text-blue-600 hover:text-blue-800 underline'
                >
                  {user?.profile?.resumeOriginalName}
                </a>
              ) 
              : <span className="text-gray-500">Not Applicable</span>
            }
          </div>
        </div>
      </div>

      {/* Application Table */}
      <div className='max-w-4xl mx-auto bg-white shadow-md border border-gray-200 rounded-2xl p-6'>
        <h1 className='font-semibold text-xl mb-4'>Applied Jobs</h1>
        <AppliedJobsTable/>
      </div>

      <UpdateProfiledDialogue open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
