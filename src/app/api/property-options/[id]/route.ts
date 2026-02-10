import { deleteProperty, getPropertyById, updateProperty } from "@//app/lib/prisma-db-properties";
import { deletePropertyOption, getPropertyOptionById, updatePropertyOption } from "@//app/lib/prisma-db-property-options";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{id: string}> }
) {
    try {
        const { id } = await params
        const property_options = await getPropertyOptionById(id);

        if (!property_options) {
            return NextResponse.json({ error: "Property option Not Found" }, { status: 404 });
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
        const propertyOption = await getPropertyOptionById(id);
        console.log('propertyOption', propertyOption)

        if (!propertyOption) {
            return NextResponse.json({ error: "Property Option Not Found" }, { status: 404 });
        }

        const option = formData.get('option') as string
        const sku = formData.get('sku') as string
        const property_id = formData.get('property_id') as string

        propertyOption.option = option || propertyOption.option
        propertyOption.sku = sku || propertyOption.sku
        propertyOption.property_id = property_id || propertyOption.property_id

        const result = await updatePropertyOption(
            id, 
            propertyOption?.option,
            propertyOption?.sku,
            propertyOption?.property_id
        );

        return NextResponse.json(propertyOption);
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
        const propertyOption = await getPropertyOptionById(id);

        if (!propertyOption) {
            return NextResponse.json({ error: "Property Option Not Found" }, { status: 404 });
        }

        const result = await deletePropertyOption(id);

        return NextResponse.json(propertyOption);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}