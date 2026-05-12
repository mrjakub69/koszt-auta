const posts = [

  {
    slug: "czy-warto-kupic-bmw-e90",

    title:
      "Czy warto kupić BMW E90?",

    content: `
BMW E90 to jedno z najpopularniejszych używanych BMW.

Auto oferuje:
- dobre prowadzenie,
- mocne silniki,
- wysoki komfort jazdy.

Jednak trzeba uważać na:
- koszty serwisu,
- wycieki oleju,
- awarie elektroniki.

Najlepszym wyborem są zadbane egzemplarze
z pełną historią serwisową.
    `,
  },

  {
    slug: "najmniej-awaryjne-suvy",

    title:
      "Najmniej awaryjne SUV-y",

    content: `
Najmniej awaryjne SUV-y to głównie modele japońskie.

Najlepiej wypadają:
- Toyota RAV4,
- Lexus RX,
- Honda CR-V.

Modele te mają:
- niskie koszty utrzymania,
- dobrą trwałość,
- wysoką wartość przy odsprzedaży.
    `,
  },

];

export async function generateMetadata({
  params,
}) {

  const { slug } =
    await params;

  const post =
    posts.find(
      (p) => p.slug === slug
    );

  if (!post) {
  return {
    title: "Artykuł nie istnieje | BurnRate",
    description: "Ten artykuł nie istnieje lub został usunięty.",
  };
}

return {
  title: `${post.title} | BurnRate`,
  description: post.content.slice(0, 140),
};

}

export default async function BlogPostPage({
  params,
}) {

  const { slug } =
    await params;

  const post =
    posts.find(
      (p) => p.slug === slug
    );

  if (!post) {

    return (
      <main className="min-h-screen bg-zinc-950 text-white p-8">

        <h1 className="text-4xl font-bold">
          Artykuł nie istnieje
        </h1>

      </main>
    );

  }

  return (

    <main className="min-h-screen bg-zinc-950 text-white p-8">

      <article className="max-w-4xl mx-auto">

        <p className="text-orange-500 mb-4">
          Blog BurnRate
        </p>

        <h1 className="text-5xl font-bold mb-10">
          {post.title}
        </h1>

        <div className="text-zinc-300 text-xl leading-10 whitespace-pre-line">

          {post.content}

        </div>

      </article>

    </main>

  );

}
