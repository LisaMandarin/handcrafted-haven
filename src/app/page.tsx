export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/listCategories`, {
    method: "GET",
  });

  if (!res.ok) {
    console.error('Failed to fetch categories: ', res.statusText)
    return <div>Error fetching categories</div>
  }
    const {data} = await res.json()
  console.log('categories: ', data)
  return <div>Home Page</div>;
}
