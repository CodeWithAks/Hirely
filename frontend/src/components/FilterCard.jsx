import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
  {
    filterType:"Location",
    array:["Delhi NCR","Bangalore","Hyderabad","Pune","Mumbai"]
  },
  {
    filterType:"Industry",
    array:["Frontend Developer","Backend Developer","FullStack Developer"]
  },
  {
    filterType:"Salary",
    array:["0-40k","42-1Lakh","1Lakh to 5 lakh"]
  }
]

const FilterCard = () => {
  const [selectedValue,setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  }
  useEffect(()=> {
    dispatch(setSearchedQuery(selectedValue))
    console.log(selectedValue);
  },[selectedValue]);

  return (
    <div className='w-full bg-white p-4 md:p-6 rounded-md'>
      <h1 className='font-bold text-base md:text-lg'>Filter Jobs</h1>
      <hr className='mt-4'/>
      <RadioGroup value={selectedValue} onValueChange={changeHandler} >
        {
          filterData.map((data,idx)=>(
            <div key={idx}>
              <h1 className='font-bold text-base md:text-lg my-4'>{data.filterType}</h1>
              {
                data.array.map((item,idx) => {
                  return(
                    <div key={idx} className='flex items-center gap-3 my-4 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors'>
                      <RadioGroupItem id={item} value={item} className="cursor-pointer" />
                        <Label htmlFor={item} className='cursor-pointer text-sm md:text-base'>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard