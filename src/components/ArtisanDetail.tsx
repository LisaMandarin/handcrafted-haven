type ArtisanDetailType = {
    id: string;
    first_name: string;
    last_name: string;
    address: string;
    image_url: string;
    introduction: string;
    created_at: string;
    categories: Category[];
}
type Category = {
    id: string;
    category_name: string;
}

export default function ArtisanDetail({artisan}: {artisan: ArtisanDetailType}) {
    return (
        <div>
            <p>Welcome</p>
            <h1>{artisan.first_name} {artisan.last_name}</h1>
        </div>
    )
}