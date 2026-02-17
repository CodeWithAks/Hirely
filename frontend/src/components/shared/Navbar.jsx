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
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";

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
                    <h1 className='text-blue-800 font-bold text-2xl md:text-4xl'>Hirely</h1>
                </div>

                {/* Dekstop Navigation */}
                <div className='hidden md:flex items-center gap-4 md:gap-8 lg:gap-12'>
                    <ul className='hidden md:flex font-medium items-center gap-5'>
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

                    {/* Dekstop Auth */}
                    {
                        !user ? (
                            <div className='hidden md:flex items-center gap-2'>
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
                                    <div className='hidden md:flex gap-4'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@evilrabbit" className='h-12 w-12 rounded-full' />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>

                                    <div className='hidden md:flex flex-col my-2 text-gray-600'>
                                        {
                                            user && user.role == "student" && (
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2 />
                                                    <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                                </div>
                                            )
                                        }
                                        <div className='hidden md:flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button variant="link" onClick={logoutHandler}>Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>

                {/* Mobile Navigation */}
                {/* Mobile Menu Trigger */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full sm:w-80">
                            <nav className="flex flex-col gap-4 mt-6">
                                {user && user.role === "recruiter" ? (
                                    <>
                                        <Link to="/admin/companies" className="text-lg font-medium hover:text-purple-600">
                                            Companies
                                        </Link>
                                        <Link to="/admin/jobs" className="text-lg font-medium hover:text-purple-600">
                                            Jobs
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/" className="text-lg font-medium hover:text-purple-600">
                                            Home
                                        </Link>
                                        <Link to="/jobs" className="text-lg font-medium hover:text-purple-600">
                                            Jobs
                                        </Link>
                                        <Link to="/browse" className="text-lg font-medium hover:text-purple-600">
                                            Browse
                                        </Link>
                                    </>
                                )}

                                {/* Mobile Auth Section */}
                                {!user ? (
                                    <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                                        <Link to="/login" className="w-full">
                                            <Button variant="outline" className="w-full">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link to="/signup" className="w-full">
                                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                                SignUp
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                                        {user.role === "student" && (
                                            <Link to="/profile" className="text-lg font-medium hover:text-purple-600 flex items-center gap-2">
                                                <User2 className="h-4 w-4" />
                                                View Profile
                                            </Link>
                                        )}
                                        <button
                                            onClick={logoutHandler}
                                            className="text-lg font-medium hover:text-purple-600 flex items-center gap-2"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Avatar */}
                {user && (
                    <div className="hidden md:flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar