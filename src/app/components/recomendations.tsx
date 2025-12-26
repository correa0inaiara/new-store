'use client'

import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard, FreeMode } from 'swiper/modules';
import { Products } from "@//types/products";
import produto_quebrado from './../../../public/produto-quebrado.png'

export const Recomendations = ({ products }: { products: Products }) => {
    return (

        <div className="pt-5 pb-5">
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                loop={true}
                freeMode={true}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination, Navigation]}
                className="mySwiper"
            >
                {products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <div className="group card lg:card-side bg-base-100 shadow-sm rounded-xl overflow-hidden relative">
                            <figure className="relative w-full h-full">
                                <Image
                                    src={product.image.src ?? produto_quebrado}
                                    alt={product.image.alt ?? 'product'}
                                    width={300}
                                    height={180}
                                    className="rounded-xl"
                                />
                            </figure>

                            <div className="hidden group-hover:block absolute inset-0 card-body items-center justify-center text-center bg-black/50 rounded-xl pointer-events-auto">
                                <h2 className="card-title text-white">
                                    {product.title}
                                </h2>
                                <p className="text-white">{product.description}</p>
                                <div className="card-actions items-center justify-center gap-2">
                                    <span className="text-xl text-white font-bold">${product.price}</span>
                                    <button className="btn btn-primary btn-sm">Buy Now</button>
                                </div>
                                <div className="card-actions justify-center gap-2">
                                    <div className="badge badge-outline">{product.category.title}</div>
                                    <div className="badge badge-outline">{product.subcategory.title}</div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                {/* {products.map((product, index) => (
                <SwiperSlide>
                    <div className="card lg:card-side bg-base-100 hover:image-full shadow-sm">
                        <figure>
                            <Image
                                src={product.image.src ?? produto_quebrado}
                                alt={product.image.alt ?? 'product'}
                                width={300}
                                height={180}
                                className="rounded-xl"
                            />
                        </figure>
                    </div>
                    <div className="hidden group-hover:block card-body items-center text-center">
                        <h2 className="card-title">
                            {product.title}
                        </h2>
                        <p>{product.description}</p>
                        <div className="card-actions items-center justify-center">
                            <span className="text-xl">${product.price}</span>
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">{product.category.title}</div>
                            <div className="badge badge-outline">{product.subcategory.title}</div>
                        </div>
                    </div>
                </SwiperSlide>
            ))} */}
            </Swiper>
        </div>
    )
}