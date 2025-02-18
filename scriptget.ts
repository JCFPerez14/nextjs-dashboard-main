import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const student = await prisma.students.findMany({
        where: {
            student_name: "John Knows"
        },
        include: {
            violations: {
                select: {
                    violations: true
                }
            }
        }
    })

    // Map over students to extract the violation strings
    const formattedStudents = student.map(s => ({
        ...s,
        violations: s.violations.map(v => v.violations)
    }))

    console.log(JSON.stringify(formattedStudents, null, 2))
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
