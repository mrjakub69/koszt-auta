import Link from "next/link";

const posts = [

  {
    slug: "czy-warto-kupic-bmw-e90",
    title:
      "Czy warto kupić BMW E90?",
    excerpt:
      "Koszty utrzymania, awaryjność i realne spalanie BMW E90.",
    category:
      "BMW",
  },

  {
    slug: "najmniej-awaryjne-suvy",
    title:
      "Najmniej awaryjne SUV-y",
    excerpt:
      "Ranking SUV-ów o najniższej awaryjności i kosztach utrzymania.",
    category:
      "SUV",
  },

  {
    slug: "auta-z-malym-spalaniem",
    title:
      "Najlepsze auta z małym spalaniem",
    excerpt:
      "Porównanie najbardziej oszczędnych samochodów.",
    category:
      "Spalanie",
  },

];

export const metadata = {

  title:
    "Blog motoryzacyjny | BurnRate",

  description:
    "Poradniki, rankingi i analizy kosztów utrzymania samochodów.",

};

export default function BlogPage() {

  return (

    <main className="min-h-screen bg-zinc-950 text-white p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">
          Blog BurnRate
        </h1>

        <p className="text-zinc-400 text-xl mb-12">
          Poradniki, rankingi i analizy motoryzacyjne.
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          {posts.map((post) => (

            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-zinc-900 border border-zinc-800 hover:border-orange-500 transition rounded-2xl p-8"
            >

              <p className="text-orange-500 mb-3">
                {post.category}
              </p>

              <h2 className="text-3xl font-bold mb-4">
                {post.title}
              </h2>

              <p className="text-zinc-400 text-lg">
                {post.excerpt}
              </p>

            </Link>

          ))}

        </div>

      </div>

    </main>

  );

}
