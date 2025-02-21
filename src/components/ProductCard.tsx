import Image from "next/image"
import Link from "next/link";
import { Rate } from "antd";

type ProductCardProps = {
    id: string;
    product_name: string;
    image_url: string;
    price?: number;
    rate?: number;
}

export default function ProductCard({id, product_name, image_url, price=0, rate=0}: ProductCardProps) {

    return (
            <Link href={`/products/${id}`}>
        <div key={id} className="relative flex flex-col w-[100px] h-[168px] rounded-xl shadow-lg bg-white">
                <div>
                    <Image src={`${image_url}`} alt={`photo of ${product_name}`} width={100} height={100} className="rounded-t-xl"/>
                </div>
                <p className="px-1 text-xs line-clamp-3 flex-grow">
                    {product_name}
                </p>
                {price ? (
                    <div className="px-1 text-sm text-red-600 font-bold text-right">
                        {price}
                    </div>) : (
                        <></>
                    )}
                {rate ? (
                    <Rate allowHalf value={Number(rate)} disabled className="absolute bottom-2 left-2 text-[10px]" />
                ) : (
                    <></>
                )}
                
        </div>
            </Link>
    )
}