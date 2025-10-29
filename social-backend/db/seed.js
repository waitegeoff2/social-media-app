const prisma = require('./prisma')

const { faker } = require('@faker-js/faker');

async function main() {
  const numberOfUsers = 5; // Customize the number of users to create

  for (let i = 0; i < numberOfUsers; i++) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        username: faker.internet.email(),
        password: faker.internet.password(),
        bio: faker.lorem.paragraph(),
        birthday: faker.date.birthdate(),
        // Add other user fields as defined in your Prisma schema
        // For example:
        // age: faker.number.int({ min: 18, max: 99 }),
        // bio: faker.lorem.paragraph(),
      },
    });
  }
  console.log(`${numberOfUsers} users created successfully!`);
}

// TO RUN: node db/seed.js
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});