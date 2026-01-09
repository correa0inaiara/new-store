import { NextRequest, NextResponse } from "next/server";
import { getAllSubcategories, postSubcategory } from "../../lib/prisma-db-subcategories";

export async function GET(request: NextRequest) {
    try {
        const subcategorias = await getAllSubcategories();
        return NextResponse.json(subcategorias);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
  const formData = await request.formData()
  
  const title = formData.get('title') as string
  const name = formData.get('name') as string
  const imageFile = formData.get('image') as File
  const image_name = formData.get('image_name') as string
  const category_id = formData.get('category_id') as string

  // Converte File -> ArrayBuffer -> Buffer (Bytes para o Prisma)
  const bytes = await imageFile.arrayBuffer()

  // Chame sua função postCategory passando o buffer
  const category = await postSubcategory(title, name, category_id)
  console.log("category route.ts", category)
  
  return new Response(JSON.stringify({ success: true }), { status: 201 })
}

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const query = searchParams.get("q") || "";

//   const products = await prisma.product.findMany({
//     where: {
//       OR: [
//         { title: { contains: query, mode: "insensitive" } },
//         { description: { contains: query, mode: "insensitive" } }
//       ]
//     }
//   });

//   return NextResponse.json(products);
// }
