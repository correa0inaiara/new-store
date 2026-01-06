'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import { Delete02Icon, PencilEdit02Icon } from '@hugeicons/core-free-icons'
import { SubcategoryType } from "@//types/breadcrumbs"
import { getCategories, getSubcategoriasWithCategories } from "./actions"
import { useState } from 'react'
import { useRouter } from 'next/navigation'


export default async function Categories() {
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [categoryBanner, setCategoryBanner] = useState('')

  const [titleSub, setTitleSub] = useState('')
  const [nameSub, setNameSub] = useState('')
  const [parentCategory, setParentCategory] = useState('')
  const [subcategoryBanner, setSubcategoryBanner] = useState('')

  const [loading, setLoading] = useState(false)

  const subcategories = await getSubcategoriasWithCategories()
  const categories = await getCategories()

  const router = useRouter()

  let index = 0

  const handleCatFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/react-form/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, name, categoryBanner })
      })

      if (response.ok) {
        router.push('/api/categories')
      }
    } catch (error) {
      console.error('Error: ', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/react-form/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, name, parentCategory, subcategoryBanner })
      })

      if (response.ok) {
        router.push('/api/subcategories')
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

      <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
        <input type="checkbox" />
        <div className="collapse-title font-semibold">How do I create a category or a subcategory?</div>
        <div className="collapse-content text-sm">
          <p>Through the forms below you create categories and subcategories</p>

          <div className="flex justify-center mt-5">
            <form onSubmit={handleCatFormSubmit}>
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Category</legend>

                <label className="label">Title</label>
                <input type="text" className="input" placeholder="Category Title" value={title} onChange={(e) => setTitle(e.target.value)} />

                <label className="label">Name used internally, for example: if the title is Home Appliances, the name will be  home-appliances</label>
                <input type="text" className="input" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} />

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Upload the category's banner</legend>
                  <input type="file" className="file-input" value={categoryBanner} onChange={(e) => setCategoryBanner(e.target.value)} />
                  <label className="label">Max size 2MB</label>
                </fieldset>

                <button className="btn btn-neutral mt-4">Create</button>
              </fieldset>
            </form>
            <form onSubmit={handleSubFormSubmit}>
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Subcategory</legend>

                <label className="label">Title</label>
                <input type="text" className="input" placeholder="Subcategory Title" value={titleSub} onChange={(e) => setTitleSub(e.target.value)} />

                <label className="label">Name used internally, for example: if the title is Home Appliances, the name will be  home-appliances</label>
                <input type="text" className="input" placeholder="Category Name" value={nameSub} onChange={(e) => setNameSub(e.target.value)} />

                <select defaultValue="Pick a category" className="select" value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
                  <option disabled={true}>Category</option>
                  {categories.map((category: any) => (
                    <option>{category.title}</option>
                  ))}
                </select>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Upload the subcategory's banner</legend>
                  <input type="file" className="file-input" value={subcategoryBanner} onChange={(e) => setSubcategoryBanner(e.target.value)} />
                  <label className="label">Max size 2MB</label>
                </fieldset>

                <button className="btn btn-neutral mt-4">Create</button>
              </fieldset>
            </form>



          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
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
            {subcategories.map((result: SubcategoryType) => (
              <tr key={result.subcategory_id} className="hover:bg-base-300">
                <th>{index += 1}</th>
                <td>{result.title}</td>
                <td>{result.category.title}</td>
                <td>
                  <button className="btn">
                    <HugeiconsIcon icon={Delete02Icon} size={24} color="currentColor" strokeWidth={1.5} />
                  </button>
                  <button className="btn">
                    <HugeiconsIcon icon={PencilEdit02Icon} size={24} color="currentColor" strokeWidth={1.5} />
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
