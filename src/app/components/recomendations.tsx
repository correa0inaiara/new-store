'use client'

import Image from "next/image"
import { ProductResponse } from "@//types/products";
import produto_quebrado from './../../../public/produto-quebrado.png'
import Slider from "react-slick";
import Link from "next/link";

export const Recomendations = ({ products }: { products: ProductResponse[] }) => {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        slider: 'div',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };

    return (

        <main className="custom-slider">
            <div className="pt-5 pb-5 slider-container">
                <Slider {...settings}>
                    {products.map((product, index) => (
                        <Link className="card bg-base-100 w-96 shadow-sm" href={`/products/${product.product_id}`}>
                            <div className="m-auto w-50">
                                <figure className="relative w-full h-full">
                                    <Image
                                        src={product?.image?.src ?? produto_quebrado}
                                        alt={product?.image?.alt ?? 'product'}
                                        width={300}
                                        height={180}
                                        className="rounded-xl"
                                    />
                                </figure>
                            </div>

                            <div className="card-body items-center">
                                <h2 className="card-title">
                                    {product.title}
                                </h2>
                                <p>{product.description}</p>
                                <div className="card-actions items-center justify-center gap-2">
                                    <span className="text-xl font-bold">${parseFloat(product.price.toString())}</span>
                                    <button className="btn btn-primary btn-sm">Buy Now</button>
                                </div>
                                <div className="card-actions justify-center gap-2">
                                    <div className="badge badge-outline">{product.category.title}</div>
                                    <div className="badge badge-outline">{product.subcategory.title}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </Slider>
            </div>
        </main>
    )
}