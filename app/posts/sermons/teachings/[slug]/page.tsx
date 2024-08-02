import Teachings from ".";

export async function generateStaticParams() {
  const posts = await fetch(`${process.env.API_URL}/posts/teaching`).then(
    (res) => res.json()
  );

  return posts.map((post: any, idx: any) => ({
    slug: `${idx + 1}`,
  }));
}

export default function TeachingsPage({
  params,
}: {
  params: { slug: string };
}) {
  return <Teachings params={{ slug: params.slug }} />;
}
