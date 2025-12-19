import { Banners } from "@//types/images"
import Image from "next/image"
import banner_quebrado from './../../../public/banner-quebrado.png'

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Carousel = ({ images }: { images: Banners }) => {
    
     const settings = {
        dots: true,
    };

    return (
        <div className="image-slider-container">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div>
                        <Image
                            src={image.src.at(index) ?? banner_quebrado}
                            alt="A 3d warning triangle sign icon with a black exclamation point in the center and a blue lightning bolt hovering the top-right of the triangle, emitting visual radiating lines.
                            Five grayed-out icons are peeking out from behind the triangle: two shopping carts, two price tags and a gift box. 
                            With a casting shadow beneath it."
                            // width={1000}
                            // height={1000}
                            className="w-full"
                        />
                    </div>
                ))}
                {/* <div>
                    <img src="https://picsum.photos/400/200" />
                </div>
                <div>
                    <img src="https://picsum.photos/400/200" />
                </div>
                <div>
                    <img src="https://picsum.photos/400/200" />
                </div> */}
            </Slider>
        </div>
    
        // <div className="carousel w-full">
        //     <div id="slide1" className="carousel-item relative w-full">
        //         <Image
        //             src={images.at(0) ?? banner_quebrado}
        //             alt="A 3d warning triangle sign icon with a black exclamation point in the center and a blue lightning bolt hovering the top-right of the triangle, emitting visual radiating lines.
        //             Five grayed-out icons are peeking out from behind the triangle: two shopping carts, two price tags and a gift box. 
        //             With a casting shadow beneath it."
        //             // width={1000}
        //             // height={1000}
        //             className="w-full"
        //         />
        //         {/* <img
        //             src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
        //             className="w-full" /> */}
        //         <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        //             <a href="#slide4" className="btn btn-circle">❮</a>
        //             <a href="#slide2" className="btn btn-circle">❯</a>
        //         </div>
        //     </div>
        //     <div id="slide2" className="carousel-item relative w-full">
        //         <Image
        //             src={images.at(1) ?? banner_quebrado}
        //             alt="A 3d warning triangle sign icon with a black exclamation point in the center and a blue lightning bolt hovering the top-right of the triangle, emitting visual radiating lines.
        //             Five grayed-out icons are peeking out from behind the triangle: two shopping carts, two price tags and a gift box. 
        //             With a casting shadow beneath it."
        //             // width={1000}
        //             // height={1000}
        //             className="w-full"
        //         />
        //         {/* <img
        //             src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
        //             className="w-full" /> */}
        //         <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        //             <a href="#slide1" className="btn btn-circle">❮</a>
        //             <a href="#slide3" className="btn btn-circle">❯</a>
        //         </div>
        //     </div>
        //     <div id="slide3" className="carousel-item relative w-full">
        //         <Image
        //             src={images.at(2) ?? banner_quebrado}
        //             alt="A 3d warning triangle sign icon with a black exclamation point in the center and a blue lightning bolt hovering the top-right of the triangle, emitting visual radiating lines.
        //             Five grayed-out icons are peeking out from behind the triangle: two shopping carts, two price tags and a gift box. 
        //             With a casting shadow beneath it."
        //             // width={1000}
        //             // height={1000}
        //             className="w-full"
        //         />
        //         {/* <img
        //             src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
        //             className="w-full" /> */}
        //         <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        //             <a href="#slide2" className="btn btn-circle">❮</a>
        //             <a href="#slide4" className="btn btn-circle">❯</a>
        //         </div>
        //     </div>
        //     <div id="slide4" className="carousel-item relative w-full">
        //         <Image
        //             src={images.at(3) ?? banner_quebrado}
        //             alt="A 3d warning triangle sign icon with a black exclamation point in the center and a blue lightning bolt hovering the top-right of the triangle, emitting visual radiating lines.
        //             Five grayed-out icons are peeking out from behind the triangle: two shopping carts, two price tags and a gift box. 
        //             With a casting shadow beneath it."
        //             // width={1000}
        //             // height={1000}
        //             className="w-full"
        //         />
        //         <img
        //             src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
        //             className="w-full" />
        //         <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        //             <a href="#slide3" className="btn btn-circle">❮</a>
        //             <a href="#slide1" className="btn btn-circle">❯</a>
        //         </div>
        //     </div>
        // </div>
    )
}