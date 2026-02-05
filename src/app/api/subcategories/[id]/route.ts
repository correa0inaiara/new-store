import { deleteSubcategory, getSubcategory, updateSubcategory } from "@//app/lib/prisma-db-subcategories";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{id: string}> }
) {
    try {
        const { id } = await params
        const subcategoria = await getSubcategory(id);
        
        if (!subcategoria) {
            return NextResponse.json({ error: "Subcategory Not Found" }, { status: 404 });
        }

        return NextResponse.json(subcategoria);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{id: string}> }
) {
    try {
        const formData = await request.formData()
        const { id } = await params
        const subcategoria = await getSubcategory(id);

        if (!subcategoria) {
            return NextResponse.json({ error: "Subcategory Not Found" }, { status: 404 });
        }

        const title = formData.get('title') as string
        const name = formData.get('name') as string
        const category_id = formData.get('category_id') as string

        subcategoria.name = name || subcategoria.name
        subcategoria.title = title || subcategoria.title
        subcategoria.category_id = category_id || subcategoria.category_id

        const result = await updateSubcategory(id, subcategoria?.title, subcategoria?.name, subcategoria?.category_id);

        return NextResponse.json(subcategoria);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{id: string}> }
) {
    try {
        const { id } = await params
        const subcategoria = await getSubcategory(id);

        if (!subcategoria) {
            return NextResponse.json({ error: "Subcategory Not Found" }, { status: 404 });
        }

        const result = await deleteSubcategory(id);

        return NextResponse.json(subcategoria);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}