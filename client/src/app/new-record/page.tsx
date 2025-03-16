import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import NewRecordFormClient from "@/components/NewRecordFormClient";

// You might fetch the list of students here (placeholder example below)
// For example purposes, we use an empty array.
// Replace with your actual data fetching logic if required.
const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  // Fetch existing students
  const students = await db.students.findMany({
    select: {
      id: true,
      student_name: true
    }
  });

  return (
    <div className="relative min-h-screen">
      {/* Blurred background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[10px]"
        style={{ backgroundImage: "url('/nu124.jpg')" }}
      />
      {/* Centered white card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-sm space-y-6 p-8">
          <NewRecordFormClient students={students} />
        </div>
      </div>
    </div>
  );
};

export default Page;