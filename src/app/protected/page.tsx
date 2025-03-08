import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import LoginButton from "@/components/LoginButton";

export default async function ProtectedRoute() {
  const session = await getServerSession(authOptions)
  return (
    <div>
      This is a protected route.
      <br />
      {!session && (
        <>
          <p>You will only see this if you are not authenticated.</p>
          <p className=" text-custom-brown-1">
            Please <LoginButton />
          </p>
        </>
      )}
    </div>
  );
}
