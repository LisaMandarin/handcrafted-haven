import Image from "next/image"
import Link from "next/link";

type ArtisanProps = {
    id: string;
    image_url: string;
    first_name: string;
    last_name: string;
    introduction: string;
}
export default function ArtisanCard({id, image_url, first_name, last_name, introduction} : ArtisanProps) {

    return (
        <div>
            <Image src={image_url} alt={`Image of ${first_name} ${last_name}`} width={300} height={400} className="rounded-xl mx-auto"/>
            <section>
                <h3 className="text-xl underline my-2">{first_name} {last_name}</h3>
                <p className="line-clamp-4 indent-12">{introduction}</p>
                <Link href={`/artisans/${id}`}>
                    <div className="text-right font-bold">more</div>
                </Link>
            </section>
        </div>
    )
}