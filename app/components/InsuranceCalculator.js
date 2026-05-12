"use client";

import { useState } from "react";

export default function InsuranceCalculator({
  baseInsurance,
}) {

  const [age, setAge] =
    useState(25);

  const [experience, setExperience] =
    useState(5);

  const [city, setCity] =
    useState("medium");

  let multiplier = 1;

  if (age < 25) {
    multiplier += 0.6;
  }

  if (experience < 3) {
    multiplier += 0.3;
  }

  if (city === "big") {
    multiplier += 0.2;
  }

  const estimatedInsurance =
    Math.round(
      baseInsurance * multiplier
    );

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mt-10">

      <h2 className="text-3xl font-bold mb-8">
        Kalkulator OC
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div>

          <label className="block mb-2 text-zinc-400">
            Wiek
          </label>

          <input
            type="number"
            value={age}
            onChange={(e) =>
              setAge(Number(e.target.value))
            }
            className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"
          />

        </div>

        <div>

          <label className="block mb-2 text-zinc-400">
            Lata prawa jazdy
          </label>

          <input
            type="number"
            value={experience}
            onChange={(e) =>
              setExperience(Number(e.target.value))
            }
            className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"
          />

        </div>

        <div>

          <label className="block mb-2 text-zinc-400">
            Miasto
          </label>

          <select
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"
          >

            <option value="small">
              Małe
            </option>

            <option value="medium">
              Średnie
            </option>

            <option value="big">
              Duże
            </option>

          </select>

        </div>

      </div>

      <div className="border-t border-zinc-800 pt-6">

        <div className="flex justify-between text-2xl font-bold">

          <span>Szacowane OC</span>

          <span className="text-orange-500">
            {estimatedInsurance} zł / mies.
          </span>

        </div>

      </div>

    </div>

  );

}