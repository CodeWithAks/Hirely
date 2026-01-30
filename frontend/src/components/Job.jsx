import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToSaved, removeFromSaved } from '@/redux/jobSlice'

const Job = ({ job }) => {
  const navigate = useNavigate();
  // const jobId = "awufgebg8hv";

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
  };

  const { savedJobs = [] } = useSelector(store => store.job);
  const dispatch = useDispatch();

  const isSaved = savedJobs.some(j => j._id === job._id);



  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100  '>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>


        <div>
          <h1 className='font-bold text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-600'>{job?.location}</p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>

      <div className='flex items-center gap-2 mt-4'>
        <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position}</Badge>
        <Badge className='text-purple-700 font-bold' variant="ghost">{job?.jobType}</Badge>
        <Badge className='text-red-700 font-bold' variant="ghost">{job?.salary}</Badge>
      </div>

      <div className='flex items-center gap-4 mt-4'>
        <Button variant="outline" onClick={() => navigate(`/description/${job._id}`)}>Details</Button>
        {/* <Button className="bg-purple-600 hover:bg-purple-700">Save For Later</Button> */}
        <Button
          className={`hover:bg-purple-700 ${isSaved ? "bg-green-600" : "bg-purple-600"}`}
          onClick={() => {
            if (isSaved) {
              dispatch(removeFromSaved(job._id))
            } else {
              dispatch(addToSaved(job))
            }
          }}
        >
          {isSaved ? "Saved ✅" : "Save For Later"}
        </Button>

      </div>
    </div>
  )
}

export default Job