import { signUp } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";

const Page = async () => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="relative min-h-screen">
      {/* Blurred background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[10px]"
        style={{ backgroundImage: "url('/nu-lipa-hero.jpg')" }}
      />
      {/* Centered white box with rounded corners */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-sm space-y-6 p-8">
          <h1 className="text-2xl font-bold text-center">Create Account</h1>
          {/* Email/Password Sign Up */}
          <form
            className="space-y-4"
            action={async (formData) => {
              "use server";
              const res = await signUp(formData);
              if (res.success) {
                redirect("/sign-in");
              }
            }}
          >
            <Input
              name="email"
              placeholder="Email"
              type="email"
              required
              autoComplete="email"
            />
            <Input
              name="password"
              placeholder="Password"
              type="password"
              required
              autoComplete="new-password"
            />
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="text-center">
            <Button asChild variant="link">
              <Link href="/sign-in">Already have an account? Sign in</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
