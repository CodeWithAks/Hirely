import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // For the smooth hover effect
import { MapPin, Clock, DollarSign } from 'lucide-react'; // Better icons

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            onClick={() => navigate(`/description/${job._id}`)}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className='p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl cursor-pointer transition-all group'>
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-3'>
                    {/* Company Logo Placeholder */}
                    <div className='w-12 h-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors'>
                        {job?.company?.name?.charAt(0) || "J"}
                    </div>
                    <div>
                        <h1 className='font-bold text-gray-800 group-hover:text-blue-600 transition-colors'>{job?.company?.name}</h1>
                        <div className='flex items-center text-gray-400 text-xs gap-1'>
                            <MapPin size={12} />
                            <span>India • Remote</span>
                        </div>
                    </div>
                </div>
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-gray-400 border-gray-200">
                    New
                </Badge>
            </div>

            <div className='space-y-2'>
                <h1 className='font-extrabold text-xl text-gray-900'>{job?.title}</h1>
                <p className='text-sm text-gray-500 line-clamp-2 leading-relaxed'>
                    {job?.description || "Join our fast-growing team to help build the future of technology and innovation."}
                </p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mt-6'>
                <Badge className='bg-blue-50 text-blue-700 border-none px-3 py-1 rounded-lg' variant="secondary">
                    <span className='mr-1'>👥</span> {job?.position} Positions
                </Badge>
                <Badge className='bg-purple-50 text-purple-700 border-none px-3 py-1 rounded-lg' variant="secondary">
                    <Clock size={12} className='mr-1' /> {job?.jobType}
                </Badge>
                <Badge className='bg-emerald-50 text-emerald-700 border-none px-3 py-1 rounded-lg' variant="secondary">
                    <DollarSign size={12} className='mr-1' /> {job?.salary} LPA
                </Badge>
            </div>
        </motion.div>
    )
}

export default LatestJobCards