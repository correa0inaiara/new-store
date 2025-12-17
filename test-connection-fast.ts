// test-connection-fast.ts
import { prisma } from './prisma/seeds/shared';

async function test() {
  try {
    console.log('🔍 Testando conexão com Prisma Data Platform...');
    console.log('URL:', process.env.DATABASE_URL?.substring(0, 50) + '...');
    
    // Teste 1: Query simples
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('✅ Conexão bem-sucedida!', result);
    
    // Teste 2: Tentar criar uma categoria de teste
    const testCat = await prisma.category.create({
      data: {
        name: 'test-' + Date.now(),
        title: 'Test Category'
      }
    });
    console.log('✅ Criação funcionou! ID:', testCat.category_id);
    
    // Limpar
    await prisma.category.delete({
      where: { category_id: testCat.category_id }
    });
    
  } catch (error: any) {
    console.error('❌ ERRO:', error.message);
    console.error('Código:', error.code);
    console.error('Stack:', error.stack);
  } finally {
    await prisma.$disconnect();
    console.log('🔗 Conexão fechada.');
  }
}

test();