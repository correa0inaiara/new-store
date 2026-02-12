import { Brand } from '@//types/menu'
import React, { useEffect, useState } from 'react'

interface FiltrosProps {
    filteredBrands: Brand[]
    minPrice: string
    maxPrice: string
    callback: (args: BrandsObj) => void
}

export type BrandsObj = Record<string, {name: boolean, brand_id: string}>

export default function Filtros({ filteredBrands, minPrice, maxPrice, callback }: FiltrosProps) {
    const [price, setPrice] = useState(maxPrice)
    const [brands, setBrands] = useState<BrandsObj>({})
    const step = parseFloat(maxPrice) / 10

    const toggleBrand = (brandName: string) => {
        setBrands(prev => ({
            ...prev,
            [brandName]: {
                name: !prev[brandName]?.name,
                brand_id: prev[brandName]?.brand_id
            }
        }))
    }

    useEffect(() => {
        callback(brands)
    }, [brands])

    useEffect(() => {
        let brands_obj: BrandsObj = {}
        filteredBrands.forEach(brand => {
            brands_obj[brand.name] = {
                name: true,
                brand_id: brand.brand_id
            }
        })
        setBrands(brands_obj)
    }, [])

    const resetBrands = () => {
        setBrands({})
    }

    return (
        <div className='mt-10 mb-10'>
            <div className='mb-5'>
                <h1>Filtre por Preços</h1>
                Preço mínimo: {minPrice}
                Preço máximo: {maxPrice}
                <div className="w-full max-w-xs">
                    Preço Máximo {price}
                    <input 
                        onChange={(e) => setPrice(e.target.value)}
                        type="range" 
                        min={minPrice} 
                        max={maxPrice} 
                        defaultValue={maxPrice} 
                        className="range" 
                        step={step} />
                    <div className="flex justify-between px-2.5 mt-2 text-xs">
                        {Array.from({ length: 10 }, (v, k) => (
                            <span key={k}>|</span>
                        ))}
                    </div>
                    <div className="flex justify-between px-2.5 mt-2 text-xs">
                        <span>{Math.floor(parseFloat(minPrice))}</span>
                        {Array.from({ length: 8 }, (v, k) => (
                            <span key={k}>{Math.floor(step * (k + 1))}</span>
                        ))}
                        <span>{Math.floor(parseFloat(maxPrice))}</span>
                    </div>
                </div>
            </div>
            <div>
                <h1>Filtre por Marcas</h1>
                <ul>
                    {/* <form> */}
                        {brands && filteredBrands && filteredBrands.length > 0 && (
                            filteredBrands.map((brand, index) => (
                                <input 
                                    key={brand.brand_id} 
                                    className="btn" 
                                    type="checkbox" 
                                    name={brand.name}
                                    aria-label={brand.name}
                                    checked={brands[brand.name]?.name ?? false}
                                    onChange={(e) => toggleBrand(brand.name)}
                                 />
                            ))
                        )}
                        <input
                            className="btn btn-square" 
                            type="reset" 
                            value="×"
                            onClick={() => resetBrands()}
                        />
                    {/* </form> */}
                </ul>
            </div>
        </div>
    )
}
