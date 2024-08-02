import Evangelism from ".";

export async function generateStaticParams() {
  const posts = await fetch(`${process.env.API_URL}/posts/evangelism`).then(
    (res) => res.json()
  );

  return posts.map((post: any, idx: any) => ({
    slug: `${idx + 1}`,
  }));
}

export default function EvangelismPage({
  params,
}: {
  params: { slug: string };
}) {
  return <Evangelism params={{ slug: params.slug }} />;
}
