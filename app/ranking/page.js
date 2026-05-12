import Link from "next/link";

import { supabase } from "@/app/lib/supabase";
import { calculateScore } from "@/app/lib/calculateScore";

export const metadata = {

  title:
    "Ranking aut | BurnRate",

  description:
    "Najtańsze i najmniej awaryjne samochody według BurnRate Score.",

};

export default async function RankingPage() {

  const { data: cars } =
    await supabase
      .from("cars")
      .select("*");

  const rankedCars =
    [...cars].sort((a, b) => {

      const scoreA =
        calculateScore(a);

      const scoreB =
        calculateScore(b);

      return scoreB - scoreA;

    });

  return (

    <main className="min-h-screen bg-zinc-950 text-white p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">
          Ranking BurnRate
        </h1>

        <p className="text-zinc-400 text-xl mb-12">
          Najlepsze auta według kosztów utrzymania i awaryjności.
        </p>

        <div className="space-y-6">

          {rankedCars.map((car, index) => {

            const score =
              calculateScore(car);

            return (

              <Link
                key={car.slug}
                href={`/koszt/${car.slug}`}
                className="block bg-zinc-900 border border-zinc-800 hover:border-orange-500 transition rounded-2xl p-8"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                  <div>

                    <p className="text-zinc-500 mb-2">
                      #{index + 1} w rankingu
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
                      BurnRate Score
                    </p>

                    <div className="text-5xl font-bold text-orange-500">

                      {score}

                    </div>

                  </div>

                </div>

              </Link>

            );

          })}

        </div>

      </div>

    </main>

  );

}
