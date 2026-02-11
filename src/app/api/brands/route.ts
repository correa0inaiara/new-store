import { NextRequest, NextResponse } from "next/server";
import { getBrands, postBrand } from "../../lib/prisma-db-brands";

// get -> brands
// post -> brand
// get by id -> brand
// update -> brand 
// delete -> brand

export async function GET(request: NextRequest) {
    try {
        const brands = await getBrands();
        return NextResponse.json(brands);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
  console.log('/api/brands post', request)
  const formData = await request.formData()
  console.log('formData', formData)
  
  const name = formData.get('name') as string
  // const imageFile = formData.get('image') as File
  // const image_name = formData.get('image_name') as string

  // Converte File -> ArrayBuffer -> Buffer (Bytes para o Prisma)
  // const bytes = await imageFile.arrayBuffer()

  // Chame sua função postProduct passando o buffer
  const product = await postBrand(name)
  
  return new Response(JSON.stringify({ success: true }), { status: 201 })
}