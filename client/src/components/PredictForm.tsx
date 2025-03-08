"use client";
import React, { useState, FormEvent } from "react";

export interface PredictFormProps {
  onPrediction: (Violation: string) => void;
}

const PredictForm: React.FC<PredictFormProps> = ({ onPrediction }) => {
  const [scenario, setScenario] = useState("");
  const [prediction, setPrediction] = useState<{
    Category?: string;
    Violation?: string;
    Sanction?: string;
  }>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8080/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario_text: scenario,
        number_of_offense: 1, // adjust if needed
      }),
    });
    const data = await response.json();
    setPrediction(data);
    if (data.Violation) {
      onPrediction(data.Violation);
    }
  };

  return (
    <div className="mt-8">
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <label className="block">
            Scenario:
            <input
              type="text"
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              placeholder="Enter scenario"
              required
              className="mt-1 block w-full border rounded p-2"
            />
          </label>
        </div>
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Predict
        </button>
      </form>
      {prediction.Category && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Prediction Results:</h3>
          <p>Category: {prediction.Category}</p>
          <p>Violation: {prediction.Violation}</p>
          <p>Sanction: {prediction.Sanction}</p>
        </div>
      )}
    </div>
  );
};

export default PredictForm;
