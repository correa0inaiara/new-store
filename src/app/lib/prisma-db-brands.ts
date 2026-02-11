import prisma from "./prisma";

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({});
    return brands;
  } catch (error) {
    throw error
  }
}

export async function getBrandById(brand_id: string) {
  try {
    const brand = await prisma.brand.findUnique({
        where: {brand_id}
    });
    return brand;
  } catch (error) {
    throw error
  }
}

export async function postBrand(
    name: string
) {

    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.brand.create({
        data: { 
          name
        }
    })
}

export async function updateBrand(
    brand_id: string,
    name: string
) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.brand.update({
        where: { brand_id },
        data: { 
          name
        }
    })
}

export async function deleteBrand(brand_id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.brand.delete({
        where: {brand_id}
    })
}