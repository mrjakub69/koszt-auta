"use client";

import { useState } from "react";

export default function FuelCalculator({
  fuelConsumption,
}) {

  const [distance, setDistance] =
    useState(1500);

  const [fuelPrice, setFuelPrice] =
    useState(6.7);

  const [drivingStyle, setDrivingStyle] =
    useState("normal");

  let adjustedConsumption =
    fuelConsumption;

  if (drivingStyle === "eco") {
    adjustedConsumption *= 0.9;
  }

  if (drivingStyle === "sport") {
    adjustedConsumption *= 1.25;
  }

  const fuelCost =
    (
      (distance / 100) *
      adjustedConsumption *
      fuelPrice
    ).toFixed(0);

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mt-10">

      <h2 className="text-3xl font-bold mb-8">
        Kalkulator paliwa
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div>

          <label className="block mb-2 text-zinc-400">
            Miesięczny przebieg
          </label>

          <input
            type="number"
            value={distance}
            onChange={(e) =>
              setDistance(Number(e.target.value))
            }
            className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"
          />

        </div>

        <div>

          <label className="block mb-2 text-zinc-400">
            Cena paliwa
          </label>

          <input
            type="number"
            step="0.1"
            value={fuelPrice}
            onChange={(e) =>
              setFuelPrice(Number(e.target.value))
            }
            className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"
          />

        </div>

        <div>

          <label className="block mb-2 text-zinc-400">
            Styl jazdy
          </label>

          <select
            value={drivingStyle}
            onChange={(e) =>
              setDrivingStyle(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"
          >

            <option value="eco">
              Eco
            </option>

            <option value="normal">
              Normalny
            </option>

            <option value="sport">
              Sportowy
            </option>

          </select>

        </div>

      </div>

      <div className="border-t border-zinc-800 pt-6">

        <div className="flex justify-between text-2xl font-bold">

          <span>Szacowany koszt paliwa</span>

          <span className="text-orange-500">
            {fuelCost} zł / mies.
          </span>

        </div>

      </div>

    </div>

  );

}