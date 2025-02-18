import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const student = await prisma.students.create({
        data: {
            student_name: "John Knows",
            email: "johnknows@example.com",
            phone: "123-456-7809",
            violations: {
                create: [
                    { violations: "Late submissions Bala djhfalskdjhf ljasdhfl asdlfjahsldjf hlasdkjhflk sajdhfl" }, // Enum: one of Late submission, Missing assignment, or Cheating mga ganito
                    { violations: "Missing assignment AJSHdljh ALSJDhlkajhsaljdhl ajshldjhsldj halSJDh lHLjh lsdhl" }
                ]
            }
        },
    })
    console.log(student)
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })