import { HugeiconsIcon } from '@hugeicons/react'
import { Delete02Icon, Notification03Icon, PencilEdit02Icon } from '@hugeicons/core-free-icons'
import { SubcategoryType } from "@//types/breadcrumbs"
import { getCategories } from "./actions"

export default async function Categories() {
  //  const { sessionClaims } = await auth()

  //   if (sessionClaims?.metadata?.role !== "seller") {
  //       throw new Error("Not Authorized")
  //   }
// @ts-ignore
// const myIcon : IconProp = "fa-regular fa-trash-can"
  const results = await getCategories()
  console.log('results', results)
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
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend">Category</legend>

              <label className="label">Name</label>
              <input type="text" className="input" placeholder="Category Name" />

              <button className="btn btn-neutral mt-4">Create</button>
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend">Subcategory</legend>

              <label className="label">Name</label>
              <input type="text" className="input" placeholder="Subcategory Name" />

              <select defaultValue="Pick a color" className="select">
                <option disabled={true}>Category</option>
                <option>Crimson</option>
                <option>Amber</option>
                <option>Velvet</option>
              </select>

              <button className="btn btn-neutral mt-4">Create</button>
            </fieldset>
          </div>
        </div>
      </div>

      {/* 
      
      
      {
          "name": "smartphones",
          "title": "Smartphones",
          "image": null,
          "category_id": "cbfce4fa-6789-4d26-a7ea-7c8686608306",
          "subcategory_id": "028e78df-e270-487f-bdfa-6e6c0e076a9d",
          "category": {
              "name": "electronics",
              "title": "Electrônicos",
              "image": null,
              "category_id": "cbfce4fa-6789-4d26-a7ea-7c8686608306"
          }
      }

      */}

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
            {results.map((result: SubcategoryType) => (
              <tr key={result.subcategory_id} className="hover:bg-base-300">
                <th>1</th>  
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
