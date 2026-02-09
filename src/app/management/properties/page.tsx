'use client'

import { PropertyResponse } from '@//types/properties'
import { Delete02Icon, PencilEdit02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Properties() {
    const [name, setName] = useState('')

    const [editing, setEditing] = useState<PropertyResponse | null>(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const [properties, setProperties] = useState<Record<string, any>[]>([])
    const [propertyOptions, setPropertyOptions] = useState<Record<string, any>[]>([])

    let index = 0

    useEffect(() => {
        loadProperties()
    }, [])

    const resetForm = () => {
        setName('')
        setEditing(null)
    }

    const atualizarLista = async () => {
        setProperties([])
        await loadProperties()
    }

    const loadProperties = async () => {
        const response = await fetch('/api/properties', {
            method: 'GET'
        })

        const data: Record<string, any>[] = await response.json();
        console.log('property', data)
        setProperties(data)
        loadPropertyOptions(data[0].product_id)
    }

    const loadPropertyOptions = async (property_id: string) => {
        const response = await fetch(`/api/properties/${property_id}`, {
            method: 'GET'
        })

        const data: Record<string, any>[] = await response.json();
        console.log('property options', data)
        setPropertyOptions(data)
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        editing ? handleOnFormEdit(e, editing.property_id) : handleOnFormSubmit(e)
    }

    const handleOnFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)

        try {
            const formData = new FormData()
            formData.append('name', name)
            console.log('formData', formData)
            const response = await fetch('/api/properties', {
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

            const response = await fetch(`/api/properties/${category_id}`, {
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
            const response = await fetch(`/api/properties/${product_id}`, {
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

    const handleOnEdit = async (product_id: String) => {
        setLoading(true)

        try {
            const response = await fetch(`/api/properties/${product_id}`, {
                method: 'GET'
            })

            if (response.ok) {
                const data: PropertyResponse = await response.json()
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
            <h2>Properties</h2>
            <p>On this page you can edit all the properties of the website</p>

            <div className="flex justify-center gap-10 mt-5">
                <form onSubmit={handleFormSubmit}>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                        <legend className="fieldset-legend">Property</legend>

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
                >Recarregar Properties</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Property</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((result: Record<string, any>, index: number) => (
                            <tr key={result.product_id} className="hover:bg-base-300">
                                <th>{index + 1}</th>
                                <td>{result.name}</td>
                                <td>
                                    <button
                                        onClick={() => handleOnDelete(result.property_id)}
                                        className="btn">
                                        <HugeiconsIcon icon={Delete02Icon} size={24} />
                                    </button>
                                    <button
                                        onClick={() => handleOnEdit(result.property_id)}
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
