import { deleteCategory, getCategory, updateCategory } from "@//app/lib/prisma-db-categories";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{id: string}> }
) {
    try {
        const { id } = await params
        const category = await getCategory(id);

        if (!category) {
            return NextResponse.json({ error: "Category Not Found" }, { status: 404 });
        }

        return NextResponse.json(category);
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
        const categoria = await getCategory(id);

        if (!categoria) {
            return NextResponse.json({ error: "Category Not Found" }, { status: 404 });
        }

        const title = formData.get('title') as string
        const name = formData.get('name') as string

        categoria.name = name || categoria.name
        categoria.title = title || categoria.title

        const result = await updateCategory(id, categoria?.title, categoria?.name);

        return NextResponse.json(categoria);
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
        const categoria = await getCategory(id);

        if (!categoria) {
            return NextResponse.json({ error: "Category Not Found" }, { status: 404 });
        }

        const result = await deleteCategory(id);

        return NextResponse.json(categoria);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}