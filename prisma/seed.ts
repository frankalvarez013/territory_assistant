import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
const prisma = new PrismaClient()
async function main() {
    const password = await hash('test',12);
    const congo = await prisma.congregation.upsert({
        where: {congregationName:'Maywood'},
        update:{},
        create:{
            congregationName:'Maywood',
            address: 'Victoria st, 90201'
        }
    })
    const tester = await prisma.user.upsert({
        where: { email: 'tester@prisma.io' },
        update: {},
        create: {
        email: 'tester@prisma.io',
        name: 'Test User',
        password: password,
        congregation: {
            connect:{
                id: congo.id
            }
        }
        },
    })

    console.log({ tester })
}
    main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })