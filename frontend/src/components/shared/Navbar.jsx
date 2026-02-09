import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));  //logout k baad user na show ho
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='p-4'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-blue-800 font-bold text-4xl'>Hirely</h1>
                </div>

                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role == "recruiter" ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className='text-xl'>Home</Link></li>
                                    <li><Link to="/jobs" className='text-xl' >Jobs</Link></li>
                                    <li><Link to="/browse" className='text-xl' >Browse</Link></li>
                                </>
                            )
                        }
                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline" className="cursor-pointer text-xl">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-xl p-4">SignUp</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@evilrabbit" className='h-12 w-12 rounded-full' />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className='flex gap-4'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@evilrabbit" className='h-12 w-12 rounded-full' />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col my-2 text-gray-600'>
                                        {
                                            user && user.role == "student" && (
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2 />
                                                    <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                                </div>
                                            )
                                        }
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button variant="link" onClick={logoutHandler}>Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar