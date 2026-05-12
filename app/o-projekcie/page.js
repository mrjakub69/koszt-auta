export const metadata = {

  title:
    "O projekcie BurnRate",

  description:
    "Dowiedz się czym jest BurnRate i jak analizujemy koszty utrzymania samochodów.",

};

export default function AboutPage() {

  return (

    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="max-w-4xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold mb-10">
          O projekcie BurnRate
        </h1>

        <div className="space-y-8 text-lg text-zinc-300 leading-8">

          <p>
            BurnRate to portal analizujący realne
            koszty utrzymania samochodów.
          </p>

          <p>
            Naszym celem jest pokazanie,
            ile naprawdę kosztuje posiadanie auta
            — nie tylko paliwo,
            ale także serwis, ubezpieczenie
            i utrata wartości.
          </p>

          <p>
            BurnRate powstał, aby pomagać kierowcom
            podejmować bardziej świadome decyzje
            zakupowe.
          </p>

          <p>
            Projekt rozwijany jest w oparciu
            o analizy rynku motoryzacyjnego,
            raporty awaryjności oraz dane
            dotyczące kosztów eksploatacji aut.
          </p>

        </div>

      </div>

    </main>

  );

}