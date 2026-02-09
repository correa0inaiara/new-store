import prisma from "@//app/lib/prisma";
import { Prisma } from "../generated/client";

export interface SeedPropertiesResult {
  properties: Prisma.PropertyGetPayload<{ include: { property_option: true } }>[];
}

export async function seedProperties(): Promise<SeedPropertiesResult> {
  console.log('🌱 Seeding properties and options...');

  const propertiesData = [
    {
      name: 'tamanho',
      options: ['U', 'P', 'M', 'G']
    },
    {
      name: 'cor',
      options: ['Azul', 'Cinza', 'Vermelho', 'Verde', 'Amarelo', 'Preto', 'Branco', 'Roxo']
    },
    {
      name: 'voltagem',
      options: ['110v', '220v']
    },
    {
      name: 'peso',
      options: ['5kg', '10kg', '20kg', '30kg']
    },
    {
      name: 'volume',
      options: ['10l', '20l', '100l', '250l', '1000l', '5000l']
    }
  ];

  const properties: any[] = [];

  for (const prop of propertiesData) {
    const createdProp = await prisma.property.create({
      data: {
        name: prop.name,
        property_option: {
          create: prop.options.map(opt => ({
            option: opt,
            sku: `OPT-${prop.name.toUpperCase()}-${opt.toUpperCase()}`
          }))
        }
      },
      include: {
        property_option: true
      }
    });
    properties.push(createdProp);
  }

  console.log(`✅ Created ${properties.length} properties with options`);
  return { properties };
}