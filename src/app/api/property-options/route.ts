// get -> property option
// post -> property option
// get by id -> property option
// update -> property option
// delete -> property option

import { NextRequest, NextResponse } from "next/server";
import { getPropertyOptions, postPropertyOption } from "../../lib/prisma-db-property-options";

export async function GET(request: NextRequest) {
    try {
        const properties = await getPropertyOptions();
        return NextResponse.json(properties);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
  console.log('/api/property-options post', request)
  const formData = await request.formData()
  console.log('formData', formData)
  
  const option = formData.get('option') as string
  const sku = formData.get('sku') as string
  const property_id = formData.get('property_id') as string
  // const imageFile = formData.get('image') as File
  // const image_name = formData.get('image_name') as string

  // Converte File -> ArrayBuffer -> Buffer (Bytes para o Prisma)
  // const bytes = await imageFile.arrayBuffer()

  // Chame sua função postProduct passando o buffer
  const product = await postPropertyOption(option, sku, property_id)
  
  return new Response(JSON.stringify({ success: true }), { status: 201 })
}