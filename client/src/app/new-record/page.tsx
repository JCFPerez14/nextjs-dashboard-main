import { auth } from "@/lib/auth";
import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { executeAction } from "@/lib/executeAction";
import Link from "next/link";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import PhoneInput from "@/components/PhoneInput";
import NewRecordFormClient from "@/components/NewRecordFormClient";

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
    <NewRecordFormClient students={students} />
  );
};

export default Page;