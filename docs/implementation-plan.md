# Prisväxeln — implementationsplan

Planeringsunderlag, 2026-10-04. Ingen applikationskod ingår i denna ändring.

## Status och avgränsning

Arbetsdefinition: Prisväxeln hjälper Emma att byta ett planerat köp mot ett funktionellt jämförbart alternativ med lägre modellerad klimat- och resursbelastning till ett pris hon har råd med. IKEA kan konfigurera ett produktanknutet erbjudande och bedöma konsekvenserna för total påverkan och ekonomi.

Den fullständiga tidigare idébeskrivningen finns inte i tillgänglig konversationshistorik eller projektfiler. Arbetsdefinitionen är ett uttryckligt antagande, inte en återgivning av en verifierad tidigare specifikation. Den kan justeras före kodstart.

Källor: lokalt extraherade capstone-instruktioner och IKEA challenges i tmp/research. Challenge 1 handlar om överkomliga hållbara val och tillväxt med minskad absolut påverkan. Emma är 32 år, vill ha hållbara produkter och har begränsad hushållsbudget. Övriga personadetaljer nedan är designantaganden.

Användaren anger att initial website submission inte kräver interaktiv kärnfunktion. Det lästa capstone-dokumentet beskriver slutleveransen, där minst en fungerande kärnfunktion krävs; det anger inte en separat initial deadline eller bedömningsmall.

## Produktbeslut

- En React-applikation, en webbplats, två demonstrerade användarvyer: Emma och IKEA.
- Projektpresentationen är entrén. Prototypen öppnas tydligt via en primär länk.
- En kategori: fristående förvaringsmöbler för ett fördefinierat hembehov.
- Ett planerat köp, en enhet, ett möjligt ersättningsköp. Ingen merförsäljning i kundflödet.
- Fyra fiktiva produkter: ursprunglig, lämplig alternativprodukt, för stor alternativprodukt och produkt utan jämförbar miljödata.
- Gemensamma krav: kapacitet, maxmått, avsedd användning, säkerhetskrav och modellerad livslängd. Materialvikt ensam avgör aldrig lämplighet.
- Pris och erbjudande är produktanknutna. Emmas budget används för att filtrera, inte för individuell prissättning.
- Ett transparent exempel på kampanjpris. Finansiering antas komma från en begränsad kampanjbudget; ingen antagen besparing från koldioxid finansierar rabatten.
- Prototypen kan visa en lovande riktning inom en kategori, men kan inte bevisa minskning av IKEAs hela värdekedjeutsläpp.
- Emma är primär persona eftersom framgång mäts i om hon hittar en lämplig produkt inom sin budget. IKEA-användaren är en stödroll som möjliggör erbjudandet.

## Genomgående demoscenario

Alla siffror är syntetiska och ska märkas som exempeldata där de visas.

Emma behöver en förvaringsmöbel, maxbudget 900 kr. Ursprunglig produkt kostar 899 kr. Ett jämförbart alternativ kostar 999 kr före kampanj och 849 kr med ett erbjudande på 150 kr. Det ligger 51 kr under budget och kostar 50 kr mindre än ursprungsvalet. Modellvärden: 40 respektive 25 kg CO2e och 12 respektive 8 kg jungfruligt material. Samma definierade livslängd och systemgräns används. Frakt antas lika och ska beskrivas som ett antagande; ingen verklig checkout finns.

Erbjudandet löser ett faktiskt prisgap, inte bara ett informationsproblem. Jämförelsen visar pris, mått, kapacitet, livslängdsantagande och miljödata. En mindre eller sämre produkt ska inte automatiskt presenteras som en likvärdig ersättare.

## Informationsarkitektur

Använd HashRouter för stabila direkta länkar även vid enkel statisk hosting. Föreslagna adresser är /#/, /#/demo/emma, /#/demo/ikea och /#/metod. Kundens steg styrs via fördefinierade förhandsvisningar initialt, senare av användarens handlingar.

### Projektpresentation /#/

