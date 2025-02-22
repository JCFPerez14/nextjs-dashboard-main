import React from 'react';
import Navbar from '@/components/navbar';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prismaClient from '@/lib/db';

const Page = async () => {
  const session = await auth();
  if (!session) redirect('/sign-in');

  // Fetch violations data from the database
  const allViolations = await prismaClient.students_violations_type.findMany({
    include: {
      student: true,
    },
  });

  type Violation = {
    id: number;
    studentName: string;
    violation: string;
    date: string;
    TPenalty: string;
  };

  // Map the database results to the Violation interface
  const violationsList: Violation[] = allViolations.map(violation => ({
    id: Number(violation.id),
    studentName: violation.student.student_name || '',
    violation: violation.violations,
    TPenalty: violation.student.timePenalty || '',
    date: violation.createdAt.toISOString().split('T')[0]
  }));

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 font-sans">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Student Violations Dashboard</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Violation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Penalty</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {violationsList.map((violation) => (
                  <tr key={violation.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{violation.studentName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{violation.violation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{violation.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{violation.TPenalty}</td>
                  </tr>
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