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

// const skills = ["Html", "Css", "Javascript", "React.js"];
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open,setOpen] = useState(false);
  const {user} = useSelector(store=>store.auth);

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>

        {/* profile pic and bio */}
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar>
              <AvatarImage src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png" className="h-24 w-28" alt="profile" />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{user?.fullname}</h1>
              <p> {user?.profile?.bio || "No bio added yet"}</p>
            </div>
          </div>

          {/* Pen */}
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
        </div>

        {/* Mail and contact info */}
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span>{user?.email}</span>
          </div>

          <div className='flex items-center gap-3 my-2'>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>  

        {/* Skills */}
        <div className='my-5'>
          <h1>Skills</h1>
          <div className='flex flex-wrap gap-2'>
            {
              user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, idx) => <Badge key={idx}>{item}</Badge>) : <span>Not Applicable</span>
            }
          </div>
        </div>

        {/* Resume */}
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className="text-md font-bold">Resume</Label>
          {
            isResume ? <a target="blank" href={user?.profile?.resume} className='text-blue-500 w-full hover:underline'>{user?.profile?.resumeOriginalName}</a> : <span>Not Applicable</span>
          }
        </div>
      </div>

      {/* Appplication Table */}
        <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
          <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
          <AppliedJobsTable/>
        </div>

        <UpdateProfiledDialogue open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile