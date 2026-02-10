'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import { Delete02Icon, PencilEdit02Icon } from '@hugeicons/core-free-icons'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CategoryResponse } from '@//types/categories'


export default function Categories() {
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [categoryBanner, setCategoryBanner] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [editingCat, setEditingCat] = useState<CategoryResponse | null>(null)
  const [loadingCat, setLoadingCat] = useState(false)

  const router = useRouter()
  const [categories, setCategories] = useState<Record<string, any>[]>([])

  let index = 0

  useEffect(() => {
    loadCategories()
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

  const resetForm = () => {
    setTitle('')
    setName('')
    setCategoryBanner(null)
    setPreviewUrl(null)
    setEditingCat(null)
  }

  const atualizarCategorias = async () => {
    setCategories([])
    await loadCategories()
  }

  const loadCategories = async () => {
    const response = await fetch('/api/categories', {
      method: 'GET'
    })

    const data: Record<string, any>[] = await response.json();
    setCategories(data)
  }
  
  const handleCatFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    editingCat ? handleCatEditFormSubmit(e, editingCat.category_id) : handleOnCategoryFormSubmit(e)
  }

  const handleOnCategoryFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!categoryBanner) return alert("Selecione uma imagem")

    setLoadingCat(true)

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
        atualizarCategorias()
        resetForm()
        alert("Categoria criada com sucesso!")
      }
    } catch (error) {
      console.error('Error: ', error)
    } finally {
      setLoadingCat(false)
    }

  }

  const handleCatEditFormSubmit = async (e: React.FormEvent<HTMLFormElement>, category_id: string) => {
    e.preventDefault()
    if (!categoryBanner) return alert("Selecione uma imagem")

    setLoadingCat(true)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('name', name)
      // formData.append('image', categoryBanner)
      formData.append('image_name', categoryBanner.name)

      const response = await fetch(`/api/categories/${category_id}`, {
        method: 'PATCH',
        body: formData
      })

      if (response.ok) {
        router.refresh()
        atualizarCategorias()
        resetForm()
        alert("Categoria editada com sucesso!")
      }
    } catch (error) {
      console.error('Error: ', error)
    } finally {
      setLoadingCat(false)
    }

  }

  const handleOnCategoryDelete = async (category_id: String) => {
    setLoadingCat(true)

    try {
      const response = await fetch(`/api/categories/${category_id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        router.refresh()
        atualizarCategorias()
        alert("Categoria deletada com sucesso!")
      }
    } catch (error) {
      console.error('Error: ', error)
    } finally {
      setLoadingCat(false)
    }
  }

  const handleOnCategoryEdit = async (category_id: String) => {
    setLoadingCat(true)

    try {
      const response = await fetch(`/api/categories/${category_id}`, {
        method: 'GET'
      })

      if (response.ok) {
        const data: CategoryResponse = await response.json()
        console.log(data)
        setTitle(data.title)
        setName(data.name)
        setEditingCat(data)
      }

    } catch (error) {
      console.error('Error: ', error)
    } finally {
      setLoadingCat(false)
    }
  }

  return (
    <div>
      <h2>Categories</h2>
      <p>On this page you can edit all the categories of the website</p>

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

            <button className="btn btn-neutral mt-4" disabled={loadingCat}>
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
                editingCat ?
                  (
                    loadingCat ?
                      ('Editing') :
                      ('Edit')
                  ) :
                  (
                    loadingCat ?
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
          onClick={atualizarCategorias}
        >Recarregar Categorias</button>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Category</th>
              <th>Internal Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((result: Record<string, any>, index: number) => (
              <tr key={result.category_id} className="hover:bg-base-300">
                <th>{index + 1}</th>
                <td>{result.title}</td>
                <td>{result.name}</td>
                <td>
                  <button 
                    onClick={() => handleOnCategoryDelete(result.category_id)}
                    className="btn">
                    <HugeiconsIcon icon={Delete02Icon} size={24} />
                  </button>
                  <button 
                    onClick={() => handleOnCategoryEdit(result.category_id)}
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
