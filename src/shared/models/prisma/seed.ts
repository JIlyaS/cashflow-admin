import { PrismaClient } from '@prisma/client';

const FIRST_CATEGORY_UUID = '39614113-7ad5-45b6-8093-06455437e1e2';
const SECOND_CATEGORY_UUID = 'efd775e2-df55-4e0e-a308-58249f5ea202';

const FIRST_ESTIMATE_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_ESTIMATE_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_PROJECT_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_PROJECT_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_USER_ID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_USER_ID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

function getCategories() {
  return [
    { id: FIRST_CATEGORY_UUID, title: 'Продукты' },
    { id: SECOND_CATEGORY_UUID, title: 'Кафе и рестораны' },
  ];
}

function getProjects() {
  return [
    {
      id: FIRST_PROJECT_UUID,
      title: 'Тестовый проект',
      status: 'active',
      userId: FIRST_USER_ID,
      estimates: {
        connect: [{ id: FIRST_ESTIMATE_UUID }],
      },
    },
    {
      id: SECOND_PROJECT_UUID,
      title: 'Тестовый проект 2',
      status: 'deactive',
      userId: SECOND_USER_ID,
      estimates: {
        connect: [{ id: SECOND_ESTIMATE_UUID }],
      },
    },
  ];
}

function getEstimates() {
  return [
    {
      id: FIRST_ESTIMATE_UUID,
      title: 'Поход в магазин',
      userId: FIRST_USER_ID,
      sum: 1600,
      profit: false,
      //   user: { connect: { id: FIRST_USER_ID } },
      category: {
        connect: { id: FIRST_CATEGORY_UUID },
      },
      project: {
        connect: { id: FIRST_PROJECT_UUID },
      },
    },
    {
      id: SECOND_ESTIMATE_UUID,
      title: 'Попробовали еду в новом ресторане',
      userId: SECOND_USER_ID,
      sum: 3200,
      profit: false,
      //   user: { connect: { id: SECOND_USER_ID } },
      category: {
        connect: { id: SECOND_CATEGORY_UUID },
      },
      project: {
        connect: { id: SECOND_PROJECT_UUID },
      },
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockCategories = getCategories();
  for (const category of mockCategories) {
    await prismaClient.category.upsert({
      where: { id: category.id },
      update: {},
      create: {
        id: category.id,
        title: category.title,
      },
    });
  }

  const mockProjects = getProjects();
  for (const project of mockProjects) {
    await prismaClient.project.create({
      //   where: { id: project.id },
      //   update: {},
      //   create: {
      data: {
        id: project.id,
        title: project.title,
        status: project.status,
        // estimates: project.estimates,
        userId: project.userId,
      },
      //   },
    });
  }

  const mockEstimates = getEstimates();
  for (const estimate of mockEstimates) {
    await prismaClient.estimate.create({
      //   where: { id: estimate.id },
      //   update: {},
      //   create: {
      data: {
        id: estimate.id,
        title: estimate.title,
        sum: estimate.sum,
        profit: estimate.profit,
        category: estimate.category,
        userId: estimate.userId,
        project: estimate.project,
      },
      //   },
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
