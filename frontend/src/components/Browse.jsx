import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';


const Browse = () => {
    useGetAllJobs();
    const {allJobs, searchedQuery} = useSelector(store=>store.job);
    const dispatch  = useDispatch();

    useEffect(() => {
    return () => {
        dispatch(setSearchedQuery(""));
    };
}, [dispatch]);

    // Filter jobs based on searchedQuery
    const filteredJobs = allJobs.filter((job) => {
        if (!searchedQuery) return true;
        
        const searchLower = searchedQuery.toLowerCase();
        const titleMatch = job?.title?.toLowerCase().includes(searchLower);
        const descriptionMatch = job?.description?.toLowerCase().includes(searchLower);
        
        return titleMatch || descriptionMatch;
    });

  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10 px-4'>
            <h1 className='font-bold text-lg md:text-xl my-10'>Search Results ({filteredJobs.length})</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                filteredJobs.map((job)=> {
                    return (
                        <Job key={job._id} job={job} />
                    )
                })
            }
            </div>
        </div>
    </div>
  )
}

export default Browse