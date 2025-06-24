import { ParamsType} from "@/types/data"
import { fetchProduct } from "@/lib/util";
import ProductDetailEditable from "@/components/ProductDetailEditable";

export default async function EditProduct({params}: {params: Promise<ParamsType>}) {
    const {id} = await params;
    const product = await fetchProduct(id);

    return (
        <div>
            {product && (
                <ProductDetailEditable product={product}/>
            )}
        </div>
    )
}









