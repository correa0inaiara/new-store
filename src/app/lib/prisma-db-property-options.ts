import prisma from "./prisma";

export async function getPropertyOptions() {
  try {
    const property_options = await prisma.property_Options.findMany({});
    return property_options;
  } catch (error) {
    throw error
  }
}

export async function getPropertyOptionById(property_options_id: string) {
  try {
    const property = await prisma.property_Options.findUnique({
        where: {property_options_id}
    });
    return property;
  } catch (error) {
    throw error
  }
}

export async function postPropertyOption(
    option: string,
    sku: string,
    property_id: string
) {

    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.property_Options.create({
        data: { 
          option,
          sku,
          property_id
        }
    })
}

export async function updatePropertyOption(
    property_options_id: string,
    option: string,
    sku: string,
    property_id: string
) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.property_Options.update({
        where: { property_options_id },
        data: { 
          option,
          sku,
          property_id
        }
    })
}

export async function deletePropertyOption(property_options_id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.property_Options.delete({
        where: {property_options_id}
    })
}