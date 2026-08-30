export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  emoji: string;
  readTime: string;
  publishedAt: string;
  author: string;
  content: string[];
}

export const blogCategories = [
  "Sănătatea Ochilor",
  "Ghid Lentile",
  "Ochelari de Soare",
  "Îngrijire",
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "cum-alegi-lentilele-potrivite",
    title: "Cum alegi lentilele potrivite pentru ochelarii tăi",
    excerpt:
      "Monofocale, progresive, anti-reflex sau cu protecție la lumina albastră — un ghid simplu pentru a înțelege ce tip de lentilă ți se potrivește.",
    category: "Ghid Lentile",
    emoji: "🔍",
    readTime: "6 min",
    publishedAt: "2026-01-12",
    author: "Echipa Ochelari Cluj",
    content: [
      "Alegerea lentilelor potrivite este la fel de importantă ca alegerea ramei. O lentilă bine aleasă îți poate îmbunătăți semnificativ confortul vizual, în timp ce una nepotrivită poate cauza oboseală oculară și dureri de cap.",
      "Lentilele monofocale corectează o singură distanță — fie de aproape, fie de departe — și sunt cele mai comune pentru miopie, hipermetropie sau astigmatism. Sunt soluția potrivită pentru persoanele cu o singură problemă de vedere, indiferent de vârstă.",
      "Lentilele progresive combină mai multe corecții într-o singură lentilă, permițând vedere clară atât la distanță, cât și la aproape, fără linia vizibilă a lentilelor bifocale clasice. Sunt recomandate în special după 40 de ani, când apare presbiopia.",
      "Tratamentul anti-reflex reduce reflexiile luminii pe suprafața lentilei, oferind o vedere mai clară și un aspect estetic mai plăcut, mai ales în fotografii sau sub lumină artificială puternică.",
      "Protecția la lumina albastră este tot mai căutată de persoanele care petrec mult timp în fața ecranelor. Deși cercetările continuă, mulți pacienți raportează un confort vizual mai bun și o oboseală redusă la finalul zilei.",
      "Sfatul nostru: discută întotdeauna cu un optometrist despre stilul tău de viață — timpul petrecut la calculator, condusul pe timp de noapte sau activitățile în aer liber — pentru a alege combinația de lentile potrivită nevoilor tale reale.",
    ],
  },
  {
    slug: "semne-consult-oftalmologic",
    title: "7 semne că ai nevoie de un consult oftalmologic",
    excerpt:
      "Durerile de cap frecvente, vederea încețoșată sau oboseala oculară pot fi semnale de alarmă. Iată când este momentul să faci un control.",
    category: "Sănătatea Ochilor",
    emoji: "👁️",
    readTime: "5 min",
    publishedAt: "2026-01-19",
    author: "Echipa Ochelari Cluj",
    content: [
      "Mulți dintre noi amânăm controlul oftalmologic până când problema devine evidentă. Însă unele semne timpurii merită atenție imediată, pentru a preveni agravarea lor.",
      "1. Vedere încețoșată, fie la distanță, fie la aproape — chiar dacă apare doar ocazional, poate indica o schimbare a dioptriilor.",
      "2. Dureri de cap frecvente, mai ales spre finalul zilei sau după citit ori lucrul la calculator, sunt adesea cauzate de efortul suplimentar al ochilor.",
      "3. Oboseală oculară și senzație de ochi uscați, în special după utilizarea prelungită a ecranelor.",
      "4. Dificultăți de vedere pe timp de noapte sau la condus, semn posibil al unei probleme de adaptare la lumină scăzută.",
      "5. Clipit frecvent sau strângerea ochilor pentru a vedea mai clar un text sau un obiect.",
      "6. Senzație de presiune în jurul ochilor sau dureri oculare persistente.",
      "7. Modificări bruște ale vederii, pete, luminițe sau umbre în câmpul vizual — acestea necesită un consult de urgență.",
      "Un control oftalmologic anual este recomandat pentru adulți, iar copiii ar trebui evaluați cel puțin o dată la doi ani, chiar și în absența simptomelor. Depistarea timpurie face diferența în tratarea eficientă a multor afecțiuni oculare.",
    ],
  },
  {
    slug: "lentile-de-contact-vs-ochelari",
    title: "Lentile de contact vs. ochelari: ce este mai potrivit pentru tine?",
    excerpt:
      "Ambele opțiuni corectează vederea, dar diferă mult în confort, întreținere și stil de viață. Comparăm avantajele și dezavantajele fiecăreia.",
    category: "Ghid Lentile",
    emoji: "🕶️",
    readTime: "7 min",
    publishedAt: "2026-01-26",
    author: "Echipa Ochelari Cluj",
    content: [
      "Decizia între ochelari și lentile de contact depinde de stilul tău de viață, de sănătatea ochilor și de preferințele personale. Nu există un răspuns universal valabil — de multe ori, cea mai bună soluție este combinarea celor două.",
      "Ochelarii sunt ușor de folosit, nu necesită atingerea directă a ochiului și oferă o oarecare protecție împotriva prafului și vântului. În schimb, pot fi incomozi pentru activități sportive intense și se pot aburi sau păta.",
      "Lentilele de contact oferă un câmp vizual mai natural, fără rame care să blocheze vederea periferică, și sunt ideale pentru sport sau activități în aer liber. Necesită însă o igienă riguroasă și pot cauza disconfort persoanelor cu ochi sensibili sau uscați.",
      "Pentru persoanele active, lentilele zilnice de unică folosință elimină grija întreținerii, în timp ce lentilele lunare sunt mai economice pe termen lung, dar necesită curățare atentă în fiecare seară.",
      "Un aspect important: chiar dacă porți lentile de contact, este recomandat să ai și o pereche de ochelari de rezervă — pentru zilele în care ochii au nevoie de odihnă sau apare o iritație.",
      "Cel mai bun mod de a decide este o consultație cu un optometrist, care poate evalua sănătatea corneei și forma ochilor tăi pentru a recomanda soluția potrivită.",
    ],
  },
  {
    slug: "protectia-uv-ochelari-de-soare",
    title: "De ce contează protecția UV la ochelarii de soare",
    excerpt:
      "Nu toate lentilele întunecate protejează la fel de razele UV. Explicăm ce înseamnă cu adevărat protecția solară a ochilor și cum o recunoști.",
    category: "Ochelari de Soare",
    emoji: "☀️",
    readTime: "5 min",
    publishedAt: "2026-02-02",
    author: "Echipa Ochelari Cluj",
    content: [
      "Un ochelar de soare bun nu se recunoaște doar după cât de închisă este lentila. De fapt, o lentilă foarte închisă la culoare, dar fără filtru UV, poate fi mai dăunătoare decât lipsa ochelarilor — pupila se dilată din cauza luminii reduse, permițând mai multe raze UV să ajungă la retină.",
      "Expunerea prelungită la radiațiile UV este asociată cu apariția cataractei, a degenerescenței maculare și a altor afecțiuni oculare pe termen lung. De aceea, protecția UV este esențială, indiferent de anotimp.",
      "Caută întotdeauna eticheta care confirmă protecție UV400 sau blocarea a 100% din razele UVA și UVB — acesta este standardul recomandat de specialiști.",
      "Lentilele polarizate reduc suplimentar strălucirea reflectată de pe apă, zăpadă sau asfalt, oferind un confort vizual superior pentru condus sau activități în aer liber, dar polarizarea nu înlocuiește protecția UV — cele două caracteristici sunt independente.",
      "Copiii au nevoie de o protecție UV la fel de riguroasă ca adulții, întrucât cristalinul lor este mai transparent și lasă să treacă mai multă radiație către retină.",
      "În magazinul nostru, toate ochelarii de soare sunt testați și certificați pentru protecție UV400, indiferent de brand sau design.",
    ],
  },
  {
    slug: "ingrijirea-lentilelor-de-contact",
    title: "Ghid de îngrijire corectă a lentilelor de contact",
    excerpt:
      "Igiena lentilelor de contact previne infecțiile și disconfortul ocular. Iată regulile esențiale pe care orice purtător ar trebui să le respecte.",
    category: "Îngrijire",
    emoji: "🧴",
    readTime: "6 min",
    publishedAt: "2026-02-09",
    author: "Echipa Ochelari Cluj",
    content: [
      "Lentilele de contact sunt un dispozitiv medical, iar utilizarea lor necesită o igienă atentă pentru a evita iritațiile sau infecțiile oculare.",
      "Spală-te întotdeauna pe mâini cu apă și săpun înainte de a atinge lentilele, iar mâinile trebuie uscate bine, ideal cu un prosop care nu lasă scame.",
      "Folosește exclusiv soluție salină recomandată pentru lentile de contact — niciodată apă de la robinet, care poate conține microorganisme periculoase pentru ochi.",
      "Respectă întotdeauna perioada de purtare recomandată: lentilele zilnice se aruncă după fiecare utilizare, iar cele lunare trebuie înlocuite la termenul indicat, chiar dacă par încă în stare bună.",
      "Nu dormi niciodată cu lentilele de contact puse, decât dacă sunt special concepute pentru acest lucru, deoarece corneea are nevoie de oxigen pentru a rămâne sănătoasă.",
      "Curăță recipientul lentilelor zilnic și înlocuiește-l cel puțin o dată la trei luni, pentru a preveni acumularea de bacterii.",
      "Dacă simți usturime, roșeață sau vedere încețoșată persistentă, scoate imediat lentilele și programează un consult oftalmologic.",
    ],
  },
  {
    slug: "cum-cureti-corect-lentilele-ochelarilor",
    title: "Cum cureți corect lentilele ochelarilor, fără să le zgârii",
    excerpt:
      "Șervețelele de hârtie și cămașa ta nu sunt prietenii lentilelor tale. Iată metoda corectă de curățare, pas cu pas, recomandată de specialiști.",
    category: "Îngrijire",
    emoji: "🧽",
    readTime: "5 min",
    publishedAt: "2026-02-23",
    author: "Echipa Ochelari Cluj",
    content: [
      "Multe dintre zgârieturile fine de pe lentile apar nu din accidente, ci din curățarea greșită, zi de zi. Prosoapele de hârtie, șervețelele obișnuite sau colțul cămășii conțin fibre aspre care lasă microzgârieturi vizibile mai ales sub lumină puternică sau pe timp de noapte.",
      "Primul pas, adesea sărit, este clătirea lentilelor sub jet de apă călduță înainte de a le atinge. Apa îndepărtează praful, nisipul și particulele fine care, altfel, ar fi frecate pe suprafața lentilei odată cu ștergerea.",
      "Aplică o picătură de detergent de vase neutru, fără parfum sau lotion, direct pe lentile umede și freacă ușor cu vârful degetelor timp de câteva secunde, inclusiv pe rama și balamalele ramei.",
      "Clătește din nou bine, pentru a îndepărta complet urmele de detergent, apoi usucă lentilele cu o cârpă din microfibră curată, moale, tamponând ușor în loc să freci cu putere.",
      "Pentru curățarea rapidă, pe parcursul zilei, folosește exclusiv o cârpă din microfibră și, dacă este nevoie, o soluție specială de curățat lentile — niciodată alcool, oțet sau soluții de curățat geamuri, care pot deteriora tratamentele anti-reflex sau anti-zgârieturi.",
      "Păstrează întotdeauna ochelarii într-o husă rigidă atunci când nu îi porți, cu lentilele orientate în sus, pentru a evita contactul direct cu suprafețe dure care le pot zgâria.",
    ],
  },
  {
    slug: "intretinerea-ramelor-de-ochelari",
    title: "Ghid de întreținere a ramelor de ochelari: metal, plastic și titan",
    excerpt:
      "Fiecare tip de ramă are nevoi diferite de întreținere. Iată cum ai grijă de rama ta ca să reziste ani buni, indiferent din ce material este făcută.",
    category: "Îngrijire",
    emoji: "🛠️",
    readTime: "6 min",
    publishedAt: "2026-03-02",
    author: "Echipa Ochelari Cluj",
    content: [
      "O ramă bine întreținută nu doar arată mai bine, ci și stă mai confortabil pe nas și urechi pe termen lung. Uzura balamalelor, oxidarea metalului sau deformarea plasticului pot fi prevenite cu câteva obiceiuri simple.",
      "Ramele din acetat sau plastic sunt sensibile la căldură — evită să le lași pe bordul mașinii, lângă calorifer sau expuse direct la soare, deoarece materialul se poate deforma sau decolora în timp.",
      "Ramele metalice, în special cele din aliaje mai ieftine, pot oxida în contact cu transpirația și umezeala. Șterge rama cu o cârpă uscată după activități fizice intense și evită depozitarea în locuri umede, precum baia.",
      "Ramele din titan sunt foarte rezistente la coroziune și deformare, dar tot au nevoie de curățare regulată — praful acumulat în zona balamalelor poate afecta mecanismul de deschidere în timp.",
      "Balamalele sunt punctul cel mai solicitat al oricărei rame. Strânge-le periodic la un opticieni, dacă observi că ochelarii încep să atârne mai mult pe o parte sau balamaua pare slăbită — o intervenție simplă previne ruperea brațului.",
      "Scoate și pune întotdeauna ochelarii cu ambele mâini, apucând brațele simetric. Obiceiul de a-i scoate dintr-o singură mișcare, cu o mână, este una dintre cele mai frecvente cauze de deformare și slăbire a balamalelor.",
      "Dacă rama ta are pernițe de nas din silicon, verifică periodic dacă și-au păstrat culoarea și elasticitatea — pernițele îngălbenite sau întărite se pot înlocui rapid la orice opticieni, fără cost ridicat.",
    ],
  },
  {
    slug: "greseli-frecvente-in-ingrijirea-ochelarilor",
    title: "5 greșeli frecvente în îngrijirea ochelarilor, pe care le facem fără să știm",
    excerpt:
      "De la ștersul cu tricoul până la depozitarea în poșetă, iată cele mai comune obiceiuri care scurtează viața ochelarilor tăi — și cum le eviți.",
    category: "Îngrijire",
    emoji: "⚠️",
    readTime: "5 min",
    publishedAt: "2026-03-09",
    author: "Echipa Ochelari Cluj",
    content: [
      "Ochelarii sunt un obiect purtat zilnic, aproape fără să ne gândim la el, iar tocmai de aceea îngrijirea lor devine ușor de neglijat. Câteva obiceiuri aparent nevinovate pot reduce însă considerabil durata lor de viață.",
      "1. Ștersul lentilelor cu tricoul sau cu un șervețel de hârtie — chiar dacă lentila pare curată vizual, fibrele aspre lasă microzgârieturi care se acumulează în timp și afectează claritatea vederii.",
      "2. Depozitarea ochelarilor cu lentilele în jos, direct pe o suprafață, în loc de a-i folosi husa — cea mai simplă cale spre zgârieturi și rame îndoite.",
      "3. Purtarea ochelarilor ridicați pe cap ca o bentiță — gestul întinde brațele și balamalele mult mai mult decât suportă design-ul lor, ducând la slăbirea lor prematură.",
      "4. Lăsarea ochelarilor în mașină, mai ales vara — căldura din habitaclu poate deforma rama, poate slăbi adezivul lentilelor sau poate deteriora tratamentele speciale ale acestora.",
      "5. Curățarea lentilelor pe uscat, fără apă în prealabil — particulele fine de praf sau nisip acționează ca un șmirghel atunci când sunt frecate direct pe suprafața lentilei.",
      "Vestea bună este că toate aceste obiceiuri se pot corecta ușor, iar rezultatul este vizibil: lentile mai clare, mai puține vizite pentru reparații și o ramă care își păstrează forma mai mult timp.",
    ],
  },
  {
    slug: "lumina-albastra-si-ochii",
    title: "Lumina albastră și ochii: ce trebuie să știi",
    excerpt:
      "Petreci multe ore în fața ecranelor? Iată ce spune știința despre lumina albastră și cum te poți proteja pentru un confort vizual mai bun.",
    category: "Sănătatea Ochilor",
    emoji: "💻",
    readTime: "5 min",
    publishedAt: "2026-02-16",
    author: "Echipa Ochelari Cluj",
    content: [
      "Lumina albastră este emisă natural de soare, dar și artificial de ecranele telefoanelor, laptopurilor și televizoarelor. Expunerea prelungită la ecrane este asociată cu oboseala oculară digitală, chiar dacă efectele pe termen lung asupra retinei sunt încă studiate.",
      "Simptomele oboselii oculare digitale includ ochi uscați, vedere încețoșată temporar, dureri de cap și dificultăți de concentrare după ore petrecute în fața ecranului.",
      "Regula 20-20-20 este un truc simplu recomandat de specialiști: la fiecare 20 de minute, privește un obiect aflat la aproximativ 20 de picioare (6 metri) distanță, timp de 20 de secunde. Acest exercițiu relaxează mușchii oculari.",
      "Lentilele cu tratament anti-lumină albastră pot reduce disconfortul resimțit de utilizatorii frecvenți de ecrane, oferind un plus de claritate și reducând reflexiile de pe monitor.",
      "Pe lângă tratamentul lentilelor, ajustarea luminozității ecranului, folosirea modului „lumină caldă” seara și clipitul mai frecvent contribuie la un confort vizual mai bun pe parcursul zilei.",
      "Dacă lucrezi în fața calculatorului mai mult de 6 ore pe zi, discută cu optometristul nostru despre lentile dedicate muncii de birou, optimizate pentru distanța dintre ochi și ecran.",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogPostBySlug(slug);
  if (!current) return blogPosts.slice(0, limit);

  return blogPosts
    .filter((post) => post.slug !== slug)
    .sort((a, b) => (a.category === current.category ? -1 : 1))
    .slice(0, limit);
}
