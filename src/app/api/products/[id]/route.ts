import { deleteProduct, getProductById, updateProduct } from "@//app/lib/prisma-db-products";
import { Decimal } from "@prisma/client/runtime/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{id: string}> }
) {
    try {
        const { id } = await params
        const product = await getProductById(id);

        if (!product) {
            return NextResponse.json({ error: "Product Not Found" }, { status: 404 });
        }

        return NextResponse.json(product);
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
        const product = await getProductById(id);

        if (!product) {
            return NextResponse.json({ error: "Product Not Found" }, { status: 404 });
        }

        const title = formData.get('title') as string
        const description = formData.get('description') as string
        const brand = formData.get('brand') as string
        const price = formData.get('price') as string
        const stock = formData.get('stock') as string
        const category_id = formData.get('category_id') as string
        const subcategory_id = formData.get('subcategory_id') as string

        product.title = title || product.title
        product.description = description || product.description
        product.brand = brand || product.brand
        product.price = new Decimal(price) || product.price
        product.stock = parseInt(stock) || product.stock
        product.category_id = category_id || product.category_id
        product.subcategory_id = subcategory_id || product.subcategory_id

        const result = await updateProduct(
            id, 
            product?.title, 
            product?.description, 
            product?.brand, 
            product?.price, 
            product?.stock, 
            product?.category_id, 
            product?.subcategory_id
        );

        return NextResponse.json(product);
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
        const product = await getProductById(id);

        if (!product) {
            return NextResponse.json({ error: "Product Not Found" }, { status: 404 });
        }

        const result = await deleteProduct(id);

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}