import Link from "next/link";

export default function Navbar() {

  return (

    <header className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50">

      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link
          href="/"
          className="text-2xl font-bold text-orange-500"
        >
          BurnRate
        </Link>

        <nav className="flex items-center gap-6 text-zinc-300">

          <Link
            href="/ranking"
            className="hover:text-orange-500 transition"
          >
            Ranking
          </Link>

          <Link
            href="/porownanie"
            className="hover:text-orange-500 transition"
          >
            Porównanie
          </Link>

          <Link
            href="/auta-z-malym-spalaniem"
            className="hover:text-orange-500 transition"
          >
            Spalanie
          </Link>

          <Link
            href="/metodologia"
            className="hover:text-orange-500 transition"
          >
            Metodologia
          </Link>

        </nav>

      </div>

    </header>

  );

}