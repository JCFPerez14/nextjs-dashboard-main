"use client";
import React, { useState } from "react";

interface Student {
  id: string;
  student_name: string;
}

interface SearchableSelectProps {
  students: Student[];
  onSelect: (studentId: string) => void;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ students, onSelect }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredStudents = students.filter(student =>
    student.student_name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        name="studentName"
        placeholder="Pick a Student"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        required
      />
      {isOpen && (
        <ul className="absolute left-0 right-0 z-10 max-h-60 overflow-auto border border-gray-200 bg-white">
          {filteredStudents.map((student) => (
            <li
              key={student.id}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
              onClick={() => {
                setQuery(student.student_name);
                setIsOpen(false);
                onSelect(student.id);
              }}
            >
              {student.student_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableSelect;
