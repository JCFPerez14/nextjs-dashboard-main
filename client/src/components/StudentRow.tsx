"use client";
import React, { useState } from "react";

export interface Violation {
  id: string;
  scenario: string;
  violation: string;
  date: string;
}

export interface StudentRowProps {
  studentName: string;
  timePenalty: number;
  violations: Violation[];
}

const StudentRow: React.FC<StudentRowProps> = ({ studentName, timePenalty, violations }) => {
  const [expanded, setExpanded] = useState(false);

  // Always show the first violation in the main row.
  const primaryViolation = violations[0];
  // Additional violations for expanded view.
  const additionalViolations = violations.slice(1);

  // Threshold for truncation.
  const TEXT_THRESHOLD = 50;
  // Check if the primary violation text is long enough.
  const isViolationLong = primaryViolation.violation.length > TEXT_THRESHOLD;
  // Check if the primary scenario text is long enough.
  const isScenarioLong = primaryViolation.scenario.length > TEXT_THRESHOLD;
  // Show toggle button if either field is long or if there are additional violations.
  const showToggleButton = isViolationLong || isScenarioLong || additionalViolations.length > 0;

  return (
    <>
      <tr>
        <td className="px-6 py-4 text-sm text-gray-900">{studentName}</td>
        <td className="px-6 py-4 text-sm text-gray-900">
          <div className={`${!expanded && isScenarioLong ? "truncate max-w-[200px]" : ""}`}>
            {primaryViolation.scenario}
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
        <td className="px-6 py-4 text-sm text-gray-900">
          <div className={`${!expanded && isViolationLong ? "truncate max-w-[200px]" : ""}`}>
            {primaryViolation.violation}
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-gray-600">{primaryViolation.date}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{timePenalty}</td>
      </tr>
      {expanded &&
        additionalViolations.map((v) => (
          <tr key={v.id}>
            {/* Empty cells for student name and time penalty */}
            <td></td>
            <td className="px-6 py-4 text-sm text-gray-900">{v.scenario}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{v.violation}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{v.date}</td>
            <td></td>
          </tr>
        ))}
    </>
  );
};

export default StudentRow;
