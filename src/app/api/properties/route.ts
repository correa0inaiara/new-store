import { NextRequest, NextResponse } from "next/server";
import { getProperties, postProperty } from "../../lib/prisma-db-properties";

// get -> properties - ok
// post -> property - ok
// get by id -> property options - ok
// update -> property 
// delete -> property

export async function GET(request: NextRequest) {
    try {
        const properties = await getProperties();
        return NextResponse.json(properties);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
  console.log('/api/properties post', request)
  const formData = await request.formData()
  console.log('formData', formData)
  
  const name = formData.get('name') as string
  // const imageFile = formData.get('image') as File
  // const image_name = formData.get('image_name') as string

  // Converte File -> ArrayBuffer -> Buffer (Bytes para o Prisma)
  // const bytes = await imageFile.arrayBuffer()

  // Chame sua função postProduct passando o buffer
  const product = await postProperty(name)
  
  return new Response(JSON.stringify({ success: true }), { status: 201 })
}