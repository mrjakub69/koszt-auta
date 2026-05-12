import { calculateScore } from "@/app/lib/calculateScore";
import FuelCalculator from "@/app/components/FuelCalculator";
import InsuranceCalculator from "@/app/components/InsuranceCalculator";
import { supabase } from "@/app/lib/supabase";

export async function generateMetadata({
  params,
}) {

  const { slug } = await params;

  const { data: car } =
    await supabase
      .from("cars")
      .select("*")
      .eq("slug", slug)
      .single();

  return {

    title:
      `Ile kosztuje utrzymanie ${car.brand} ${car.model}?`,

    description:
      `Sprawdź realny miesięczny koszt utrzymania ${car.brand} ${car.model}. Paliwo, OC, serwis i utrata wartości.`,

  };

}

export default async function CarPage({
  params,
}) {

  const { slug } = await params;

  const { data: car } =
    await supabase
      .from("cars")
      .select("*")
      .eq("slug", slug)
      .single();

  const distance = 1500;

  const fuelPrice = 6.7;

  const fuelCost =
    (distance / 100) *
    car.fuelConsumption *
    fuelPrice;

  const total =
    fuelCost +
    car.insurance +
    car.service +
    car.depreciation;

  const burnRateScore =
    calculateScore(car);

  return (

    <main className="min-h-screen bg-zinc-950 text-white p-8">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">
          Ile kosztuje {car.brand} {car.model}?
        </h1>

        <p className="text-zinc-400 text-xl mb-10">
          Realny miesięczny koszt utrzymania auta.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

            <h2 className="text-2xl font-bold mb-6">
              Dane techniczne
            </h2>

            <div className="space-y-4 text-lg">

              <div className="flex justify-between">
                <span>Rocznik</span>
                <span>
                  {car.yearStart} - {car.yearEnd}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Paliwo</span>
                <span>{car.fuel}</span>
              </div>

              <div className="flex justify-between">
                <span>Moc</span>
                <span>{car.horsepower} KM</span>
              </div>

              <div className="flex justify-between">
                <span>Skrzynia</span>
                <span>{car.gearbox}</span>
              </div>

              <div className="flex justify-between">
                <span>Napęd</span>
                <span>{car.drivetrain}</span>
              </div>

              <div className="flex justify-between">
                <span>Segment</span>
                <span>{car.segment}</span>
              </div>

            </div>

          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

            <h2 className="text-2xl font-bold mb-6">
              Ocena auta
            </h2>

            <div className="space-y-6">

              <div>

                <div className="flex justify-between mb-2">
                  <span>Awaryjność</span>
                  <span>{car.reliability}/10</span>
                </div>

                <div className="w-full bg-zinc-800 h-3 rounded-full">

                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{
                      width: `${car.reliability * 10}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">

          <div className="space-y-4 text-xl">

            <div className="flex justify-between">
              <span>⛽ Paliwo</span>
              <span>{fuelCost.toFixed(0)} zł</span>
            </div>

            <div className="flex justify-between">
              <span>🛠️ Serwis</span>
              <span>{car.service} zł</span>
            </div>

            <div className="flex justify-between">
              <span>📄 OC</span>
              <span>{car.insurance} zł</span>
            </div>

            <div className="flex justify-between">
              <span>📉 Utrata wartości</span>
              <span>{car.depreciation} zł</span>
            </div>

            <div className="flex justify-between">
              <span>⭐ Awaryjność</span>
              <span>{car.reliability}/10</span>
            </div>

          </div>

          <div className="mt-10 pt-6 border-t border-zinc-700">

            <div className="flex justify-between text-4xl font-bold">
              <span>RAZEM</span>
              <span>{total.toFixed(0)} zł</span>
            </div>

          </div>

        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              ✅ Zalety
            </h2>

            <ul className="space-y-4">

              {car.pros?.map((pro) => (

                <li
                  key={pro}
                  className="text-zinc-300"
                >
                  • {pro}
                </li>

              ))}

            </ul>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              ❌ Wady
            </h2>

            <ul className="space-y-4">

              {car.cons?.map((con) => (

                <li
                  key={con}
                  className="text-zinc-300"
                >
                  • {con}
                </li>

              ))}

            </ul>

          </div>

        </div>

        <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500 mb-2">
                Ocena BurnRate
              </p>

              <h2 className="text-4xl font-bold">
                {burnRateScore}/100
              </h2>

            </div>

            <div className="text-right">

              <p className="text-zinc-500 mb-2">
                Rekomendacja
              </p>

              <p className="text-xl font-semibold text-orange-500">

                {burnRateScore >= 75
                  ? "Polecane"
                  : "Średni wybór"}

              </p>

            </div>

          </div>

        </div>

        <FuelCalculator
          fuelConsumption={car.fuelConsumption}
        />

        <InsuranceCalculator
          baseInsurance={car.insurance}
        />

      </div>

    </main>

  );

}
