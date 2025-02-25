export default function Search({ searchParams }: { searchParams: { query: string } }) {
  const { query } = searchParams;

  return (
    <div>
      <h1>Search</h1>
      <p>{query}</p>
    </div>
  );
}