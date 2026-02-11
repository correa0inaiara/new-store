'use client'

import { BrandResponse } from '@//types/brands'
import { Delete02Icon, PencilEdit02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Brands() {
    const [name, setName] = useState('')

    const [editing, setEditing] = useState<BrandResponse | null>(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const [brands, setBrands] = useState<Record<string, any>[]>([])

    let index = 0

    useEffect(() => {
        loadBrands()
    }, [])

    const resetForm = () => {
        setName('')
        setEditing(null)
    }

    const atualizarLista = async () => {
        setBrands([])
        await loadBrands()
    }

    const loadBrands = async () => {
        const response = await fetch('/api/brands', {
            method: 'GET'
        })

        const data: Record<string, any>[] = await response.json();
        console.log('brand', data)
        setBrands(data)
        loadBrandOptions(data[0].product_id)
    }

    const loadBrandOptions = async (brand_id: string) => {
        const response = await fetch(`/api/brands/${brand_id}`, {
            method: 'GET'
        })

        const data: Record<string, any>[] = await response.json();
        console.log('brand options', data)
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        editing ? handleOnFormEdit(e, editing.brand_id) : handleOnFormSubmit(e)
    }

    const handleOnFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)

        try {
            const formData = new FormData()
            formData.append('name', name)
            console.log('formData', formData)
            const response = await fetch('/api/brands', {
                method: 'POST',
                body: formData
            })

            if (response.ok) {
                router.refresh()
                atualizarLista()
                resetForm()
                alert("Produto criado com sucesso!")
            }
        } catch (error) {
            console.error('Error: ', error)
        } finally {
            setLoading(false)
        }

    }

    const handleOnFormEdit = async (e: React.FormEvent<HTMLFormElement>, category_id: string) => {
        e.preventDefault()

        setLoading(true)

        try {
            const formData = new FormData()
            formData.append('name', name)

            const response = await fetch(`/api/brands/${category_id}`, {
                method: 'PATCH',
                body: formData
            })

            if (response.ok) {
                router.refresh()
                atualizarLista()
                resetForm()
                alert("Produto editada com sucesso!")
            }
        } catch (error) {
            console.error('Error: ', error)
        } finally {
            setLoading(false)
        }

    }

    const handleOnDelete = async (product_id: String) => {
        setLoading(true)

        try {
            const response = await fetch(`/api/brands/${product_id}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                router.refresh()
                atualizarLista()
                alert("Produto deletada com sucesso!")
            }
        } catch (error) {
            console.error('Error: ', error)
        } finally {
            setLoading(false)
        }
    }

    const handleOnEdit = async (brand_id: String) => {
        setLoading(true)

        try {
            const response = await fetch(`/api/brands/${brand_id}`, {
                method: 'GET'
            })

            if (response.ok) {
                const data: BrandResponse = await response.json()
                console.log(data)
                setName(data.name)
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
            <h2>Brands</h2>
            <p>On this page you can edit all the brands of the website</p>

            <div className="flex justify-center gap-10 mt-5">
                <form onSubmit={handleFormSubmit}>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                        <legend className="fieldset-legend">Brand</legend>

                        <label className="label">Name</label>
                        <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} />

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
                >Recarregar Brands</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Brand</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map((result: Record<string, any>, index: number) => (
                            <tr key={result.brand_id} className="hover:bg-base-300">
                                <th>{index + 1}</th>
                                <td>{result.name}</td>
                                <td>
                                    <button
                                        onClick={() => handleOnDelete(result.brand_id)}
                                        className="btn">
                                        <HugeiconsIcon icon={Delete02Icon} size={24} />
                                    </button>
                                    <button
                                        onClick={() => handleOnEdit(result.brand_id)}
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
