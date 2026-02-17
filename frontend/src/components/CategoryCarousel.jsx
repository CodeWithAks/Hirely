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
      <Carousel className="w-full max-w-4xl mx-auto my-8">
        <CarouselContent className="flex gap-4 px-4 overflow-x-auto snap-x snap-mandatory scroll-smooth">
          {
            category.map((cat, index) => (
              <CarouselItem
                key={index}
                className="flex-shrink-0 w-11/12 sm:w-1/2 lg:w-1/3 snap-start flex justify-center"
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

        {/* Arrows hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  )
}

export default CategoryCarousel