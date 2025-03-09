"use client";

import React, { useState } from "react";
import StudentRow from "./StudentRow";

export interface Violation {
  id: string;
  scenario: string;
  violation: string;
  date: string;
}

export interface StudentViolations {
  studentName: string;
  timePenalty: number;
  violations: Violation[];
  email?: string;
  phone?: string;
}

interface SearchableStudentTableProps {
  students: StudentViolations[];
}

const SearchableStudentTable: React.FC<SearchableStudentTableProps> = ({ students }) => {
  const [searchText, setSearchText] = useState("");

  const filteredStudents = students.filter((student) =>
    student.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
    (student.email && student.email.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <div>
      <div className="mb-4">
        <input 
          type="text"
          placeholder="Search by student name or email"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
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
            {filteredStudents.map((student, index) => (
              <StudentRow
                key={index}
                studentName={student.studentName}
                timePenalty={student.timePenalty}
                violations={student.violations}
                email={student.email}
                phone={student.phone}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchableStudentTable;
