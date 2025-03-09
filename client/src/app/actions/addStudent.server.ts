"use server";
import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";

export async function addStudent(formData: FormData) {
  await executeAction({
    actionFn: async () => {
      const studentId = String(formData.get("studentId"));
      // Parse the new penalty if provided
      const penaltyInput = formData.get("timePenalty");
      const newPenalty = penaltyInput ? parseInt(String(penaltyInput), 10) : 0;
      // Process violations input: if empty, use default "Update PENALTY"
      const violationInput = String(formData.get("violations") || "").trim();
      const violationValue = violationInput.length > 0 ? violationInput : "Update PENALTY";
      
      if (studentId) {
        // Add violation to existing student and update the timePenalty by incrementing old + new
        await db.students_violations_type.create({
          data: {
            studentId: studentId,
            violations: violationValue,
          },
        });
    
        await db.students.update({
          where: { id: studentId },
          data: {
            timePenalty: {
              increment: newPenalty,
            },
          },
        });
      } else {
        // Create new student with violation and time penalty
        const data = {
          student_name: String(formData.get("student_name")),
          email: String(formData.get("email")),
          phone: String(formData.get("phone")),
          timePenalty: newPenalty || undefined,
          violations: {
            create: [
              {
                violations: violationValue,
              },
            ],
          },
        };
        await db.students.create({ data });
      }
    },
    successMessage: "Student/Violation added successfully",
  });
}
