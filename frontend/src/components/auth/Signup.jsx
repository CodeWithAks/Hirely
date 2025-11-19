import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const signup = () => {
  return (
    <div>
        <Navbar/>
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                <h1 className='font-bold text-xl mb-5'>Sign Up</h1>

                {/* full name */}
                <div className='my-2'>
                    <Label>Full Name</Label>
                    <Input type="text" placeholder="Enter your full name"></Input>
                </div>

                {/* email */}
                <div className='my-2'>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Enter your email"></Input>
                </div>

                {/* Phone Number */}
                <div className='my-2'>
                    <Label>Phone Number</Label>
                    <Input type="number" placeholder="Enter your phone number"></Input>
                </div>

                {/* Password */}
                <div className='my-2'>
                    <Label>Password</Label>
                    <Input type="password" placeholder="Enter your password"></Input>
                </div>
            </form>

            {/* Recruiter/candidate */}
            <div>
                <h1>I am a ...</h1>
                <Button>Student</Button>
                <Button>Recruiter</Button>
            </div>
        </div>
    </div>
    
  )
}

export default signup