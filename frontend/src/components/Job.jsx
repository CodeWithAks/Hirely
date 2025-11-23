import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'

const Job = () => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>

      <div className='flex items-center justify-between'>
        <p>2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png" />
          </Avatar>
        </Button>
        <div>
          <h1>Company Name</h1>
          <p>India</p>
        </div>
      </div>
    </div>
  )
}

export default Job