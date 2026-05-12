"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

const ADMIN_PASSWORD = "napohybelskurwysynom69";

export default function AddCarPage() {

  const [form, setForm] = useState({

    slug: "",
    brand: "",
    model: "",
    fuel: "",
    fuelConsumption: "",
    insurance: "",
    service: "",
    depreciation: "",
    reliability: "",

  });

  const [success, setSuccess] =
    useState(false);

const [password, setPassword] = useState("");
const [unlocked, setUnlocked] = useState(false);

  async function handleSubmit(e) {

    e.preventDefault();

    const { error } =
      await supabase
        .from("cars")
        .insert([{

          slug: form.slug,
          brand: form.brand,
          model: form.model,
          fuel: form.fuel,

          fuelConsumption:
            Number(form.fuelConsumption),

          insurance:
            Number(form.insurance),

          service:
            Number(form.service),

          depreciation:
            Number(form.depreciation),

          reliability:
            Number(form.reliability),

        }]);

    if (!error) {

      setSuccess(true);

      setForm({

        slug: "",
        brand: "",
        model: "",
        fuel: "",
        fuelConsumption: "",
        insurance: "",
        service: "",
        depreciation: "",
        reliability: "",

      });

    }

  }

if (!unlocked) {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Panel admina
        </h1>

        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 mb-4"
        />

        <button
          onClick={() => {
            if (password === ADMIN_PASSWORD) {
              setUnlocked(true);
            }
          }}
          className="w-full bg-orange-500 text-black font-bold py-4 rounded-2xl"
        >
          Wejdź
        </button>
      </div>
    </main>
  );
}

  return (

    <main className="min-h-screen bg-zinc-950 text-white p-8">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">
          Dodaj auto
        </h1>

        <p className="text-zinc-400 text-xl mb-10">
          Panel administracyjny BurnRate
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            placeholder="Slug"
            value={form.slug}
            onChange={(e) =>
              setForm({
                ...form,
                slug: e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800"
          />

          <input
            type="text"
            placeholder="Marka"
            value={form.brand}
            onChange={(e) =>
              setForm({
                ...form,
                brand: e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800"
          />

          <input
            type="text"
            placeholder="Model"
            value={form.model}
            onChange={(e) =>
              setForm({
                ...form,
                model: e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800"
          />

          <input
            type="text"
            placeholder="Paliwo"
            value={form.fuel}
            onChange={(e) =>
              setForm({
                ...form,
                fuel: e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800"
          />

          <input
            type="number"
            placeholder="Spalanie"
            value={form.fuelConsumption}
            onChange={(e) =>
              setForm({
                ...form,
                fuelConsumption: e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800"
          />

          <input
            type="number"
            placeholder="OC"
            value={form.insurance}
            onChange={(e) =>
              setForm({
                ...form,
                insurance: e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800"
          />

          <input
            type="number"
            placeholder="Serwis"
            value={form.service}
            onChange={(e) =>
              setForm({
                ...form,
                service: e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800"
          />

          <input
            type="number"
            placeholder="Utrata wartości"
            value={form.depreciation}
            onChange={(e) =>
              setForm({
                ...form,
                depreciation: e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800"
          />

          <input
            type="number"
            placeholder="Awaryjność"
            value={form.reliability}
            onChange={(e) =>
              setForm({
                ...form,
                reliability: e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-400 transition text-black font-bold py-4 rounded-2xl text-xl"
          >
            Dodaj auto
          </button>

        </form>

        {success && (

          <div className="mt-6 bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-2xl">

            Auto zostało dodane 🚀

          </div>

        )}

      </div>

    </main>

  );

}
