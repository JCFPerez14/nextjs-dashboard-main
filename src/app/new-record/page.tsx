import { auth } from "@/lib/auth";
import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { executeAction } from "@/lib/executeAction";
import Link from "next/link";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import Navbar from "@/components/navbar";
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
      <>
        <Navbar />
        <div className="w-full max-w-sm mx-auto space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-center">New Record</h1>
            <form
              action={async (formData) => {
                "use server";
                await executeAction({
                  actionFn: async () => {
                    const studentId = String(formData.get("studentId"));
                    // Parse the new penalty if provided
                    const penaltyInput = formData.get("timePenalty");
                    const newPenalty = penaltyInput ? parseInt(String(penaltyInput), 10) : 0;

                    if (studentId) {
                      // Add violation to existing student and update the timePenalty by incrementing old + new
                      await db.students_violations_type.create({
                        data: {
                          studentId: studentId,
                          violations: String(formData.get("violations"))
                        }
                      });

                      await db.students.update({
                        where: { id: studentId },
                        data: {
                          timePenalty: {
                            increment: newPenalty
                          }
                        }
                      });
                    } else {
                      // Create new student with violation and time penalty
                      // Use newPenalty if provided; if not, Prisma will use the default defined in the schema (200)
                      const data = {
                        student_name: String(formData.get("student_name")),
                        email: String(formData.get("email")),
                        phone: String(formData.get("phone")),
                        timePenalty: newPenalty || undefined,
                        violations: {
                          create: [
                            {
                              violations: String(formData.get("violations"))
                            }
                          ]
                        }
                      };
                      await db.students.create({ data });
                    }
                  },
                  successMessage: "Student/Violation added successfully"
                });
              }}
              className="space-y-4"
            >
              <select
              name="studentId" required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="" disabled hidden>Pick a Student</option>
                {students.map((student) => (
                    <option key={student.id} value={student.id}>
                        {student.student_name}
                        </option>
                    ))}
                    </select>


              <div id="newStudentFields" className="space-y-4">
                <Input
                  type="text"
                  name="violations"
                  placeholder="Violation"
                />
                <Input
                  type="number"
                  name="timePenalty"
                  placeholder="Additional Time Penalty (hours)"
                />
              </div>

              <Button type="submit" className="w-full">
                Add Student/Violation
              </Button>
            </form>
          </div>
        </div>
      </>
    );
  };export default Page;
