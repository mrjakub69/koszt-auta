"use client";

import Link from "next/link";
import { useState } from "react";
import { cars } from "@/data/cars";

export default function HomePage() {

  const [search, setSearch] = useState("");

  const [selectedBrand, setSelectedBrand] =
    useState("all");

  const [selectedFuel, setSelectedFuel] =
    useState("all");

  const [sortBy, setSortBy] =
    useState("default");

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

    return (
      matchesSearch &&
      matchesBrand &&
      matchesFuel
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
<nav className="border-b border-zinc-800">

  <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

    <div className="flex items-center gap-3">

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

    <div className="hidden md:flex items-center gap-8 text-zinc-400">

      <button className="hover:text-white transition">
        Ranking
      </button>

      <button className="hover:text-white transition">
        Najtańsze auta
      </button>

      <button className="hover:text-white transition">
        Porównania
      </button>

    </div>

  </div>

</nav>
      <section className="border-b border-zinc-800">

        <div className="max-w-6xl mx-auto px-6 py-24">

          <h1 className="text-6xl font-bold leading-tight mb-6">
            BurnRate
          </h1>

          <p className="text-zinc-400 text-2xl max-w-2xl mb-10">
            Realne koszty utrzymania aut.
          Spalanie, awaryjność i miesięczne wydatki.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">

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

    </main>
  );
}