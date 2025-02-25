import { getSession } from "@/utils/session";
import LoginButton from "@/components/LoginButton";

export default async function ProtectedRoute() {
  const session = await getSession()

  return (
    <div>
      This is a protected route.
      <br />
      {!session?.user && (
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
