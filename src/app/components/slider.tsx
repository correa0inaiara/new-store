'use client'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import { Banners } from '@//types/images';
import Image from 'next/image';
import banner_quebrado from './../../../public/banner-quebrado.png'

export default ({ images }: { images: Banners }) => {
    console.log('images', images)
    return (
        <Swiper
            cssMode={true}
            navigation={true}
            loop={true}
            pagination={{
                clickable: true,
            }}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
        >
            {images.map((image, index) => (
                <SwiperSlide>
                    <Image
                        src={image.src ?? banner_quebrado}
                        alt={image.alt ?? 'banner'}
                        width={image.width}
                        height={image.height}
                        className="w-full"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};