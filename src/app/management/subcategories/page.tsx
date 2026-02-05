'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import { Delete02Icon, PencilEdit02Icon } from '@hugeicons/core-free-icons'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SubcategoryResponse } from '@//types/subcategories'
import { CategoryResponse } from '@//types/categories'


export default function Categories() {  
  const [titleSub, setTitleSub] = useState('')
  const [nameSub, setNameSub] = useState('')
  const [parentCategory, setParentCategory] = useState('')
  const [subcategoryBanner, setSubcategoryBanner] = useState<File | null>(null)
  const [previewUrlSub, setPreviewUrlSub] = useState<string | null>(null)
  const [editingSub, setEditingSub] = useState<SubcategoryResponse | null>(null)
  const [loadingSub, setLoadingSub] = useState(false)

  const router = useRouter()
  const [subcategories, setSubcategories] = useState<Record<string, any>[]>([])
  const [categories, setCategories] = useState<Record<string, any>[]>([])

  let index = 0

  useEffect(() => {
    loadCategories()
    loadSubcategories()
  }, [])

  useEffect(() => {
    if (!subcategoryBanner) {
      setPreviewUrlSub(null)
      return
    }

    const objectUrlSub = URL.createObjectURL(subcategoryBanner)
    setPreviewUrlSub(objectUrlSub)

    return () => URL.revokeObjectURL(objectUrlSub)
  }, [subcategoryBanner])

  const resetForm = () => {
    setTitleSub('')
    setNameSub('')
    setParentCategory('')
    setSubcategoryBanner(null)
    setPreviewUrlSub(null)
    setEditingSub(null)
  }

  const atualizarSubcategorias = async () => {
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

  const handleSubFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    editingSub ? handleSubEditFormSubmit(e, editingSub.subcategory_id) : handleOnSubcategoryFormSubmit(e)
  }

  const handleSubEditFormSubmit = async (e: React.FormEvent<HTMLFormElement>, subcategory_id: string) => {
    e.preventDefault()
    if (!subcategoryBanner) return alert("Selecione uma imagem")

    setLoadingSub(true)

    try {
      const formData = new FormData()
      formData.append('title', titleSub)
      formData.append('name', nameSub)
      // formData.append('image', subcategoryBanner)
      formData.append('image_name', subcategoryBanner.name)
      formData.append('category_id', parentCategory)

      const response = await fetch(`/api/subcategories/${subcategory_id}`, {
        method: 'PATCH',
        body: formData
      })

      if (response.ok) {
        router.refresh()
        atualizarSubcategorias()
        resetForm()
        alert("Subcategoria editada com sucesso!")
      }
    } catch (error) {
      console.error('Error: ', error)
    } finally {
      setLoadingSub(false)
    }

  }

  const handleOnSubcategoryFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!subcategoryBanner) return alert("Selecione uma imagem")

    setLoadingSub(true)

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
        atualizarSubcategorias()
        resetForm()
        alert("Subcategoria criada com sucesso!")
      }
    } catch (error) {
      console.error('Error: ', error)
    } finally {
      setLoadingSub(false)
    }

  }

  const handleOnSubcategoryDelete = async (subcategory_id: String) => {
    setLoadingSub(true)

    try {
      const response = await fetch(`/api/subcategories/${subcategory_id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        router.refresh()
        atualizarSubcategorias()
        alert("Subcategoria deletada com sucesso!")
      }
    } catch (error) {
      console.error('Error: ', error)
    } finally {
      setLoadingSub(false)
    }
  }

  const handleOnSubcategoryEdit = async (subcategory_id: String) => {
    setLoadingSub(true)

    try {
      const response = await fetch(`/api/subcategories/${subcategory_id}`, {
        method: 'GET'
      })

      if (response.ok) {
        const data: SubcategoryResponse = await response.json()
        console.log(data)
        setTitleSub(data.title)
        setNameSub(data.name)
        setParentCategory(data.category_id)
        setEditingSub(data)
      }
    } catch (error) {
      console.error('Error: ', error)
    } finally {
      setLoadingSub(false)
    }
  }

  return (
    <div>
      <h2>Subcategories</h2>
      <p>On this page you can edit all the subcategories of the website</p>

      <div className="flex justify-center gap-10 mt-5">
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

            <button className="btn btn-neutral mt-4" disabled={loadingSub}>
              {
                editingSub ?
                  (
                    loadingSub ?
                      ('Editing') :
                      ('Edit')
                  ) :
                  (
                    loadingSub ?
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
          onClick={atualizarSubcategorias}
        >Recarregar Subcategorias</button>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Subcategory</th>
              <th>Internal Name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((result: Record<string, any>, index: number) => (
              <tr key={result.subcategory_id} className="hover:bg-base-300">
                <th>{index + 1}</th>
                <td>{result.title}</td>
                <td>{result.name}</td>
                <td>{result.category?.title}</td>
                <td>
                  <button 
                    onClick={() => handleOnSubcategoryDelete(result.subcategory_id)}
                    className="btn">
                    <HugeiconsIcon icon={Delete02Icon} size={24} />
                  </button>
                  <button 
                    onClick={() => handleOnSubcategoryEdit(result.subcategory_id)}
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
