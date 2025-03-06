"use client";
import React, { useState } from "react";

export interface Violation {
  id: string;
  violation: string;
  date: string;
}

export interface StudentRowProps {
  studentName: string;
  timePenalty: number;
  violations: Violation[];
}

const StudentRow: React.FC<StudentRowProps> = ({ studentName, timePenalty, violations }) => {
  // Use one state to control expansion for both primary text and additional rows.
  const [expanded, setExpanded] = useState(false);

  // Always show the first violation in the main row.
  const primaryViolation = violations[0];
  // Additional violations for expanded view.
  const additionalViolations = violations.slice(1);

  // Check if the primary violation text is long enough to warrant truncation.
  const TEXT_THRESHOLD = 50;
  const isLong = primaryViolation.violation.length > TEXT_THRESHOLD;
  // Show toggle button if the primary text is long or if there are additional violations.
  const showToggleButton = isLong || additionalViolations.length > 0;

  return (
    <>
      <tr>
        <td className="px-6 py-4 text-sm text-gray-900">{studentName}</td>
        <td className="px-6 py-4 text-sm text-gray-900">
          <div
            className={`text-xs mt-1 ${!expanded && isLong ? "truncate max-w-[200px]" : ""}`}
          >
            {primaryViolation.violation}
          </div>
          {showToggleButton && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-500 underline text-xs mt-1"
            >
              {expanded ? "Show less" : "See more"}
            </button>
          )}
        </td>
        <td className="px-6 py-4 text-sm text-gray-600">{primaryViolation.date}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{timePenalty}</td>
      </tr>
      {expanded &&
        additionalViolations.map((v) => (
          <tr key={v.id}>
            {/* Empty cells where we don't want to repeat student name and time penalty */}
            <td></td>
            <td className="px-6 py-4 text-sm text-gray-900">{v.violation}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{v.date}</td>
            <td></td>
          </tr>
        ))}
    </>
  );
};

export default StudentRow;
