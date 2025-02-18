import Navbar from "@/components/navbar";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");
 

  return (
    <> 
    <nav><div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
        <p className="text-gray-600">Signed in as:</p>
        <p className="font-medium">{session.user?.email}</p>
      </div>

      <SignOut /></nav>
      
    </>
  );
};

export default Page;
