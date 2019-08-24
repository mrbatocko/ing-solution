import initMongo from '../loaders/mongo';
import { seedSections } from './sections';
import { config } from 'dotenv';

config();

initMongo(async () => {
  await seedSections();
  console.log('Seeding DONE');
  process.exit();
});