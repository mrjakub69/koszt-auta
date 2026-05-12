export const metadata = {

  title:
    "Metodologia BurnRate",

  description:
    "Jak BurnRate oblicza koszty utrzymania samochodów i awaryjność aut.",

};

export default function MethodologyPage() {

  return (

    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="max-w-4xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold mb-10">
          Metodologia BurnRate
        </h1>

        <div className="space-y-12 text-lg text-zinc-300 leading-8">

          <section>

            <h2 className="text-3xl font-bold mb-4 text-white">
              Jak liczymy koszty?
            </h2>

            <p>
              BurnRate analizuje realne miesięczne koszty
              utrzymania samochodów na podstawie średnich
              wydatków kierowców.
            </p>

          </section>

          <section>

            <h2 className="text-3xl font-bold mb-4 text-white">
              Co uwzględniamy?
            </h2>

            <ul className="space-y-3">

              <li>⛽ Średnie spalanie paliwa</li>

              <li>🛠️ Koszty serwisu i części</li>

              <li>📄 Średnie koszty OC</li>

              <li>📉 Utratę wartości pojazdu</li>

              <li>⭐ Awaryjność modelu</li>

            </ul>

          </section>

          <section>

            <h2 className="text-3xl font-bold mb-4 text-white">
              Źródła danych
            </h2>

            <p>
              Dane BurnRate pochodzą z raportów
              motoryzacyjnych, danych producentów,
              analiz rynku oraz średnich kosztów
              użytkowania pojazdów.
            </p>

          </section>

          <section>

            <h2 className="text-3xl font-bold mb-4 text-white">
              Ocena BurnRate
            </h2>

            <p>
              Ocena BurnRate to autorski wskaźnik
              uwzględniający koszty utrzymania,
              awaryjność, spalanie oraz opłacalność
              użytkowania samochodu.
            </p>

          </section>

        </div>

      </div>

    </main>

  );

}