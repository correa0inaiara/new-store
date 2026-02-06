'use client'

import { ProductResponse } from '@//types/products'
import { Delete02Icon, PencilEdit02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Products() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [brand, setBrand] = useState('')
    const [stock, setStock] = useState('')
    const [productImage, setProductImage] = useState<File | null>(null)
    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')


    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [editing, setEditing] = useState<ProductResponse | null>(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const [products, setProducts] = useState<Record<string, any>[]>([])

    let index = 0

    useEffect(() => {
        loadProducts()
    }, [])

    useEffect(() => {
        if (!productImage) {
            setPreviewUrl(null)
            return
        }

        const objectUrl = URL.createObjectURL(productImage)
        setPreviewUrl(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [productImage])

    const resetForm = () => {
        setTitle('')
        setDescription('')
        setPrice('')
        setBrand('')
        setStock('')
        setCategory('')
        setSubcategory('')
        setProductImage(null)
        setPreviewUrl(null)
        setEditing(null)
    }

    const atualizarLista = async () => {
        setProducts([])
        await loadProducts()
    }

    const loadProducts = async () => {
        const response = await fetch('/api/products', {
            method: 'GET'
        })

        const data: Record<string, any>[] = await response.json();
        setProducts(data)
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        editing ? handleOnFormEdit(e, editing.product_id) : handleOnFormSubmit(e)
    }

    const handleOnFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!productImage) return alert("Selecione uma imagem")

        setLoading(true)

        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('brand', brand)
            formData.append('stock', stock)
            formData.append('category', category)
            formData.append('subcategory', subcategory)
            // formData.append('image', productImage)
            formData.append('image_name', productImage.name)

            const response = await fetch('/api/products', {
                method: 'POST',
                body: formData
            })

            if (response.ok) {
                router.refresh()
                atualizarLista()
                resetForm()
                alert("Categoria criada com sucesso!")
            }
        } catch (error) {
            console.error('Error: ', error)
        } finally {
            setLoading(false)
        }

    }

    const handleOnFormEdit = async (e: React.FormEvent<HTMLFormElement>, category_id: string) => {
        e.preventDefault()
        if (!productImage) return alert("Selecione uma imagem")

        setLoading(true)

        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('brand', brand)
            formData.append('stock', stock)
            formData.append('category', category)
            formData.append('subcategory', subcategory)
            // formData.append('image', productImage)
            formData.append('image_name', productImage.name)

            const response = await fetch(`/api/products/${category_id}`, {
                method: 'PATCH',
                body: formData
            })

            if (response.ok) {
                router.refresh()
                atualizarLista()
                resetForm()
                alert("Categoria editada com sucesso!")
            }
        } catch (error) {
            console.error('Error: ', error)
        } finally {
            setLoading(false)
        }

    }

    const handleOnDelete = async (category_id: String) => {
        setLoading(true)

        try {
            const response = await fetch(`/api/products/${category_id}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                router.refresh()
                atualizarLista()
                alert("Categoria deletada com sucesso!")
            }
        } catch (error) {
            console.error('Error: ', error)
        } finally {
            setLoading(false)
        }
    }

    const handleOnEdit = async (product_id: String) => {
        setLoading(true)

        try {
            const response = await fetch(`/api/products/${product_id}`, {
                method: 'GET'
            })

            if (response.ok) {
                const data: ProductResponse = await response.json()
                console.log(data)
                setTitle(data.title)
                setDescription(data.description)
                setBrand(data.brand)
                setPrice(data.price.toString())
                setStock(data.stock.toString())
                setCategory(data.category.category_id)
                setSubcategory(data.subcategory.subcategory_id)
                setEditing(data)
            }

        } catch (error) {
            console.error('Error: ', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2>Products</h2>
            <p>On this page you can edit all the products of the website</p>

            <div className="flex justify-center gap-10 mt-5">
                <form onSubmit={handleFormSubmit}>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                        <legend className="fieldset-legend">Category</legend>

                        <label className="label">Title</label>
                        <input type="text" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />

                        <label className="label">Description</label>
                        <input type="text" className="input" value={description} onChange={(e) => setDescription(e.target.value)} />

                        <label className="label">Brand</label>
                        <input type="text" className="input" value={brand} onChange={(e) => setBrand(e.target.value)} />

                        <label className="label">Price</label>
                        <input type="number" step={0.01} className="input" value={price} onChange={(e) => setPrice(e.target.value)} />

                        <label className="label">Stock</label>
                        <input type="number" step={1} className="input" value={price} onChange={(e) => setPrice(e.target.value)} />

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Product's Image</legend>
                            <input
                                type="file"
                                className="file-input"
                                accept="image/*"
                                onChange={(e) => setProductImage(e.target.files?.[0] || null)}
                            />

                            {previewUrl && (
                                <div className="mt-4">
                                    <p className="text-xs mb-2">Preview:</p>
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full max-w-xs rounded-lg border border-base-300 shadow-sm"
                                    />
                                </div>
                            )}
                        </fieldset>

                        <button className="btn btn-neutral mt-4" disabled={loading}>
                            {/* 
                - editando categoria?
                  - sim
                    - carregando categoria?
                      - sim: Editando
                      - não: Editar
                  - não
                    - carregando categoria?
                      - sim: Criando
                      - não: Criar
              */}
                            {
                                editing ?
                                    (
                                        loading ?
                                            ('Editing') :
                                            ('Edit')
                                    ) :
                                    (
                                        loading ?
                                            ('Creating') :
                                            ('Create')
                                    )
                            }
                        </button>
                    </fieldset>
                </form>
            </div>

            <div className="overflow-x-auto mt-5">
                <button
                    className="btn"
                    onClick={atualizarLista}
                >Recarregar Products</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Description</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Subcategory</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((result: Record<string, any>, index: number) => (
                            <tr key={result.category_id} className="hover:bg-base-300">
                                <th>{index + 1}</th>
                                <td>{result.title}</td>
                                <td>{result.description}</td>
                                <td>{result.brand}</td>
                                <td>{result.price}</td>
                                <td>{result.stock}</td>
                                <td>{result.category}</td>
                                <td>{result.subcategory}</td>
                                <td>
                                    <button
                                        onClick={() => handleOnDelete(result.category_id)}
                                        className="btn">
                                        <HugeiconsIcon icon={Delete02Icon} size={24} />
                                    </button>
                                    <button
                                        onClick={() => handleOnEdit(result.category_id)}
                                        className="btn">
                                        <HugeiconsIcon icon={PencilEdit02Icon} size={24} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
