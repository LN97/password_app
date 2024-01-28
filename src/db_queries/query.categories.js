import prisma from '../../prisma/client';

async function getCategoriesByIds(categoryIds) {
    // Fetch categories based on the provided categoryIds
    const categories = await prisma.category.findMany({
      where: {
        id: {
          in: categoryIds
        }
    }
    });
  
    return categories;
  }