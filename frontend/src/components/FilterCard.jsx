import React from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

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
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3'/>
      <RadioGroup>
        {
          filterData.map((data,idx)=>(
            <div>
              <h1 className='font-bold text-lg my-3'>{data.filterType}</h1>
              {
                data.array.map((item,idx) => {
                  return(
                    <div key={idx} className='flex items-center gap-3 my-3'>
                      <RadioGroupItem id={item} value={item} className="cursor-pointer" />
                        <Label htmlFor={item}>{item}</Label>
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