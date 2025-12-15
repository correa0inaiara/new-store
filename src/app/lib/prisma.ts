import { withAccelerate } from "@prisma/extension-accelerate"
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { PrismaClient } from "../../../prisma/generated/client"

// configuração de uma pool de conexões
const connectionString = process.env.DATABASE_URL!
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

// criação do prismaclient com o adaptador
const prisma = new PrismaClient({ adapter }).$extends(withAccelerate())

export default prisma