import React from "react";
import AddStudentForm from "@/components/AddStudentFormClient";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  return (
    <div className="relative min-h-screen">
      {/* Blurred background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[10px]"
        style={{ backgroundImage: "url('/nu124.jpg')" }}
      />
      {/* Centered white box */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-sm space-y-6 p-8">
          <AddStudentForm />
        </div>
      </div>
    </div>
  );
};

export default Page;