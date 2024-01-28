const prisma = require( './client');

async function deleteAllData() {
    try {
      // Delete all records in Password model
      await prisma.passwords.deleteMany({});
  
      // Delete all records in Category model
      // await prisma.category.deleteMany({});
  
      console.log('All data deleted successfully.');
    } 
    catch (error) {
      console.error('Error deleting data:', error);
    } 
    finally {
      await prisma.$disconnect();
    }
}
  
deleteAllData();