"use server";
import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";

export async function addStudent(formData: FormData) {
  await executeAction({
    actionFn: async () => {
      // Check if studentId is provided.
      const studentIdValue = formData.get("studentId");
      // Parse penalty input
      const penaltyInput = formData.get("timePenalty");
      const newPenalty = penaltyInput ? parseInt(String(penaltyInput), 10) : 0;
      // Process violations input: if empty, use default "Update PENALTY"
      const violationInput = String(formData.get("violations") || "").trim();
      const violationValue = violationInput.length > 0 ? violationInput : "Update PENALTY";
      
      if (studentIdValue) {
        const studentId = String(studentIdValue);
        // In update branch, we don't include scenario (assumption is update only penalty and add new violation record)
        await db.students_violations_type.create({
          data: {
            studentId: studentId,
            violations: violationValue,
            // If needed, you can also update scenario for existing student violations here.
            scenario: String(formData.get("scenario") || ""),
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
        // Create new student record with violation and time penalty.
        const scenarioValue = String(formData.get("scenario") || "");
        const data = {
          student_name: String(formData.get("student_name")),
          email: String(formData.get("email")),
          phone: String(formData.get("phone")),
          timePenalty: newPenalty || undefined,
          violations: {
            create: [
              {
                violations: violationValue,
                scenario: scenarioValue,
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
