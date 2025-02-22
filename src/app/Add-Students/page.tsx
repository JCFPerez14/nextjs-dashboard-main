import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { executeAction } from "@/lib/executeAction";
import Navbar from "@/components/navbar";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <>
      {/* <Navbar /> */}
      <div className="w-full max-w-sm mx-auto space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-center">Add Student</h1>
          <form
            action={async (formData) => {
              "use server";
              await executeAction({
                actionFn: async () => {
                  // Create new student with violation and optional time penalty override
                  const timePenaltyInput = formData.get("timePenalty");
                  const timePenalty = timePenaltyInput
                    ? parseInt(String(timePenaltyInput), 10)
                    : undefined;
                  const data = {
                    student_name: String(formData.get("student_name")),
                    email: String(formData.get("email")),
                    phone: String(formData.get("phone")),
                    timePenalty: timePenalty,
                    violations: {
                      create: [
                        {
                          violations: String(formData.get("violations"))
                        }
                      ]
                    }
                  };
                  await db.students.create({ data });
                },
                successMessage: "Student/Violation added successfully"
              });
            }}
            className="space-y-4"
          >
            <Input
              type="text"
              name="student_name"
              placeholder="Student Name"
            />
            <Input type="email" name="email" placeholder="Email" />
            <Input type="tel" name="phone" placeholder="Phone Number" />
            <Input type="text" name="violations" placeholder="Violation" />
            <Input
              type="number"
              name="timePenalty"
              placeholder="Time Penalty (hours)"
            />
            <Button type="submit" className="w-full">
              Add Student/Violation
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;