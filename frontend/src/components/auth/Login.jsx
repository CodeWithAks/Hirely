import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const login = () => {

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  });

  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }


  const submitHandler = async (e) => {
    e.preventDefault();   //pg reload hone se rokta h


    try {
      dispatch(setLoading(true)); //login hone pe load hoga 
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      console.log(res.data.success); //true
      if (res.data.success) {  //agr data mil gya to
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false)); //ab rokdo 
    }

  }

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>


          {/* email */}
          <div className='my-2'>
            <Label>Email</Label>
            <Input type="email" placeholder="aks123@email.com" name="email" value={input.email} onChange={changeEventHandler}></Input>
          </div>

          {/* Password */}
          <div className='my-2'>
            <Label>Password</Label>
            <Input type="password" placeholder="Enter your password" name="password" value={input.password} onChange={changeEventHandler}></Input>
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
          {
            loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className="w-full my-4">Login</Button>
          }

          {/* Login Button */}
          {/* <Button type="submit" className="w-full my-4">Login</Button> */}
          <span>Don't have an account ? <Link to="/signup" className="text-blue-600">Signup</Link></span>
        </form>

      </div>
    </div>
  )
}

export default login
