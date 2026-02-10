'use client'

import { PropertyOptionsResponse, PropertyResponse } from '@//types/properties'
import { Delete02Icon, PencilEdit02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Properties() {
    const [option, setOption] = useState('')
    const [sku, setSku] = useState('')
    const [propertyId, setPropertyId] = useState('')

    const [editing, setEditing] = useState<PropertyOptionsResponse | null>(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const [properties, setProperties] = useState<Record<string, any>[]>([])
    const [propertyOptions, setPropertyOptions] = useState<Record<string, any>[]>([])

    let index = 0

    useEffect(() => {
        loadProperties()
        loadPropertyOptions()
    }, [])

    const resetForm = () => {
        setOption('')
        setSku('')
        setPropertyId('')
        setEditing(null)
    }

    const atualizarLista = async () => {
        setPropertyOptions([])
        await loadPropertyOptions()
    }

    const loadProperties = async () => {
        const response = await fetch('/api/properties', {
            method: 'GET'
        })

        const data: Record<string, any>[] = await response.json();
        console.log('property', data)
        setProperties(data)
    }

    const loadPropertyOptions = async () => {
        const response = await fetch(`/api/property-options`, {
            method: 'GET'
        })

        const data: Record<string, any>[] = await response.json();
        console.log('property options', data)
        setPropertyOptions(data)
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        editing ? handleOnFormEdit(e, editing.property_options_id) : handleOnFormSubmit(e)
    }

    const handleOnFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)

        try {
            const formData = new FormData()
            formData.append('option', option)
            formData.append('sku', sku)
            formData.append('property_id', propertyId)
            console.log('formData', formData)
            const response = await fetch('/api/property-options', {
                method: 'POST',
                body: formData
            })

            if (response.ok) {
                router.refresh()
                atualizarLista()
                resetForm()
                alert("Opção de propriedade criado com sucesso!")
            }
        } catch (error) {
            console.error('Error: ', error)
        } finally {
            setLoading(false)
        }

    }

    const handleOnFormEdit = async (e: React.FormEvent<HTMLFormElement>, property_options_id: string) => {
        e.preventDefault()

        setLoading(true)

        try {
            const formData = new FormData()
            formData.append('option', option)
            formData.append('sku', sku)
            formData.append('property_id', propertyId)

            const response = await fetch(`/api/property-options/${property_options_id}`, {
                method: 'PATCH',
                body: formData
            })

            if (response.ok) {
                router.refresh()
                atualizarLista()
                resetForm()
                alert("Opção de propriedade editada com sucesso!")
            }
        } catch (error) {
            console.error('Error: ', error)
        } finally {
            setLoading(false)
        }

    }

    const handleOnDelete = async (property_options_id: String) => {
        setLoading(true)

        try {
            const response = await fetch(`/api/property-options/${property_options_id}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                router.refresh()
                atualizarLista()
                alert("Opção de propriedade deletada com sucesso!")
            }
        } catch (error) {
            console.error('Error: ', error)
        } finally {
            setLoading(false)
        }
    }

    const handleOnEdit = async (property_options_id: String) => {
        setLoading(true)

        try {
            const response = await fetch(`/api/property-options/${property_options_id}`, {
                method: 'GET'
            })

            if (response.ok) {
                const data: PropertyOptionsResponse = await response.json()
                console.log(data)
                setOption(data.option)
                setSku(data.sku)
                setPropertyId(data.property_id)
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
            <h2>Property Options</h2>
            <p>On this page you can edit all the properties of the website</p>

            <div className="flex justify-center gap-10 mt-5">
                <form onSubmit={handleFormSubmit}>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                        <legend className="fieldset-legend">Property</legend>

                        <label className="label">Option</label>
                        <input type="text" className="input" value={option} onChange={(e) => setOption(e.target.value)} />

                        <label className="label">SKU</label>
                        <input type="text" className="input" value={sku} onChange={(e) => setSku(e.target.value)} />
                        
                        <select defaultValue="Pick a category" className="select" onChange={(e) => setPropertyId(e.target.value)}>
                            <option disabled={true}>Property</option>
                            {properties.map((property: any) => (
                                <option key={property.property_id} value={property.property_id}>{property.name}</option>
                            ))}
                        </select>

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
                >Recarregar Property Options</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Property</th>
                            <th>SKU</th>
                            <th>Property</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {propertyOptions.map((result: Record<string, any>, index: number) => (
                            <tr key={result.property_options_id} className="hover:bg-base-300">
                                <th>{index + 1}</th>
                                <td>{result.option}</td>
                                <td>{result.sku}</td>
                                <td>{result.property.name}</td>
                                <td>
                                    <button
                                        onClick={() => handleOnDelete(result.property_options_id)}
                                        className="btn">
                                        <HugeiconsIcon icon={Delete02Icon} size={24} />
                                    </button>
                                    <button
                                        onClick={() => handleOnEdit(result.property_options_id)}
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
