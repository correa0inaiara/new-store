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

  // 1. Criar todas as propriedades primeiro
  const properties = await prisma.property.createManyAndReturn({
    data: propertiesData.map(prop => ({
      name: prop.name
    }))
  });

  console.log(`✅ Created ${properties.length} properties`);

  // 2. Criar todas as opções para cada propriedade
  const propertyOptionsData = properties.flatMap((property, index) => {
    const propData = propertiesData[index];
    return propData.options.map(opt => ({
      property_id: property.property_id,
      option: opt,
      sku: `OPT-${propData.name.toUpperCase()}-${opt.toUpperCase()}`
    }));
  });

  await prisma.property_Options.createMany({
    data: propertyOptionsData
  });

  // 3. Buscar as propriedades com suas opções para retornar
  const propertiesWithOptions = await prisma.property.findMany({
    where: {
      property_id: {
        in: properties.map(p => p.property_id)
      }
    },
    include: {
      property_option: true
    }
  });

  console.log(`✅ Created ${propertyOptionsData.length} property options`);
  
  return { properties: propertiesWithOptions };
}