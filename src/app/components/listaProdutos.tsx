import { Product } from '@//types/products'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import produto_quebrado from './../../../public/produto-quebrado.png'

interface ListaProdutosProps {
  products: Product[]
}

export default function ListaProdutos({ products }: ListaProdutosProps) {
  return (
    <div className='flex gap-10 flex-wrap'>
      {products.length > 0 && (
        products.map(product => (
          <Link key={product.product_id} className="card bg-base-100 w-96 shadow-sm" href={`/products/${product.product_id}`}>
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
        ))
      )}
    </div>
  )
}