1. Navigation: Idén, Prototypen, Hållbarhet, Process, Team. Primär knapp: Se prototypen.
2. Hero: Prisväxeln. Budskap: Ett val som passar både hemmet och budgeten. Kort förklaring och en riktig bild av jämförelsevyn tidigt på sidan.
3. Problemet: Emmas begränsade budget och challenge 1:s konflikt mellan lägre priser, tillväxt och absolut miljöpåverkan.
4. Lösningen: IKEA möjliggör erbjudandet → Emma jämför → Emma väljer → IKEA följer total påverkan.
5. Prototyp: stora ingångar till Emma-vyn och IKEA-vyn. Ange aktuell funktionsstatus.
6. Hållbarhet: miljömässig, social och ekonomisk dimension; antaganden, risk för ökad konsumtion och mätplan.
7. Process: problemformulering, alternativa lösningar, feedback, designval, tester. Märk planerat och genomfört korrekt.
8. Presentation: platser för pitchvideo, slutpresentation och senare demonstrationsvideo. Saknat material märks Kommer senare, utan tomma spelare eller falska länkar.
9. Team: fyra medlemmar, roller och godkända kontaktuppgifter. Uppgifter som saknas visas som att de inväntas.
10. Källor, AI-användning och länk till metodsidan. Beskriv faktiskt använda verktyg och teamets egna bidrag.

### Emma-vyn /#/demo/emma

Separat enkel produktlayout, med Till projektet och tydlig markering Studentprototyp · Exempeldata.

- Steg 1, Mitt behov: förifylld budget, mått och förvaringsbehov, ursprungligt produktval och produktbild.
- Steg 2, Jämför: ursprung och ett alternativ sida vid sida, slutpris först, synlig rabattförklaring, budgetmarginal, jämförbara funktioner och därefter klimat/material med länk till antaganden.
- Steg 3, Mitt val: en vald produkt, totalsumma och skillnad mot det ursprungliga valet. Ingen betalning eller riktig beställning. Tydlig möjlighet att behålla originalvalet.
- Förhandsvisningar av undantag: inga lämpliga alternativ, budgeten räcker inte, data saknas och erbjudandet har pausats.
- Initialt: välj mellan namngivna exempelvyer. Dessa navigerar mellan fasta scenarier och utför ingen beräkning eller kampanjåtgärd.
- Senare: budget och krav blir redigerbara, matchning beräknas, ett val ersätter ett annat och sammanfattningen uppdateras.

### IKEA-vyn /#/demo/ikea

Utformad för en hypotetisk kategori-/kampanjansvarig. Demo-växlingen mellan roller är inte autentisering.

1. Översikt: en kampanj, produktpar, status och fasta indikatorer för budget, kvalificerade val och modellerad total påverkan.
2. Erbjudandedetalj: rabatt, ordinarie pris, kampanjpris, max antal erbjudanden, kampanjbudget, produktdata och jämförbarhetskrav.
3. Scenariobedömning: försäljning utan kampanj, byten från originalprodukt, tillkommande köp, total klimatbelastning, jungfruligt material, intäkt och modellerat täckningsbidrag.
4. Beslutsstatus: Villkor uppfyllda, Gräns överskriden eller Otillräckligt underlag, med konkret motivering. Ett scenario får aldrig automatiskt heta hållbart bara för att ett genomsnitt förbättras.
5. Initialt: förhandsvisningar av ett godkänt och ett underkänt scenario. Senare: redigerbara parametrar, beräkning och lokal aktivering/paus av erbjudandet.

### Metod /#/metod

Förklarar datakällor och syntetiska värden, produktjämförbarhet, systemgräns, livslängd, baslinje, rebound, ekonomiska antaganden och vad demonstrationen inte verifierar. Innehåller källförteckning och kravspårning. Ingen publicering av hela interna underlag krävs för att hänvisa till dem.

## Visuell specifikation

