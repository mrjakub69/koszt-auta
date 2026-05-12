import Link from "next/link";

import { supabase } from "@/app/lib/supabase";

export const metadata = {

  title:
    "Auta z małym spalaniem | BurnRate",

  description:
    "Ranking samochodów z najniższym spalaniem według danych BurnRate.",

};

export default async function LowFuelPage() {

  const { data: cars } =
    await supabase
      .from("cars")
      .select("*");

  const sortedCars =
    [...cars].sort(
      (a, b) =>
        a.fuelConsumption -
        b.fuelConsumption
    );

  return (

    <main className="min-h-screen bg-zinc-950 text-white p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">
          Auta z małym spalaniem
        </h1>

        <p className="text-zinc-400 text-xl mb-12">
          Ranking samochodów z najniższym zużyciem paliwa.
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
                    #{index + 1} w rankingu spalania
                  </p>

                  <h2 className="text-3xl font-bold mb-2">
                    {car.brand} {car.model}
                  </h2>

                  <div className="flex gap-4 text-zinc-400">

                    <span>
                      ⭐ {car.reliability}/10
                    </span>

                    <span>
                      💰 {car.totalMonthlyCost} zł
                    </span>

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-zinc-500 mb-2">
                    Spalanie
                  </p>

                  <div className="text-5xl font-bold text-orange-500">

                    {car.fuelConsumption}

                  </div>

                  <p className="text-zinc-500 mt-2">
                    l/100km
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
