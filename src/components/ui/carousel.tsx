'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CarouselApi = ReturnType<typeof useEmblaCarousel>[1]

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: Parameters<typeof useEmblaCarousel>[0]
  setApi?: (api: CarouselApi) => void
}

const CarouselContext = React.createContext<{
  emblaApi: CarouselApi
} | null>(null)

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, opts, setApi, children, ...props }, ref) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(opts)

    React.useEffect(() => {
      if (setApi) setApi(emblaApi)
    }, [emblaApi, setApi])

    return (
      <CarouselContext.Provider value={{ emblaApi }}>
        <div
          ref={ref}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          <div ref={emblaRef} className="overflow-hidden">
            {children}
          </div>
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = 'Carousel'

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex', className)} {...props} />
))
CarouselContent.displayName = 'CarouselContent'

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="group"
    aria-roledescription="slide"
    className={cn('min-w-0 shrink-0 grow-0 basis-full', className)}
    {...props}
  />
))
CarouselItem.displayName = 'CarouselItem'

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const context = React.useContext(CarouselContext)

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn('absolute top-1/2 left-4 -translate-y-1/2', className)}
      disabled={!context?.emblaApi?.canScrollPrev()}
      onClick={() => context?.emblaApi?.scrollPrev()}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = 'CarouselPrevious'

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const context = React.useContext(CarouselContext)

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn('absolute top-1/2 right-4 -translate-y-1/2', className)}
      disabled={!context?.emblaApi?.canScrollNext()}
      onClick={() => context?.emblaApi?.scrollNext()}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = 'CarouselNext'

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
}
