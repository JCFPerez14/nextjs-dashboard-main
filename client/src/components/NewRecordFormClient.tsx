"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PhoneInput from "@/components/PhoneInput";
import PredictForm from "@/components/PredictForm";
import { addStudent } from "@/app/actions/addStudent.server";

interface Student {
  id: string;
  student_name: string;
}

interface NewRecordFormClientProps {
  students: Student[];
}

const NewRecordFormClient: React.FC<NewRecordFormClientProps> = ({ students }) => {
  const [predictedViolation, setPredictedViolation] = useState("");
  const [predictedScenario, setPredictedScenario] = useState("");

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-center">New Record</h1>
        <form action={addStudent} className="space-y-4">
          <select
            name="studentId"
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="" disabled hidden>
              Pick a Student
            </option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.student_name}
              </option>
            ))}
          </select>

          <div id="newStudentFields" className="space-y-4">
            <PredictForm
              onPrediction={({ violation, scenario }) => {
                setPredictedViolation(violation);
                setPredictedScenario(scenario);
              }}
            />
            {/* Pass the predicted scenario to addStudent via a hidden input */}
            <Input type="hidden" name="scenario" value={predictedScenario} />
            <Input
              type="text"
              name="violations"
              placeholder="Violation"
              value={predictedViolation}
              onChange={(e) => setPredictedViolation(e.target.value)}
            />
            <PhoneInput
              required
              type="number"
              step="1"
              name="timePenalty"
              placeholder="Additional Time Penalty (hours)"
            />
          </div>

          <Button type="submit" className="w-full">
            Add Student/Violation
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewRecordFormClient;
