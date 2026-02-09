import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const HeroSection = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    //Typewriter Effect
    const [titleIndex, setTitleIndex] = useState(0);
    const titles = ["Frontend Developer", "Data Scientist", "Product Designer", "Backend Engineer"];

    useEffect(() => {
        const interval = setInterval(() => {
            setTitleIndex((prev) => (prev + 1) % titles.length);
        }, 3000); // Change text every 3 seconds
        return () => clearInterval(interval);
    }, []);

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }

    return (
        <section className="relative w-full min-h-[700px] flex flex-col justify-center overflow-hidden bg-gray-50 pt-16">
            
            {/* 1. BACKGROUND GRID & BLOBS */}
            <div className="absolute inset-0 z-0 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-60"></div>
            <div className="absolute top-0 left-0 right-0 h-full w-full bg-gradient-to-b from-white via-transparent to-transparent z-1"></div>
            <div className="absolute -top-20 -left-20 h-96 w-96 bg-blue-400/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute top-40 -right-20 h-96 w-96 bg-purple-400/20 rounded-full blur-[100px] animate-pulse delay-1000" />

            {/* 2. FLOATING CARDS (Hidden on mobile) */}
            <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="hidden xl:flex absolute left-[10%] top-[25%] bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 max-w-xs z-10"
            >
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-2xl mr-4">🎉</div>
                <div>
                    <p className="font-bold text-gray-800">Job Offer Received</p>
                    <p className="text-sm text-gray-500">Google Inc. • Senior Dev</p>
                </div>
            </motion.div>

            <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="hidden xl:flex absolute right-[10%] bottom-[30%] bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 max-w-xs z-10"
            >
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">CV</div>
                <div>
                    <p className="font-bold text-gray-800">Resume Uploaded</p>
                    <p className="text-sm text-green-600 font-medium">100% Match Found</p>
                </div>
            </motion.div>


            {/* 3. MAIN CONTENT */}
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-6 items-center"
                >
                    <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100 text-sm tracking-wide shadow-sm">
                        🚀 No. 1 Job Hunt Website
                    </span>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
                        Discover & Apply <br />
                        To Your <span className="text-blue-600">Dream Job</span>
                    </h1>
                    
                    {/* Changing Text */}
                    <div className="h-12 overflow-hidden">
                        <motion.p 
                           key={titleIndex}
                           initial={{ y: 20, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           exit={{ y: -20, opacity: 0 }}
                           transition={{ duration: 0.3 }}
                           className="text-2xl md:text-3xl font-medium text-gray-500"
                        >
                           For <span className="text-purple-600 font-bold">{titles[titleIndex]}</span>
                        </motion.p>
                    </div>

                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Find verified jobs, apply with confidence, and take the next step
                        in your career — all in one place.
                    </p>

                    {/* Search Bar */}
                    <div className="flex w-full md:w-[80%] bg-white border border-gray-200 rounded-full shadow-lg overflow-hidden mt-4 p-2 focus-within:ring-2 ring-blue-100 transition-all">
                        <div className="flex items-center flex-grow px-4">
                            <Search className="text-gray-400 w-6 h-6 mr-3" />
                            <input
                                type="text"
                                placeholder="Job title, keywords, or company..."
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full outline-none text-gray-700 text-lg py-2"
                            />
                        </div>
                        <Button
                            onClick={searchJobHandler}
                            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
                        >
                            Search
                        </Button>
                    </div>
                </motion.div>
            </div>

        </section>
    )
}

export default HeroSection