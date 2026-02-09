import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';
import { Calendar, MapPin, Briefcase, Users, Wallet, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant == user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    if (!singleJob) return <div className='h-screen flex items-center justify-center'>Loading...</div>;

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className='max-w-7xl mx-auto my-10 px-4'
        >
            {/* Header / Top Bar */}
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm'>
                <div className='space-y-4'>
                    <button onClick={() => window.history.back()} className='flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium'>
                        <ArrowLeft size={16}/> Back to Jobs
                    </button>
                    <h1 className='font-extrabold text-3xl md:text-4xl text-gray-900'>{singleJob?.title}</h1>
                    <div className='flex flex-wrap items-center gap-3'>
                        <Badge className='bg-blue-50 text-blue-700 border-none px-4 py-1' variant="outline">{singleJob?.position} Positions</Badge>
                        <Badge className='bg-purple-50 text-purple-700 border-none px-4 py-1' variant="outline">{singleJob?.jobType}</Badge>
                        <Badge className='bg-red-50 text-red-700 border-none px-4 py-1' variant="outline">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                
                <Button 
                    onClick={isApplied ? null : applyJobHandler} 
                    disabled={isApplied} 
                    size="lg"
                    className={`rounded-full px-10 py-7 text-lg font-bold transition-all shadow-lg active:scale-95 ${
                        isApplied 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
                    }`}
                >
                    {isApplied ? 'Application Sent' : 'Apply Now'}
                </Button>
            </div>

            {/* Main Content Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 my-10'>
                
                {/* Left Side: Details */}
                <div className='lg:col-span-2 space-y-8'>
                    <section>
                        <h2 className='text-2xl font-bold text-gray-900 mb-4'>Job Description</h2>
                        <p className='text-gray-600 leading-relaxed text-lg'>
                            {singleJob?.description}
                        </p>
                    </section>

                    <section className='bg-gray-50 p-6 rounded-2xl border border-gray-100'>
                        <h2 className='text-xl font-bold text-gray-900 mb-4 font-mono uppercase tracking-tighter'>Role Highlights</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                            <div className='flex items-center gap-4'>
                                <div className='p-3 bg-white rounded-xl shadow-sm text-blue-600'><MapPin size={20}/></div>
                                <div>
                                    <p className='text-xs text-gray-400 font-bold uppercase'>Location</p>
                                    <p className='font-semibold text-gray-700'>{singleJob?.location || "Remote"}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='p-3 bg-white rounded-xl shadow-sm text-purple-600'><Briefcase size={20}/></div>
                                <div>
                                    <p className='text-xs text-gray-400 font-bold uppercase'>Experience</p>
                                    <p className='font-semibold text-gray-700'>{singleJob?.experience} Years</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='p-3 bg-white rounded-xl shadow-sm text-green-600'><Wallet size={20}/></div>
                                <div>
                                    <p className='text-xs text-gray-400 font-bold uppercase'>Salary</p>
                                    <p className='font-semibold text-gray-700'>{singleJob?.salary} LPA</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='p-3 bg-white rounded-xl shadow-sm text-orange-600'><Calendar size={20}/></div>
                                <div>
                                    <p className='text-xs text-gray-400 font-bold uppercase'>Posted On</p>
                                    <p className='font-semibold text-gray-700'>{singleJob?.createdAt?.split("T")[0]}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Side: Quick Stats / Sidebar */}
                <div className='lg:col-span-1'>
                    <div className='sticky top-24 p-6 rounded-2xl border border-gray-100 bg-white shadow-sm space-y-6'>
                        <h3 className='font-bold text-lg text-gray-900'>Engagement</h3>
                        <div className='flex items-center justify-between p-4 bg-blue-50/50 rounded-xl'>
                            <div className='flex items-center gap-3'>
                                <Users className='text-blue-600' size={20}/>
                                <span className='text-sm font-medium text-gray-600'>Total Applicants</span>
                            </div>
                            <span className='font-bold text-blue-700 text-lg'>{singleJob?.applications?.length}</span>
                        </div>
                        <div className='text-xs text-gray-400 text-center'>
                            Be one of the first few candidates to apply for this role.
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    )
}

export default JobDescription