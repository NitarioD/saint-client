import Publications from ".";

export async function generateStaticParams() {
  const posts = await fetch(`${process.env.API_URL}/posts/publication`).then(
    (res) => res.json()
  );

  return posts.map((post: any, idx: any) => ({
    slug: `${idx + 1}`,
  }));
}

export default function PublicationsPage({
  params,
}: {
  params: { slug: string };
}) {
  return <Publications params={{ slug: params.slug }} />;
}
