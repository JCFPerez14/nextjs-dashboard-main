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
  // New props added for student's email and phone number.
  email?: string;
  phone?: string;
}

const StudentRow: React.FC<StudentRowProps> = ({
  studentName,
  timePenalty,
  violations,
  email,
  phone,
}) => {
  const [expanded, setExpanded] = useState(false);

  // Always show the first violation in the main row.
  const primaryViolation = violations[0];
  // Additional violations for expanded view.
  const additionalViolations = violations.slice(1);

  // Use a threshold to decide when to truncate the primary texts.
  const TEXT_THRESHOLD = 50;
  const isViolationLong = primaryViolation.violation.length > TEXT_THRESHOLD;
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
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">
          <div className={`${!expanded && isViolationLong ? "truncate max-w-[200px]" : ""}`}>
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
            {/* Empty cells for student name and time penalty */}
            <td></td>
            <td className="px-6 py-4 text-sm text-gray-900">{v.scenario}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{v.violation}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{v.date}</td>
            <td></td>
          </tr>
        ))}
      {/* When expanded, show an extra row with the email and phone number if provided */}
      {expanded && (email || phone) && (
        <tr>
          <td colSpan={5} className="px-6 py-4 text-sm text-gray-1000">
            {email && <>Email: {email}  </>}
            {phone && <>Phone: {phone}</>}
          </td>
        </tr>
      )}
    </>
  );
};

export default StudentRow;
