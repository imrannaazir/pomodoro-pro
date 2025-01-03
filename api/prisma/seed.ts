import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './seed/seed-admin';
import { seedDemoUser } from './seed/seed-demo-user';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  try {
    await seedAdmin();
    await seedDemoUser();
    console.log('Seeding finished.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});

// Execute the main function
main();
