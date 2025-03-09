import React from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prismaClient from '@/lib/db';
import StudentRow from '@/components/StudentRow';

const Page = async () => {
  const session = await auth();
  if (!session) redirect('/sign-in');

  // Fetch violations along with the associated student details.
  // Now each violation includes the "scenario" field.
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
  };

  // Group violations by student id.
  const groupedViolations = allViolations.reduce((acc, violation) => {
    const studentId = violation.student.id;
    if (!acc[studentId]) {
      acc[studentId] = {
        studentName: violation.student.student_name,
        timePenalty: violation.student.timePenalty,
        violations: [],
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
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scenario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Violation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Penalty
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {groupedViolationsList.map((student, index) => (
                  <StudentRow
                    key={index}
                    studentName={student.studentName}
                    timePenalty={student.timePenalty}
                    violations={student.violations}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;