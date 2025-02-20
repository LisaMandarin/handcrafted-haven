export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/listCategories`, {
    method: "GET",
  });

  if (!res.ok) {
    console.error('Failed to fetch categories: ', res.statusText)
    return <div>Error fetching categories</div>
  }
    const {data} = await res.json()
  return <div className="font-extrabold text-2xl">Home Page</div>;
}
