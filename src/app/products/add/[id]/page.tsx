import ProductForm from "@/components/ProductForm"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import LoginButton from "@/components/LoginButton";

export default async function AddProductPage() {
    const session = await getServerSession(authOptions)
      if (!session) {
        return (
          <div className="text-center">
            Please <LoginButton />
          </div>
        );
      }
    return (
        <div className="min-h-[calc(100vh-148px)] md:min-h-[calc(100vh-160px)] flex justify-center">
            <ProductForm />
        </div>
    )
}