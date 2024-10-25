"use client";
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

const images = [
    "/2.jpg",
    "/1.jpg",
]

export default function ImageSlider() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    return (
        <div className="relative w-full h-[400px]">
            <Image
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                layout="fill"
                objectFit="cover"
            />
            <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-4 transform -translate-y-1/2"
                onClick={goToPrevious}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-4 transform -translate-y-1/2"
                onClick={goToNext}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}