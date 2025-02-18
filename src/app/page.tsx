import React from "react";
import Navbar from "@/components/navbar";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  type Violation = {
    id: number;
    studentName: string;
    violation: string;
    date: string;
  };

  const violationsList: Violation[] = [
    { id: 1, studentName: "John Doe", violation: "Late submission", date: "2023-10-11" },
    { id: 2, studentName: "Jane Smith", violation: "Cheating on exam", date: "2023-10-10" },
    { id: 3, studentName: "Alice Johnson", violation: "Disruptive behavior", date: "2023-10-09" },
  ];

  return (
    <><Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 font-sans">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Student Violations Dashboard</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Violation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {violationsList.map((violation) => (
                  <tr key={violation.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{violation.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{violation.studentName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{violation.violation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{violation.date}</td>
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
