import { deleteProperty, getPropertyById, getPropertyOptionsByPropertyId, updateProperty } from "@//app/lib/prisma-db-properties";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{id: string}> }
) {
    try {
        const { id } = await params
        const property_options = await getPropertyOptionsByPropertyId(id);

        if (!property_options) {
            return NextResponse.json({ error: "Property options Not Found" }, { status: 404 });
        }

        return NextResponse.json(property_options);
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
        const property = await getPropertyById(id);

        if (!property) {
            return NextResponse.json({ error: "Property Not Found" }, { status: 404 });
        }

        const name = formData.get('name') as string

        property.name = name || property.name

        const result = await updateProperty(
            id, 
            property?.name
        );

        return NextResponse.json(property);
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
        const property = await getPropertyById(id);

        if (!property) {
            return NextResponse.json({ error: "Property Not Found" }, { status: 404 });
        }

        const result = await deleteProperty(id);

        return NextResponse.json(property);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}