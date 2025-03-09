import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/db";
import SearchableStudentTable, { StudentViolations } from "@/components/SearchableStudentTable";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const allViolations = await prismaClient.students_violations_type.findMany({
    include: {
      student: true,
    },
  });

  type Violation = {
    id: string;
    scenario: string;
    violation: string;
    date: string;
  };

  type StudentViolations = {
    studentName: string;
    timePenalty: number;
    violations: Violation[];
    email?: string;
    phone?: string;
  };

  // Group violations by student id.
  const groupedViolations = allViolations.reduce((acc, violation) => {
    const studentId = violation.student.id;
    if (!acc[studentId]) {
      acc[studentId] = {
        studentName: violation.student.student_name,
        timePenalty: violation.student.timePenalty,
        violations: [],
        email: violation.student.email,    // assuming this field exists
        phone: violation.student.phone,      // assuming this field exists
      };
    }
    acc[studentId].violations.push({
      id: violation.id,
      scenario: violation.scenario,
      violation: violation.violations,
      date: violation.createdAt.toISOString().split("T")[0],
    });
    return acc;
  }, {} as Record<string, StudentViolations>);

  const groupedViolationsList = Object.values(groupedViolations);

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 font-sans">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Student Violations Dashboard
          </h1>
          <SearchableStudentTable students={groupedViolationsList} />
        </div>
      </main>
    </>
  );
};

export default Page;