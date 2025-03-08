import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AddStudentFormClient from "@/components/AddStudentFormClient";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return <AddStudentFormClient />;
};

export default Page;
