"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// import Image from "next/image";

const ProductDetailsCarousal = ({ images }: any) => {
  console.log(images);

  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images?.map((img: any, index: any) => (
          <img
            key={index}
            src={process.env.NEXT_PUBLIC_API_URL + "images/" + img}
            alt={index}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousal;
