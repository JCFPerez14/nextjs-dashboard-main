import { auth } from "@/lib/auth";
import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { executeAction } from "@/lib/executeAction";
import Link from "next/link";
import { redirect } from "next/navigation";
import db from "@/lib/db";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  // Fetch existing students
  const students = await db.students.findMany({
    select: {
      id: true,
      student_name: true
    }
  });

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
        <div className="space-y-4">
            <h1 className="text-3xl font-bold text-center">Add Students</h1>
            <form action={async (formData) => {
                'use server';
                await executeAction({
                    actionFn: async () => {
                        const studentId = String(formData.get('studentId'));
                        if (studentId) {
                            // Add violation to existing student
                            await db.students_violations_type.create({
                                data: {
                                    studentId: studentId,
                                    violations: String(formData.get('violations'))
                                }
                            });
                        } else {
                            // Create new student with violation
                            const data = {
                                student_name: String(formData.get('student_name')),
                                email: String(formData.get('email')),
                                phone: String(formData.get('phone')),
                                violations: {
                                    create: [{
                                        violations: String(formData.get('violations'))
                                    }]
                                }
                            };
                            await db.students.create({ data });
                        }
                    },
                    successMessage: "Student/Violation added successfully"
                });
            }} className="space-y-4">
                <select 
                    name="studentId"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                    <option value="">New Student</option>
                    {students.map((student) => (
                        <option key={student.id} value={student.id}>
                            {student.student_name}
                        </option>
                    ))}
                </select>

                <div id="newStudentFields" className="space-y-4">
                    <Input
                        type="text"
                        name="student_name"
                        placeholder="Student Name"
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                    />
                    <Input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                    />
                    <Input
                        type="text"
                        name="violations"
                        placeholder="Violation"
                    />
                </div>

                <Button type="submit" className="w-full">
                    Add Student/Violation
                </Button>
            </form>
        </div>
    </div>
  );
};

export default Page;
