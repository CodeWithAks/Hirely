import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = [
  "Frontend Developer",
  "Backend developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Cloud Engineer",
  "DevOps Engineer"
]

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <div>
      <Carousel className="relative w-full max-w-4xl mx-auto my-8">
        <CarouselContent className="flex gap-4 px-4">
          {
            category.map((cat, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/3 flex justify-center"
              >
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="w-full sm:w-auto rounded-full px-6 py-3"
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>

        {/* Arrows positioned at sides of carousel */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
          <div className="pointer-events-auto hidden sm:block">
            <CarouselPrevious />
          </div>
          <div className="pointer-events-auto hidden sm:block">
            <CarouselNext />
          </div>
        </div>
      </Carousel>
    </div>
  )
}

export default CategoryCarousel