- Varmvit bakgrund (#F7F6F2), mörkblå text (#172B4D), blå primärknapp (#0058A3), dämpad grön för stödjande information och gul sparsam accent. Kontrollera kontrast vid implementation.
- Eget Prisväxeln-ordmärke och tydlig studentprojektsidentitet.
- Systemtypsnitt initialt, ingen extern fonttjänst behövs. Brödtext cirka 16–18 px, stor rubrik cirka 40–56 px på desktop och mindre på mobil.
- Maxbredd cirka 1200 px, konsekvent 8 px-avståndsskala, enkla kort med 12 px hörnradie.
- Möblerna får egna enkla illustrationer eller rättighetsklarerade bilder; fiktiva produkter ska inte förväxlas med riktiga IKEA-artiklar.
- Projektpresentation: stora rubriker och tydliga illustrationer. Emma: produktbild, pris och ett tydligt nästa steg. IKEA: kompakt tabell och begripliga jämförelsestaplar.
- På mobil staplas produktkorten och före-/efterdata i läsordning. Undvik horisontellt beroende för centrala beslut.
- Status förklaras med text och symbol, inte bara färg. Tangentbord, fokus, formuläretiketter och alternativtexter ingår från början.
- Planerat presentationsspråk: engelska för kurs/IKEA-publik, SEK som valuta. Ett språk initialt; kan bytas före implementation.

## Data och beräkningsmodell

Product: id, fiktivt namn, kategori, bild, ordinarie pris, dimensioner, kapacitet, användnings- och säkerhetskrav, antagen livslängd, klimatvärde, jungfruligt material, sourceId och status för datakvalitet.

Offer: id, originalProductId, alternativeProductId, rabatt, giltighet, budget, maxantal och status. Slutpris härleds från pris och rabatt.

CustomerNeed: budget, maxmått, minsta kapacitet, obligatoriska krav och ursprungligt produktval. Inga personuppgifter behövs.

CampaignScenario: baslinjevolym, antal substitutioner, tillkommande köp, klimattak, materialtak och antagna produktkostnader. Lägre och högre efterfrågescenarier visas för osäkerhet.

DemoSelection: valt produkt-id, erbjudande-id och ursprungligt produkt-id. Detta är ett simulerat val, inte ett köp eller bevis på undvikna utsläpp.

Source: titel, URL/referens, datum, syntetisk/verifierad och beskrivning av systemgräns.

För initiala skärmar lagras fasta exempel i separata datafiler. När interaktionen byggs beräknas priser, skillnader och totaler centralt. UI-komponenter ska inte innehålla separata konkurrerande sanningskällor.

Kvalificerat alternativ måste uppfylla funktionella krav, ha jämförbar data och lägre modellvärden för både klimat och jungfruligt material, samt rymmas i budget efter erbjudandet. Saknade data ger ej bedömbart. I verklig användning måste dessa indikatorer kompletteras med bredare miljöbedömning; de bevisar inte generell hållbarhet.

### Total påverkan: exempel

Baslinje: 100 köp av originalprodukten × 40 kg = 4 000 kg CO2e.

Kampanj: 40 originalköp × 40 + 60 byten × 25 + 10 tillkommande köp × 25 = 3 350 kg CO2e. Det motsvarar 110 produkter och 650 kg lägre modellerad total än baslinjen. Jungfruligt material: baslinje 1 200 kg, kampanj 1 040 kg.

Om tillkommande köp istället är 40: 4 100 kg CO2e och 1 280 kg material. Det överskrider båda baslinjerna trots bättre värde per alternativprodukt. Detta ska vara ett tydligt underkänt exempel i prototypen.

Baslinjejämförelse ensam räcker inte som målstyrning: i demon används också uttryckliga kampanjtak på 3 600 kg CO2e och 1 080 kg material (illustrativt 10 procent under baslinjen). De är egna demoantaganden, inte IKEAs mål. Ett godkänt scenario måste klara båda tak samt rabattbudget och antagna ekonomiska villkor.

I scenariot med 10 tillkommande köp är försäljningsintäkten 95 390 kr mot 89 900 kr i baslinjen. Kampanjrabatten är 70 × 150 = 10 500 kr jämfört med alternativets ordinarie pris. Rabatten är redan avdragen i försäljningsintäkten och ska inte dras av igen när täckningsbidrag beräknas. Lönsamhet kan bara bedömas när antagna kostnader uttryckligen anges. Tillväxten är ett scenario, inte en prognos om vad erbjudandet orsakar.

Pilot i verkligheten: jämför kampanj med en lämplig kontroll, undersök vilka köp som verkligen ersätts, följ total kategori-/portföljvolym, returer, produktlivslängd och möjliga förskjutningar till andra kategorier. Klickstatistik visar inte kausal utsläppsminskning.

## Filstruktur vid full prototyp

Detta är planerade relativa sökvägar under befintligt repository. Filer skapas först när respektive etapp byggs.

```text
docs/
  implementation-plan.md
  requirements.md
  user-tests.md
.gitignore
app/
  public/
    images/
    presentation/           # läggs till när verkligt material finns
  src/
    main.tsx               # React-start
    App.tsx                # sidvägar och gemensamma providers
    index.css              # grundstil och tillgänglighet
    styles/tokens.css      # färger, storlekar och avstånd
    layouts/
      ProjectLayout.tsx
      DemoLayout.tsx
    pages/
      ProjectPage.tsx
      EmmaDemoPage.tsx
      IkeaDemoPage.tsx
      MethodPage.tsx
      NotFoundPage.tsx
    components/
      ui/                  # Button, Card, Badge, FormField
      project/             # Hero, Problem, SolutionFlow, Sustainability,
                           # Process, Presentation, Team, Sources
    features/
      customer/            # NeedSummary, ProductComparison, SelectionSummary
      campaign/            # OfferDetails, ScenarioComparison, DecisionStatus
    data/
      products.ts
      offers.ts
      scenarios.ts
      projectContent.ts
      sources.ts
    types/domain.ts        # Product, Offer, CustomerNeed, CampaignScenario
    lib/format.ts          # svenska kronor och konsekventa enheter
    domain/                # senare: eligibility, pricing, impact + tester
    state/                 # senare: DemoProvider, demoReducer
    lib/demoStorage.ts     # senare: versionsmärkt lagring och reset
```

Små UI-komponenter kan dela fil initialt. Projektspecifik styling ligger intill respektive komponent/sida när den behöver egen fil. Nuvarande App.css ersätts stegvis och onödiga mallbilder tas bort när startsidan byggs.

## Teknikbeslut

Behåll befintlig React + TypeScript + Vite och befintlig lint-konfiguration. Vanlig CSS räcker för designen. React Router tillkommer för sidor; enklare grafer byggs som tillgängliga HTML/CSS-staplar med samma värden i tabell. Undvik ytterligare diagram- eller statebibliotek initialt.

React state delas mellan vyerna via gemensam provider när interaktivitet byggs. localStorage kan bevara demot i samma webbläsare; detta är inte synk mellan riktiga kunder, konton eller datorer. En versionerad seed och Återställ demo behövs. När lagring saknas ska demon fungera i minnet.

Ingen backend, betalning, inloggning, IKEA-integration eller AI-rekommendationsmotor behövs för kursprototypens avgränsade kärnfunktion. En verklig pilot skulle kräva auktoriserade dataflöden, servervaliderad prissättning och budgetkontroll, behörigheter och säker samtidig hantering av kampanjkvoter.

Publicering senare: statisk byggd app, med app som projektrot och dist som resultatmapp. Vercel är ett möjligt standardval; hosting är ännu inte konfigurerad eller publicerad. GitHub fortsätter vara kodlagring; push gör inte automatiskt localhost offentligt.

## Etapper och klart-kriterier

1. Grund och innehåll: navigering, sidlayouter, visuella regler, exempeldata och projekttext. Klart när problem och lösning förstås och alla sidor går att nå.
2. Visuell prototyp: Emmas tre steg, IKEA-erbjudande, godkänt och underkänt scenario samt undantagsvyer. Klart när en besökare kan följa hela idén med fasta skärmar.
3. Initial webbplats: hållbarhet, metod, process, team, kontakt, källor och AI-användning; presentation/video tydligt markerat om det ännu saknas. Responsivitet, tangentbord, länkar, build och lint kontrolleras. Placeholder är inte slutlevererat material.
4. Kärnfunktion senare: ändra budget/krav → få kvalificerat alternativ → välj → sammanfattning räknas om. Testa budgetgräns, inkompatibel produkt, saknad data och val som ersätter i stället för att dubblera.
5. IKEA-interaktion senare: ändra erbjudande/scenarioparametrar → se total klimat-, material- och ekonomisk konsekvens → aktivera lokalt endast när villkor tillåter. Testa rebound-fallet som överskrider gränserna.
6. Slutleverans: faktisk pitch, slides, prototypdemo, verklig användarfeedback, korrekt processredovisning, slutlig kravkontroll och publicerad URL.

Förslag på teamägande: person 1 projekttext/research, person 2 Emma-vy/användartester, person 3 IKEA-vy/beräkningsmodell, person 4 design/integration/leverans. Alla ska kunna förklara kärnflödet och skilja egna beslut från AI-genererat underlag.

## Kvar att fylla med teamets uppgifter

Bekräftelse eller justering av arbetsdefinition, fyra namn/roller och kontakt, verklig feedback, bildval, presentationsspråk samt separat initial inlämningsmall om sådan finns. Dessa luckor hindrar inte att det visuella skelettet planeras men ska inte fyllas med påhittad evidens.

## Externa referenser

- Sustainability och nested dependencies: https://medium.com/citrakara-mandala/what-the-heck-is-sustainability-a-brief-look-into-its-origin-and-paradigm-7c9705d5375f
- React shared state: https://react.dev/learn/sharing-state-between-components
- React Router: https://reactrouter.com/start/declarative/installation
- Vite static deployment: https://vite.dev/guide/static-deploy.html

Tolkning av sustainability för projektet: ekonomisk nytta och kundens tillgänglighet behöver fungera inom ekologiska begränsningar. Tre separata gröna nyckeltal är inte i sig ett bevis på hållbarhet.
