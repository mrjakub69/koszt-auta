import Link from "next/link";

import { supabase } from "@/app/lib/supabase";

export async function generateMetadata({
  params,
}) {

  const { segment } =
    await params;

  return {

    title:
      `${segment.toUpperCase()} | Ranking aut | BurnRate`,

    description:
      `Najlepsze auta typu ${segment} według kosztów utrzymania i awaryjności.`,

  };

}

export default async function SegmentPage({
  params,
}) {

  const { segment } =
    await params;

  const { data: cars } =
    await supabase
      .from("cars")
      .select("*")
      .eq("segment", segment);

  const sortedCars =
    [...cars].sort(
      (a, b) =>
        a.totalMonthlyCost -
        b.totalMonthlyCost
    );

  return (

    <main className="min-h-screen bg-zinc-950 text-white p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">

          {segment.toUpperCase()}

        </h1>

        <p className="text-zinc-400 text-xl mb-12">

          Ranking aut segmentu {segment}.

        </p>

        <div className="space-y-6">

          {sortedCars.map((car, index) => (

            <Link
              key={car.slug}
              href={`/koszt/${car.slug}`}
              className="block bg-zinc-900 border border-zinc-800 hover:border-orange-500 transition rounded-2xl p-8"
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div>

                  <p className="text-zinc-500 mb-2">
                    #{index + 1}
                  </p>

                  <h2 className="text-3xl font-bold mb-2">
                    {car.brand} {car.model}
                  </h2>

                  <div className="flex gap-4 text-zinc-400">

                    <span>
                      ⛽ {car.fuelConsumption} l/100km
                    </span>

                    <span>
                      ⭐ {car.reliability}/10
                    </span>

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-zinc-500 mb-2">
                    Miesięczny koszt
                  </p>

                  <div className="text-5xl font-bold text-orange-500">

                    {car.totalMonthlyCost}

                  </div>

                  <p className="text-zinc-500 mt-2">
                    zł
                  </p>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </main>

  );

}
