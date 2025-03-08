"use server";
import db from "@/lib/db";

export async function addStudent(formData: FormData) {
  const timePenaltyInput = formData.get("timePenalty");
  const timePenalty = timePenaltyInput
    ? parseInt(String(timePenaltyInput), 10)
    : undefined;
    
  const data = {
    student_name: String(formData.get("student_name")),
    email: String(formData.get("email")),
    phone: String(formData.get("phone")),
    timePenalty,
    violations: {
      create: [
        {
          violations: String(formData.get("violations")),
        },
      ],
    },
  };

  await db.students.create({ data });
}
