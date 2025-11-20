import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { Link } from 'react-router-dom'

const login = () => {
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>


          {/* email */}
          <div className='my-2'>
            <Label>Email</Label>
            <Input type="email" placeholder="Enter your email"></Input>
          </div>

          {/* Password */}
          <div className='my-2'>
            <Label>Password</Label>
            <Input type="password" placeholder="Enter your password"></Input>
          </div>

          {/* Role Selection */}
          <div className='flex items-center justify-between'>
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className="flex items-center gap-3">
                <Input type="radio" name="role" value="student" className="cursor-pointer" />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input type="radio" name="role" value="recruiter" className="cursor-pointer" />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Profile */}
          <div className='flex flex-col space-y-1'>
            <Label className="text-gray-700 font-medium">Profile</Label>
            <Input accept="image/*" type="file" className="cursor-pointer" />
          </div>

          {/* Login Button */}
          <Button type="submit" className="w-full my-4">Login</Button>
          <span>Don't have an account ? <Link to="/signup" className="text-blue-600">Signup</Link></span>
        </form>

      </div>
    </div>
  )
}

export default login
