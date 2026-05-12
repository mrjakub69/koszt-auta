"use client";

import { supabase } from "@/app/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {

  const [search, setSearch] = useState("");

  const [selectedBrand, setSelectedBrand] =
    useState("all");

  const [selectedFuel, setSelectedFuel] =
    useState("all");

  const [selectedSegment, setSelectedSegment] =
  useState("all");


  const [sortBy, setSortBy] =
    useState("default");

  const [maxCost, setMaxCost] =
  useState("all");

  const [cars, setCars] = useState([]);

    useEffect(() => {

  async function loadCars() {

    const { data } =
      await supabase
        .from("cars")
        .select("*");

    setCars(data || []);

  }

  loadCars();

}, []);

  let filteredCars = cars.filter((car) => {

    const fullName =
      `${car.brand} ${car.model}`.toLowerCase();

    const matchesSearch =
      fullName.includes(search.toLowerCase());

    const matchesBrand =
      selectedBrand === "all" ||
      car.brand === selectedBrand;

    const matchesFuel =
      selectedFuel === "all" ||
      car.fuel === selectedFuel;

    const matchesSegment =
      selectedSegment === "all" ||
      car.segment === selectedSegment;

      
    const matchesCost =
    maxCost === "all" ||
    car.totalMonthlyCost <= Number(maxCost);


    return (
      matchesSearch &&
      matchesBrand &&
      matchesFuel &&
      matchesSegment &&
      matchesCost
    );

  });

  if (sortBy === "fuel") {

    filteredCars.sort(
      (a, b) =>
        a.fuelConsumption -
        b.fuelConsumption
    );

  }

  if (sortBy === "reliability") {

    filteredCars.sort(
      (a, b) =>
        b.reliability -
        a.reliability
    );

  }

  if (sortBy === "cost") {

    filteredCars.sort(
      (a, b) =>
        a.totalMonthlyCost -
        b.totalMonthlyCost
    );

  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <section className="border-b border-zinc-800">

        <div className="max-w-6xl mx-auto px-6 py-24">

          <h1 className="text-6xl font-bold leading-tight mb-6">
            BurnRate
          </h1>

          <p className="text-zinc-400 text-2xl max-w-2xl mb-10">
            Realne koszty utrzymania aut.
          Spalanie, awaryjność i miesięczne wydatki.
          </p>

          <div className="grid md:grid-cols-5 gap-4 mb-6">

            <select
              value={selectedBrand}
              onChange={(e) =>
                setSelectedBrand(e.target.value)
              }
              className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-lg"
            >

              <option value="all">
                Wszystkie marki
              </option>

              <option value="BMW">
                BMW
              </option>

              <option value="Audi">
                Audi
              </option>

              <option value="Volkswagen">
                Volkswagen
              </option>

              <option value="Skoda">
                Skoda
              </option>

              <option value="Toyota">
                Toyota
              </option>

              <option value="Tesla">
                Tesla
              </option>

              <option value="Opel">
                Opel
              </option>

            </select>

            <select
              value={selectedFuel}
              onChange={(e) =>
                setSelectedFuel(e.target.value)
              }
              className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-lg"
            >

              <option value="all">
                Wszystkie paliwa
              </option>

              <option value="Diesel">
                Diesel
              </option>

              <option value="Hybrid">
                Hybrid
              </option>

              <option value="Electric">
                Electric
              </option>

            </select>

            <select
            value={selectedSegment}
            onChange={(e) =>
            setSelectedSegment(e.target.value)
            }
            className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-lg"

           >

           <option value="all">
           Wszystkie segmenty
           </option>

           <option value="SUV">
           SUV
           </option>

           <option value="Sedan">
           Sedan
           </option>

            <option value="Hatchback">
            Hatchback
            </option>

           <option value="Kombi">
           Kombi
           </option>

           <option value="Coupe">
           Coupe
           </option>

            </select>


            <select
value={maxCost}
onChange={(e) =>
setMaxCost(e.target.value)
}
className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-lg"

           >

           <option value="all">
            Dowolny koszt
            </option>

            <option value="1000">
            Do 1000 zł
            </option>

           <option value="1500">
            Do 1500 zł
            </option>

            <option value="2000">
            Do 2000 zł
            </option>

            </select>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-lg"
            >

              <option value="default">
                Sortowanie
              </option>

              <option value="cost">
                Najtańsze utrzymanie
              </option>

              <option value="fuel">
                Najmniejsze spalanie
              </option>

              <option value="reliability">
                Najmniej awaryjne
              </option>

            </select>

          </div>

          <input
            type="text"
            placeholder="Szukaj auta..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full max-w-2xl p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xl"
          />

        </div>

      </section>

<section className="border-b border-zinc-800">

  <div className="max-w-6xl mx-auto px-6 py-16">

    <div className="flex items-center justify-between mb-10">

      <div>

        <p className="text-orange-500 mb-2">
          BurnRate Ranking
        </p>

        <h2 className="text-4xl font-bold">
          Top auta
        </h2>

      </div>

    </div>

    <div className="grid md:grid-cols-3 gap-6">

      {[...cars]
        .sort(
          (a, b) =>
            a.totalMonthlyCost -
            b.totalMonthlyCost
        )
        .slice(0, 3)
        .map((car, index) => (

          <Link
            key={car.slug}
            href={`/koszt/${car.slug}`}
            className="bg-zinc-900 border border-zinc-800 hover:border-orange-500 transition rounded-2xl p-8"
          >

            <p className="text-orange-500 mb-4">

              #{index + 1} Ranking

            </p>

            <h3 className="text-3xl font-bold mb-3">

              {car.brand} {car.model}

            </h3>

            <div className="space-y-3 text-zinc-400">

              <div className="flex justify-between">

                <span>⛽ Spalanie</span>

                <span>
                  {car.fuelConsumption} l
                </span>

              </div>

              <div className="flex justify-between">

                <span>⭐ Awaryjność</span>

                <span>
                  {car.reliability}/10
                </span>

              </div>

              <div className="flex justify-between">

                <span>💰 Koszt</span>

                <span>
                  {car.totalMonthlyCost} zł
                </span>

              </div>

            </div>

          </Link>

      ))}

    </div>

  </div>

</section>

      <section>

        <div className="max-w-6xl mx-auto px-6 py-16">

          <h2 className="text-3xl font-bold mb-10">
            Popularne modele
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredCars.map((car) => (

              <Link
                key={car.slug}
                href={`/koszt/${car.slug}`}
                className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-blue-500 transition"
              >

                <div className="flex items-center justify-between mb-4">

                  <h3 className="text-2xl font-semibold">
                    {car.brand}
                  </h3>

                  <span className="text-sm bg-zinc-800 px-3 py-1 rounded-full">
                    {car.fuel}
                  </span>

                </div>

                <p className="text-zinc-300 text-lg mb-6">
                  {car.model}
                </p>

                <div className="space-y-3 text-zinc-400">

                  <div className="flex justify-between">
                    <span>⛽ Spalanie</span>
                    <span>
                      {car.fuelConsumption} l/100km
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>⭐ Awaryjność</span>
                    <span>
                      {car.reliability}/10
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>💰 Koszt</span>
                    <span>
                      {car.totalMonthlyCost} zł
                    </span>
                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>

<section className="border-b border-zinc-800">

  <div className="max-w-6xl mx-auto px-6 py-14">

    <h2 className="text-3xl font-bold mb-8">
      Popularne rankingi
    </h2>

    <div className="grid md:grid-cols-2 gap-6">

      <Link
        href="/ranking"
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-orange-500 transition"
      >

        <p className="text-zinc-500 mb-3">
          Ranking
        </p>

        <h3 className="text-3xl font-bold mb-4">
          Najtańsze i najmniej awaryjne auta
        </h3>

        <p className="text-zinc-400">
          Sprawdź ranking samochodów według kosztów utrzymania i awaryjności.
        </p>

      </Link>

      <Link
        href="/auta-z-malym-spalaniem"
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-orange-500 transition"
      >

        <p className="text-zinc-500 mb-3">
          Spalanie
        </p>

        <h3 className="text-3xl font-bold mb-4">
          Auta z małym spalaniem
        </h3>

        <p className="text-zinc-400">
          Ranking aut z najniższym zużyciem paliwa.
        </p>

      </Link>

    </div>

  </div>

</section>

<footer className="border-t border-zinc-800 mt-24">

  <div className="max-w-6xl mx-auto px-6 py-12">

    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

      <div>

        <div className="flex items-center gap-3 mb-3">

          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-bold text-black">
            BR
          </div>

          <div>

            <p className="font-bold text-xl">
              BurnRate
            </p>

            <p className="text-zinc-500 text-sm">
              Real costs of cars
            </p>

          </div>

        </div>

        <p className="text-zinc-500 max-w-md">
          Analiza realnych kosztów utrzymania samochodów.
          Spalanie, awaryjność i miesięczne wydatki.
        </p>

      </div>

      <div className="flex gap-10 text-zinc-400">

        <div>

          <p className="font-semibold text-white mb-3">
            Portal
          </p>

          <div className="space-y-2">

            <Link href="/ranking" className="block hover:text-orange-500 transition">
  Ranking
</Link>

<Link href="/porownanie" className="block hover:text-orange-500 transition">
  Porównania
</Link>

<Link href="/auta-z-malym-spalaniem" className="block hover:text-orange-500 transition">
  Auta z małym spalaniem
</Link>

          </div>

        </div>

        <div>

          <p className="font-semibold text-white mb-3">
            BurnRate
          </p>

          <div className="space-y-2">

            <Link href="/blog" className="block hover:text-orange-500 transition">
  Blog
</Link>

<Link href="/metodologia" className="block hover:text-orange-500 transition">
  Metodologia
</Link>

<Link href="/o-projekcie" className="block hover:text-orange-500 transition">
  O projekcie
</Link>

          </div>

        </div>

      </div>

    </div>

    <div className="border-t border-zinc-800 mt-10 pt-6 text-zinc-600 text-sm">

      © 2026 BurnRate. All rights reserved.

    </div>

  </div>

</footer>

    </main>
  );
}