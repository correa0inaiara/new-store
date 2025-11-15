import { withAccelerate } from '@prisma/extension-accelerate'
import { Prisma, PrismaClient } from '../generated/client';

const prisma = new PrismaClient().$extends(withAccelerate())

const productsData: Prisma.ProductCreateInput[] = [
    // SUBCATEGORY: Books (1) - categoryId: 1, subcategoryId: 1
    {
      title: "The Great Gatsby",
      price: 29.99,
      description: "Classic novel by F. Scott Fitzgerald in hardcover edition",
      category: { connect: { categoryId: 1 } },
      subcategory: { connect: { subcategoryId: 1 } }
    },
    {
      title: "Python Programming for Beginners",
      price: 45.99,
      description: "Comprehensive guide to Python programming with practical examples",
      category: { connect: { categoryId: 1 } },
      subcategory: { connect: { subcategoryId: 1 } }
    },
    {
      title: "The Art of War",
      price: 18.99,
      description: "Ancient Chinese military treatise by Sun Tzu",
      category: { connect: { categoryId: 1 } },
      subcategory: { connect: { subcategoryId: 1 } }
    },
    {
      title: "World History Encyclopedia",
      price: 67.99,
      description: "Complete world history reference book with illustrations",
      category: { connect: { categoryId: 1 } },
      subcategory: { connect: { subcategoryId: 1 } }
    },
    {
      title: "Science Fiction Novel Collection",
      price: 38.99,
      description: "3-book collection of popular science fiction novels",
      category: { connect: { categoryId: 1 } },
      subcategory: { connect: { subcategoryId: 1 } }
    },

    // SUBCATEGORY: Office Supplies (2) - categoryId: 1, subcategoryId: 2
    {
      title: "Stapler Professional",
      price: 24.99,
      description: "Heavy-duty stapler for office use",
      category: { connect: { categoryId: 1 } },
      subcategory: { connect: { subcategoryId: 2 } }
    },
    {
      title: "Ballpoint Pen Set",
      price: 12.99,
      description: "12-color ballpoint pen set for office and school",
      category: { connect: { categoryId: 1 } },
      subcategory: { connect: { subcategoryId: 2 } }
    },
    {
      title: "A4 Printer Paper",
      price: 18.99,
      description: "500 sheets of high-quality A4 printer paper",
      category: { connect: { categoryId: 1 } },
      subcategory: { connect: { subcategoryId: 2 } }
    },
    {
      title: "Document Organizer",
      price: 34.99,
      description: "Multi-compartment document organizer with labels",
      category: { connect: { categoryId: 1 } },
      subcategory: { connect: { subcategoryId: 2 } }
    },
    {
      title: "Sticky Notes Set",
      price: 8.99,
      description: "Assorted color sticky notes for office organization",
      category: { connect: { categoryId: 1 } },
      subcategory: { connect: { subcategoryId: 2 } }
    },

    // SUBCATEGORY: Technology (3) - categoryId: 2, subcategoryId: 3
    {
      title: "Wireless Bluetooth Earbuds",
      price: 89.99,
      description: "Noise-cancelling wireless earbuds with charging case",
      category: { connect: { categoryId: 2 } },
      subcategory: { connect: { subcategoryId: 3 } }
    },
    {
      title: "Mechanical Gaming Keyboard",
      price: 129.99,
      description: "RGB mechanical keyboard with cherry MX switches",
      category: { connect: { categoryId: 2 } },
      subcategory: { connect: { subcategoryId: 3 } }
    },
    {
      title: "27-inch 4K Monitor",
      price: 249.99,
      description: "Ultra HD monitor for professional and gaming use",
      category: { connect: { categoryId: 2 } },
      subcategory: { connect: { subcategoryId: 3 } }
    },
    {
      title: "Portable SSD 1TB",
      price: 159.99,
      description: "High-speed portable solid state drive",
      category: { connect: { categoryId: 2 } },
      subcategory: { connect: { subcategoryId: 3 } }
    },
    {
      title: "Wireless Mouse",
      price: 34.99,
      description: "Ergonomic wireless mouse for computers",
      category: { connect: { categoryId: 2 } },
      subcategory: { connect: { subcategoryId: 3 } }
    },

    // SUBCATEGORY: Home Appliances (4) - categoryId: 2, subcategoryId: 4
    {
      title: "Blender Pro 1000W",
      price: 129.99,
      description: "High-power blender for smoothies and food processing",
      category: { connect: { categoryId: 2 } },
      subcategory: { connect: { subcategoryId: 4 } }
    },
    {
      title: "Air Purifier with HEPA Filter",
      price: 189.99,
      description: "Advanced air purification system for large rooms",
      category: { connect: { categoryId: 2 } },
      subcategory: { connect: { subcategoryId: 4 } }
    },
    {
      title: "Coffee Maker Programmable",
      price: 89.99,
      description: "12-cup programmable coffee maker with timer",
      category: { connect: { categoryId: 2 } },
      subcategory: { connect: { subcategoryId: 4 } }
    },
    {
      title: "Robot Vacuum Cleaner",
      price: 229.99,
      description: "Smart robot vacuum with mapping technology",
      category: { connect: { categoryId: 2 } },
      subcategory: { connect: { subcategoryId: 4 } }
    },
    {
      title: "Electric Kettle",
      price: 59.99,
      description: "1.7L electric kettle with automatic shut-off",
      category: { connect: { categoryId: 2 } },
      subcategory: { connect: { subcategoryId: 4 } }
    },

    // SUBCATEGORY: Clothing (5) - categoryId: 3, subcategoryId: 5
    {
      title: "Cotton T-Shirt Pack",
      price: 39.99,
      description: "Pack of 3 basic cotton t-shirts in assorted colors",
      category: { connect: { categoryId: 3 } },
      subcategory: { connect: { subcategoryId: 5 } }
    },
    {
      title: "Denim Jacket",
      price: 79.99,
      description: "Classic denim jacket for casual wear",
      category: { connect: { categoryId: 3 } },
      subcategory: { connect: { subcategoryId: 5 } }
    },
    {
      title: "Wool Sweater",
      price: 89.99,
      description: "100% wool sweater for winter season",
      category: { connect: { categoryId: 3 } },
      subcategory: { connect: { subcategoryId: 5 } }
    },
    {
      title: "Business Dress Shirt",
      price: 45.99,
      description: "Formal dress shirt for business occasions",
      category: { connect: { categoryId: 3 } },
      subcategory: { connect: { subcategoryId: 5 } }
    },
    {
      title: "Summer Shorts",
      price: 32.99,
      description: "Comfortable cotton shorts for summer",
      category: { connect: { categoryId: 3 } },
      subcategory: { connect: { subcategoryId: 5 } }
    },

    // SUBCATEGORY: Footwear (6) - categoryId: 3, subcategoryId: 6
    {
      title: "Running Shoes",
      price: 129.99,
      description: "Lightweight running shoes with cushion technology",
      category: { connect: { categoryId: 3 } },
      subcategory: { connect: { subcategoryId: 6 } }
    },
    {
      title: "Leather Formal Shoes",
      price: 149.99,
      description: "Genuine leather shoes for formal occasions",
      category: { connect: { categoryId: 3 } },
      subcategory: { connect: { subcategoryId: 6 } }
    },
    {
      title: "Casual Sneakers",
      price: 89.99,
      description: "Comfortable sneakers for everyday wear",
      category: { connect: { categoryId: 3 } },
      subcategory: { connect: { subcategoryId: 6 } }
    },
    {
      title: "Hiking Boots",
      price: 179.99,
      description: "Waterproof hiking boots with ankle support",
      category: { connect: { categoryId: 3 } },
      subcategory: { connect: { subcategoryId: 6 } }
    },
    {
      title: "Basketball Shoes",
      price: 139.99,
      description: "High-top basketball shoes with ankle support",
      category: { connect: { categoryId: 3 } },
      subcategory: { connect: { subcategoryId: 6 } }
    },

    // SUBCATEGORY: Accessories (7) - categoryId: 3, subcategoryId: 7
    {
      title: "Leather Belt",
      price: 34.99,
      description: "Genuine leather belt with metal buckle",
      category: { connect: { categoryId: 3 } },
      subcategory: { connect: { subcategoryId: 7 } }
    },
    {
      title: "Designer Handbag",
      price: 199.99,
      description: "Premium leather handbag with multiple compartments",
      category: { connect: { categoryId: 3 } },
      subcategory: { connect: { subcategoryId: 7 } }
    },
    {
      title: "Sunglasses Polarized",
      price: 59.99,
      description: "UV protection polarized sunglasses",
      category: { connect: { categoryId: 3 } },
      subcategory: { connect: { subcategoryId: 7 } }
    },
    {
      title: "Silk Scarf",
      price: 44.99,
      description: "100% silk scarf with elegant pattern",
      category: { connect: { categoryId: 3 } },
      subcategory: { connect: { subcategoryId: 7 } }
    },
    {
      title: "Baseball Cap",
      price: 19.99,
      description: "Adjustable baseball cap with logo",
      category: { connect: { categoryId: 3 } },
      subcategory: { connect: { subcategoryId: 7 } }
    },
    
    // Additional products to ensure good coverage
    {
      title: "Cookbook Collection",
      price: 52.99,
      description: "5-recipe cookbook collection for home chefs",
      category: { connect: { categoryId: 1 } },
      subcategory: { connect: { subcategoryId: 1 } }
    },
    {
      title: "Desk Organizer",
      price: 27.99,
      description: "Multi-purpose desk organizer for stationery",
      category: { connect: { categoryId: 1 } },
      subcategory: { connect: { subcategoryId: 2 } }
    },
    {
      title: "USB-C Hub",
      price: 49.99,
      description: "7-in-1 USB-C hub with multiple ports",
      category: { connect: { categoryId: 2 } },
      subcategory: { connect: { subcategoryId: 3 } }
    },
    {
      title: "Toaster 2-Slice",
      price: 45.99,
      description: "Stainless steel toaster with multiple settings",
      category: { connect: { categoryId: 2 } },
      subcategory: { connect: { subcategoryId: 4 } }
    },
    {
      title: "Hoodie Sweatshirt",
      price: 64.99,
      description: "Comfortable hoodie for casual wear",
      category: { connect: { categoryId: 3 } },
      subcategory: { connect: { subcategoryId: 5 } }
    },
    {
      title: "Formal Loafers",
      price: 119.99,
      description: "Leather loafers for business casual attire",
      category: { connect: { categoryId: 3 } },
      subcategory: { connect: { subcategoryId: 6 } }
    },
    {
      title: "Necklace Silver",
      price: 89.99,
      description: "Sterling silver necklace with pendant",
      category: { connect: { categoryId: 3 } },
      subcategory: { connect: { subcategoryId: 7 } }
    }
];

export async function main() {
  for (const product of productsData) {
    await prisma.product.create({ data: product });
  }
}

main();