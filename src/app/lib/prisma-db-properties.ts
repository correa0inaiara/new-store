import prisma from "./prisma";

export async function getProperties() {
  try {
    const properties = await prisma.property.findMany({});
    return properties;
  } catch (error) {
    throw error
  }
}

export async function getPropertyById(property_id: string) {
  try {
    const property = await prisma.property.findUnique({
        where: {property_id}
    });
    return property;
  } catch (error) {
    throw error
  }
}

export async function getPropertyOptionsByPropertyId(property_id: string) {
  try {
    const propertyOptions = await prisma.property_Options.findMany({
        where: {property_id}
    });
    return propertyOptions;
  } catch (error) {
    throw error
  }
}

export async function postProperty(
    name: string
) {

    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.property.create({
        data: { 
          name
        }
    })
}

export async function updateProperty(
    property_id: string,
    name: string
) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.property.update({
        where: { property_id },
        data: { 
          name
        }
    })
}

export async function deleteProperty(property_id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.property.delete({
        where: {property_id}
    })
}