"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PhoneInput from "@/components/PhoneInput";
import PredictForm from "@/components/PredictForm";
import { addStudent } from "@/app/actions/addStudent.server";
import SearchableSelect from "@/components/SearchableSelect";

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
  const [selectedStudentId, setSelectedStudentId] = useState("");

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-center">New Record</h1>
        <form action={addStudent} className="space-y-4">
          {/* Searchable select replaces the plain select */}
          <SearchableSelect
            students={students}
            onSelect={(studentId) => setSelectedStudentId(studentId)}
          />
          {/* Hidden input to pass selected student id with the form */}
          <Input type="hidden" name="studentId" value={selectedStudentId} />

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
