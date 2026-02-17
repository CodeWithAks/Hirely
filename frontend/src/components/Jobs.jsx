import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

const Jobs = () => {
  const { allJobs = [], searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [sheetOpen, setSheetOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      })
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [searchedQuery, allJobs]);


  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5 px-4'>
        {/* Mobile Filter Button */}
        <div className='md:hidden mb-5'>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className='flex items-center gap-2'>
                <Filter className='h-4 w-4' />
                Show Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className='w-full sm:w-80'>
              <div className='mt-6'>
                <FilterCard />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className='flex gap-5'>
          {/* Desktop Sidebar - Hidden on mobile */}
          <div className='hidden md:block md:w-[20%]'>
            <FilterCard />
          </div>

          <div className='flex-1 w-full md:w-auto'>
            {
              filterJobs.length <= 0 ? <span>Job not found</span> : (
                <div className='h-[88vh] overflow-y-auto pb-5'>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                      filterJobs.map(job => (
                        <motion.div
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.3 }}
                          key={job._id} >
                          <Job job={job} />
                        </motion.div>
                      ))
                    }
                  </div>
                </div>
              )
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default Jobs