"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/app/lib/supabase";

export default function ComparePage() {

  const [cars, setCars] =
    useState([]);

  const [car1Slug, setCar1Slug] =
    useState("");

  const [car2Slug, setCar2Slug] =
    useState("");

  useEffect(() => {

    async function fetchCars() {

      const { data } =
        await supabase
          .from("cars")
          .select("*");

      setCars(data || []);

      if (data?.length >= 2) {

        setCar1Slug(data[0].slug);

        setCar2Slug(data[1].slug);

      }

    }

    fetchCars();

  }, []);

  const car1 = cars.find(
    (car) => car.slug === car1Slug
  );

  const car2 = cars.find(
    (car) => car.slug === car2Slug
  );

  if (!car1 || !car2) {

    return (

      <main className="min-h-screen bg-zinc-950 text-white p-10">

        Ładowanie aut...

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="max-w-6xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold mb-6">
          Porównanie aut
        </h1>

        <p className="text-zinc-400 text-xl mb-14">
          Porównaj koszty utrzymania,
          spalanie i awaryjność aut.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-14">

          <select
            value={car1Slug}
            onChange={(e) =>
              setCar1Slug(e.target.value)
            }
            className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-lg"
          >

            {cars.map((car) => (

              <option
                key={car.slug}
                value={car.slug}
              >

                {car.brand} {car.model}

              </option>

            ))}

          </select>

          <select
            value={car2Slug}
            onChange={(e) =>
              setCar2Slug(e.target.value)
            }
            className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-lg"
          >

            {cars.map((car) => (

              <option
                key={car.slug}
                value={car.slug}
              >

                {car.brand} {car.model}

              </option>

            ))}

          </select>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              {car1.brand} {car1.model}
            </h2>

            <div className="space-y-5 text-lg">

              <div className="flex justify-between">
                <span>Spalanie</span>
                <span>
                  {car1.fuelConsumption} l/100km
                </span>
              </div>

              <div className="flex justify-between">
                <span>Awaryjność</span>
                <span>
                  {car1.reliability}/10
                </span>
              </div>

              <div className="flex justify-between">
                <span>Miesięczny koszt</span>
                <span>
                  {car1.totalMonthlyCost} zł
                </span>
              </div>

            </div>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              {car2.brand} {car2.model}
            </h2>

            <div className="space-y-5 text-lg">

              <div className="flex justify-between">
                <span>Spalanie</span>
                <span>
                  {car2.fuelConsumption} l/100km
                </span>
              </div>

              <div className="flex justify-between">
                <span>Awaryjność</span>
                <span>
                  {car2.reliability}/10
                </span>
              </div>

              <div className="flex justify-between">
                <span>Miesięczny koszt</span>
                <span>
                  {car2.totalMonthlyCost} zł
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}
