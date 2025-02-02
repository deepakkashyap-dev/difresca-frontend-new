import Carousel from 'react-multi-carousel';
import CarouselButtonGroup from '../CarouselButtonGroup';
import { Key } from 'react';

interface HeroBannerProps {
  link: string;
  image: string;
  banner_name: string;
}

const HeroArea = ({ data }: any) => {
  return (
    <section className="xl:py-4 sm:py-2">
      {
        data.is_scrollable ?
          <div className="mx-4 relative pb-2 pt-4">
            <Carousel
              swipeable={false}
              draggable={false}
              responsive={responsive}
              arrows={false}
              renderButtonGroupOutside={true}
              customButtonGroup={<CarouselButtonGroup />}
              shouldResetAutoplay={false}
              infinite={false}
              itemClass="mr-2"
              partialVisible
            >
              {data.banners?.map((img_data: HeroBannerProps, i: Key) => (
                <a
                  href={img_data.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={i}
                  className="rounded-lg w-full lg:w-[360px] cursor-pointer max-h-[280px] sm:h-[200px] overflow-hidden block"
                >
                  <img
                    src={img_data.image}
                    alt={img_data.banner_name}
                    className="h-full w-full object-cover"
                  />
                </a>
              ))}
            </Carousel>
          </div>
          :
          <div >
            <img
              src={data.banners[0].image}
              alt={data.banners[0].banner_name}
              className="h-full w-full hidden sm:block"
            />
            <img
              src={data.banners[0].image}
              alt={data.banners[0].banner_name} className="h-full w-full sm:hidden" />
          </div>
      }

    </section>
  );
};

export default HeroArea;


const responsive = {
  uhdDesktop: {
    breakpoint: { max: 1920, min: 1601 },
    items: 4,
    slidesToSlide: 4,
    partialVisibilityGutter: 40,
  },
  superLargeDesktop: {
    breakpoint: { max: 1600, min: 1200 },
    items: 3,
    slidesToSlide: 3,
    partialVisibilityGutter: 40,
  },
  largeDesktop: {
    breakpoint: { max: 1200, min: 767 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 20,
  },
  tablet: {
    breakpoint: { max: 767, min: 540 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 540, min: 0 },
    items: 1,
    slidesToSlide: 1,
    partialVisibilityGutter: 20,
  },
};
