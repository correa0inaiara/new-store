import { deleteBrand, getBrandById, updateBrand } from "@//app/lib/prisma-db-brands";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{id: string}> }
) {
    try {
        const { id } = await params
        const brand = await getBrandById(id);

        if (!brand) {
            return NextResponse.json({ error: "Brand Not Found" }, { status: 404 });
        }

        return NextResponse.json(brand);
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
        const brand = await getBrandById(id);

        if (!brand) {
            return NextResponse.json({ error: "Brand Not Found" }, { status: 404 });
        }

        const name = formData.get('name') as string

        brand.name = name || brand.name

        const result = await updateBrand(
            id, 
            brand?.name
        );

        return NextResponse.json(brand);
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
        const brand = await getBrandById(id);

        if (!brand) {
            return NextResponse.json({ error: "Brand Not Found" }, { status: 404 });
        }

        const result = await deleteBrand(id);

        return NextResponse.json(brand);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}