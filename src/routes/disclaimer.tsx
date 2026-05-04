import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/disclaimer")({
  component: DisclaimerPage,
  head: () => ({
    meta: [
      { title: "Health Disclaimer — MeltonSupps" },
      {
        name: "description",
        content: "Important health disclaimer and TGA guidance for supplements sold by MeltonSupps.",
      },
    ],
  }),
});

function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase">Health Disclaimer</h1>
        <div className="space-y-5 mt-6 text-foreground/90">
          <p className="font-semibold">
            Always read the label and follow directions for use. If symptoms persist, talk to your
            healthcare professional.
          </p>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">General advice</h2>
            <p className="mt-2">
              Information provided on this website is general in nature and is not intended as
              medical, dietary or therapeutic advice. It is not a substitute for professional advice
              from a qualified healthcare practitioner.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">Supplements are supplements</h2>
            <p className="mt-2">
              Vitamin and mineral supplements should not replace a balanced diet. Sports supplements
              are designed for healthy adults engaged in regular exercise and are not intended to
              diagnose, treat, cure or prevent any disease.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">Who should consult a doctor first</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>People who are pregnant, breastfeeding or trying to conceive</li>
              <li>Anyone under 18 years of age</li>
              <li>People with pre-existing medical conditions</li>
              <li>Anyone taking prescription medication</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">Therapeutic Goods (TGA)</h2>
            <p className="mt-2">
              Where applicable, products sold on this site are listed on the Australian Register of
              Therapeutic Goods (ARTG) and comply with relevant Therapeutic Goods Administration (TGA)
              requirements. Sports supplements that fall under food standards are regulated by Food
              Standards Australia New Zealand (FSANZ). We do not make therapeutic claims about any
              product beyond those approved by the manufacturer and the relevant regulator.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              For more information visit{" "}
              <a className="text-brand hover:underline" href="https://www.tga.gov.au" target="_blank" rel="noopener noreferrer">
                tga.gov.au
              </a>.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">Allergens</h2>
            <p className="mt-2">
              Many supplements contain milk, soy, egg, gluten, tree nuts or other allergens. Always
              check the ingredients panel before purchase or use.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
