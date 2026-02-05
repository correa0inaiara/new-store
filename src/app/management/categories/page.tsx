'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import { Delete02Icon, PencilEdit02Icon } from '@hugeicons/core-free-icons'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SubcategoryResponse } from '@//types/subcategories'


export default function Categories() {
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [categoryBanner, setCategoryBanner] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [titleSub, setTitleSub] = useState('')
  const [nameSub, setNameSub] = useState('')
  const [parentCategory, setParentCategory] = useState('')
  const [subcategoryBanner, setSubcategoryBanner] = useState<File | null>(null)
  const [previewUrlSub, setPreviewUrlSub] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const [categories, setCategories] = useState<Record<string, any>[]>([])
  const [subcategories, setSubcategories] = useState<Record<string, any>[]>([])

  let index = 0

  useEffect(() => {
    loadCategories()
    loadSubcategories()
  }, [])

  useEffect(() => {
    if (!categoryBanner) {
      setPreviewUrl(null)
      return
    }

    const objectUrl = URL.createObjectURL(categoryBanner)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [categoryBanner])

  useEffect(() => {
    if (!subcategoryBanner) {
      setPreviewUrlSub(null)
      return
    }

    const objectUrlSub = URL.createObjectURL(subcategoryBanner)
    setPreviewUrlSub(objectUrlSub)

    return () => URL.revokeObjectURL(objectUrlSub)
  }, [subcategoryBanner])

  const atualizarLista = async () => {
    setSubcategories([])
    await loadSubcategories()
  }

  const loadCategories = async () => {
    const response = await fetch('/api/categories', {
      method: 'GET'
    })

    const data: Record<string, any>[] = await response.json();
    setCategories(data)
  }

  const loadSubcategories = async () => {
    const response = await fetch('/api/subcategories', {
      method: 'GET'
    })

    const data: Record<string, any>[] = await response.json();
    setSubcategories(data)
  }

  const handleCatFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!categoryBanner) return alert("Selecione uma imagem")

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('name', name)
      formData.append('image', categoryBanner)
      formData.append('image_name', categoryBanner.name)

      const response = await fetch('/api/categories', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        router.refresh()
        alert("Categoria criada com sucesso!")
      }
    } catch (error) {
      console.error('Error: ', error)
    } finally {
      setLoading(false)
    }

  }

  const handleSubFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!subcategoryBanner) return alert("Selecione uma imagem")

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('title', titleSub)
      formData.append('name', nameSub)
      formData.append('image', subcategoryBanner)
      formData.append('image_name', subcategoryBanner.name)
      formData.append('category_id', parentCategory)

      const response = await fetch('/api/subcategories', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        router.refresh()
        alert("Subcategoria criada com sucesso!")
      }
    } catch (error) {
      console.error('Error: ', error)
    } finally {
      setLoading(false)
    }

  }

  const handleOnDelete = async (subcategory_id: String) => {
    setLoading(true)

    try {
      const response = await fetch(`/api/subcategories/${subcategory_id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        router.refresh()
        alert("Categoria deletada com sucesso!")
      }
    } catch (error) {
      console.error('Error: ', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOnEdit = async (subcategory_id: String) => {
    setLoading(true)

    try {
      const response = await fetch(`/api/subcategories/${subcategory_id}`, {
        method: 'GET'
      })


      /* 
      
        {
          "name": "movies",
          "title": "Filmes",
          "category_id": "a9855c3a-cefe-4202-af18-8ec4ba9de197",
          "subcategory_id": "54cdc2e7-0c1d-4a70-88f6-26a89b2d921a"
        }

      */

      if (response.ok) {
        const data: SubcategoryResponse = await response.json()
        console.log(data)
        setTitleSub(data.title)
        setNameSub(data.name)
        setParentCategory(data.category_id)
        // router.refresh()
        // alert("Categoria atualizada com sucesso!")
      }
    } catch (error) {
      console.error('Error: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Categories - Subcategories</h2>
      <p>On this page you can edit all the categories and subcategories of the website</p>

      <div className="flex justify-center gap-10 mt-5">
        <form onSubmit={handleCatFormSubmit}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Category</legend>

            <label className="label">Title</label>
            <input type="text" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />

            <label className="label">Name (Internal)</label>
            <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} />

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Banner</legend>
              <input
                type="file"
                className="file-input"
                accept="image/*"
                onChange={(e) => setCategoryBanner(e.target.files?.[0] || null)}
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
              {loading ? 'Creating...' : 'Create'}
            </button>
          </fieldset>
        </form>
        <form onSubmit={handleSubFormSubmit}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">SubCategory</legend>

            <label className="label">Title</label>
            <input type="text" className="input" value={titleSub} onChange={(e) => setTitleSub(e.target.value)} />

            <label className="label">Name (Internal)</label>
            <input type="text" className="input" value={nameSub} onChange={(e) => setNameSub(e.target.value)} />

            <select defaultValue="Pick a category" className="select" onChange={(e) => setParentCategory(e.target.value)}>
              <option disabled={true}>Category</option>
              {categories.map((category: any) => (
                <option key={category.category_id} value={category.category_id}>{category.title}</option>
              ))}
            </select>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Banner</legend>
              <input type="file" className="file-input" accept="image/*" onChange={(e) => setSubcategoryBanner(e.target.files?.[0]
                || null)}
              />

              {/* Renderização Condicional do Preview */}
              {previewUrlSub && (
                <div className="mt-4">
                  <p className="text-xs mb-2">Preview:</p>
                  <img src={previewUrlSub} alt="Preview" className="w-full max-w-xs rounded-lg border border-base-300 shadow-sm" />
                </div>
              )}
            </fieldset>

            <button className="btn btn-neutral mt-4" disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </button>
          </fieldset>
        </form>
      </div>

      <div className="overflow-x-auto mt-5">
        <button
          className="btn"
          onClick={atualizarLista}
        >Recarregar Lista</button>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Subcategory</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((result: Record<string, any>, index: number) => (
              <tr key={result.subcategory_id} className="hover:bg-base-300">
                <th>{index + 1}</th>
                <td>{result.title}</td>
                <td>{result.category?.title}</td>
                <td>
                  <button 
                    onClick={() => handleOnDelete(result.subcategory_id)}
                    className="btn">
                    <HugeiconsIcon icon={Delete02Icon} size={24} />
                  </button>
                  <button 
                    onClick={() => handleOnEdit(result.subcategory_id)}
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
