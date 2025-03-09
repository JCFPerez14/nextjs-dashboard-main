"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PhoneInput from "@/components/PhoneInput";
import PredictForm from "@/components/PredictForm";
import { addStudent } from "@/app/actions/addStudent.server";

const AddStudentFormClient = () => {
  const [predictedViolation, setPredictedViolation] = useState("");

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-center">Add Student</h1>
        <form action={addStudent} className="space-y-4">
          <Input required type="text" name="student_name" placeholder="Student Name" />
          <Input required type="email" name="email" placeholder="Email" />
          <PhoneInput required type="tel" name="phone" placeholder="Phone Number" />
          <PredictForm onPrediction={(violation) => setPredictedViolation(violation)} />
          <Input
          required
            type="text"
            name="violations"
            placeholder="Violation"
            value={predictedViolation} onChange={(e) => setPredictedViolation(e.target.value)}
          />
          <PhoneInput
            required
            type="number"
            name="timePenalty"
            placeholder="Time Penalty (hours)"
          />
          <Button type="submit" className="w-full">
            Add Student/Violation
          </Button>
        </form>
        
      </div>
    </div>
  );
};

export default AddStudentFormClient;
