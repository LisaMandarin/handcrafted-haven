import { ParamsType} from "@/types/data"
import { fetchProduct } from "@/lib/util";
import ProductDetailEditable from "@/components/ProductDetailEditable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import LoginButton from "@/components/LoginButton";

export default async function EditProduct({params}: {params: Promise<ParamsType>}) {
    const {id} = await params;
    const product = await fetchProduct(id);
    const session = await getServerSession(authOptions)
          if (!session) {
            return (
              <div className="text-center">
                Please <LoginButton />
              </div>
            );
          }

    return (
        <div>
            {product && (
                <ProductDetailEditable product={product}/>
            )}
        </div>
    )
}









