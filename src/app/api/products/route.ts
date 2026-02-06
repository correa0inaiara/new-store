import { NextRequest, NextResponse } from "next/server";
import { getAllProducts, postProduct } from "../../lib/prisma-db-products";
import { Decimal } from "@prisma/client/runtime/client";

export async function GET(request: NextRequest) {
    try {
        const products = await getAllProducts();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    console.log('/api/products post', request)
  const formData = await request.formData()
  
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const brand = formData.get('brand') as string
  const price = formData.get('price') as string
  const stock = formData.get('stock') as string
  const category_id = formData.get('category_id') as string
  const subcategory_id = formData.get('subcategory_id') as string
  // const imageFile = formData.get('image') as File
  // const image_name = formData.get('image_name') as string

  // Converte File -> ArrayBuffer -> Buffer (Bytes para o Prisma)
  // const bytes = await imageFile.arrayBuffer()

  // Chame sua função postProduct passando o buffer
  const product = await postProduct(title, description, brand, new Decimal(price), parseInt(stock), category_id, subcategory_id)
  
  return new Response(JSON.stringify({ success: true }), { status: 201 })
}
