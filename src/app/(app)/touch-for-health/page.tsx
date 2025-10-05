import React from 'react';
import DefaultHero from '@/app/components/hero/default-hero';
import { Metadata } from 'next';
import style from './../../components/treatments/treatment.module.scss';
import Title from '@/app/components/utils/title';
import TreatmentItem from '@/app/components/treatments/treatment-item';
import Image from 'next/image';
import assetPrefix from '@/app/utils/asset-prefix';
import TreatmentSection from '@/app/components/treatments/treatment-section';

export const metadata: Metadata = {
  title: 'Ralf Kedja | Touch For Health',
  description:
    'Utforska Touch For Health med Ralf Kedja – en holistisk metod för balans i kropp och sinne, baserad på muskeltestning och energimedvetenhet. Förbättra ditt välbefinnande och öka din energiharmoni.',
};

const courseSteps = [
  {
    step: 1,
    title: 'Touch for Health: Kursplan Steg 1',
    approval: 'Godkänd av Touch for Health School vid International Kinesiology College',
    description: `De fjorton muskelbalanseringarna, TFH 1:s tekniktillämpningar och 14 muskler med deras meridianer.`,
    sectionTitles: [
      'De fjorton muskelbalanseringarna',
      'TFH 1:s tekniktillämpningar',
      '14 muskler och deras meridianer',
    ],

    muscleBalances: [
      {
        title: 'Förtest',
        sub: [
          'Switching - balanseringsteknik',
          'Centralmeridianen - "dragkedja" dra ner och upp',
          'Vätskekontroll',
          'Tillstånd att testa och självansvarsmodellen',
        ],
      },
      'Exakt indikator muskeltestning',
      'Hämmade muskler',
      {
        title: 'Introduktion av de 14 muskeltesterna och balanseringsmetoderna',
        sub: [
          'Neurolymfatiska',
          'Neurovaskulära',
          'Meridianer',
          'Ursprung/fäste',
          'Spinalreflexer',
        ],
      },
      'Utmaning',
      '14 muskelbalanseringar med ett mål',
    ],
    techniques: [
      'Öron balansering',
      'Visuella begränsningar/balansering',
      'Cross Crawl för skojs skull',
      'Känslomässig stressfrisättning',
      'Surrogattestning',
      'Mat för att stärka',
      'Hållningsanalys',
      'Enkla smärttekniker',
    ],
    muscles: [
      'Central - Supraspinatus',
      'Guvernör - Teres major',
      'Mage - Pectoralis major clavicular',
      'Mjälte - Latissimus dorsi',
      'Hjärta - Subscapularis',
      'Tunntarm - Quadriceps',
      'Urinblåsa - Peroneus',
      'Njure - Psoas',
      'Cirkulation/sex - Gluteus medius',
      'Trippelvärmare - Teres minor',
      'Gallblåsa - Anterior deltoid',
      'Lever - Pectoralis major sternal',
      'Lunga - Anterior serratus',
      'Tjocktarm - Facia lata',
    ],
  },
  {
    step: 2,
    title: 'Touch for Health: Kursplan Steg 2',
    approval: 'Godkänd av Touch for Health School of the International Kinesiology College',
    description:
      'Lagen om de fem elementen, TFH 2:s tekniktillämpningar och 14 muskler med deras meridianer.',
    sectionTitles: [
      'Lagen om de fem elementen',
      'TFH 2:s tekniktillämpningar',
      '14 muskler och deras meridianer',
    ],

    muscleBalances: [
      'Kretslokalisering',
      'Förtester',
      {
        title: 'TFH 2 Balanseringsmetoder',
        sub: ['Spindelcellsmekanism', 'Golgi-senapparat', 'Akupressurhållpunkter'],
      },
      'Cerebrospinalteknik',
      'Yin/Yang-konceptet',
      'Larmpunkter för överenergi',
      {
        title: 'Meridianhjulsbalansering',
        sub: ['Bäverdamm', 'Trianglar och kvadrater', 'Lagen om "dag och natt"'],
      },
      'Teorin och praktiken bakom lagen om de fem elementen',
      'Enpunktsbalans - balansera den första underenergin i Yin efter eventuell överenergi',
    ],
    techniques: [
      'E.S.R. Framtida prestationer',
      'Meridianmassage',
      'Merediangång för nyligen uppkommen smärta',
      'Näringstest med känslighetsläge',
      'Enkla smärttekniker',
      'Integrerad övning med “Cross Crawl”',
    ],
    muscles: [
      'Central - Supraspinatus',
      'Guvernör - Teres major',
      'Mage - Främre nackböjare och brachioradialismuskel',
      'Mjälte - Mellersta och nedre trapeziusmuskeln',
      'Hjärta - Subscapularis',
      'Tunntarmen - Rectus abdominis',
      'Urinblåsa - Sacrospinalis',
      'Njure - Iliacus',
      'Cirkulation/Sex - Adduktorer och Piriformis',
      'Trippelvärmare - Sartorius',
      'Gallblåsa - Popliteus',
      'Lever - Rhomboid',
      'Lunga - Deltoids',
      'Tjocktarmen - Quadratus lumborum',
    ],
  },
  {
    step: 3,
    title: 'Touch for Health: Kursplan Steg 3',
    approval: 'Godkänd av International Kinesiology College',
    description:
      'Teorin om reaktiva muskler, TFH 3:s tekniktillämpningar och 14 muskler med deras meridianer.',
    sectionTitles: [
      'Teorin om reaktiva muskler',
      'TFH 3:s tekniktillämpningar',
      '14 muskler och deras meridianer',
    ],

    muscleBalances: [
      'Repetition av de fem elementen',
      '5-elementbalansering med färg',
      '5-elementbalansering med mål och känsla',
      'Kretshållningsläge',
      'Facilitering och hämning',
      'Introduktion av nya muskler',
      'Reaktiv muskelteori och praktik',
    ],
    techniques: [
      'Sederingstekniker, lugnande, energisänkande',
      'Gångtester',
      'ESR för att ta bort tidigare stress och trauma',
      'Balansering Trauma',
      'Pulstest',
      'Smärtlindrande tekniker vid kronisk smärta',
      'Balansering med hjälp av näring',
    ],
    muscles: [
      'Central - Supraspinatus',
      'Guvernör - Teres major',
      'Mage - Levator scapulae, Bakre halsextensorer',
      'Mjälte - Opponen pollicis, Triceps',
      'Hjärta - Subscapularis',
      'Tunntarm - Tvärgående och obliqua magmuskler',
      'Urinblåsa - Främre och bakre skenbensmuskler',
      'Njure - Övre trapeziusmuskeln',
      'Cirkulation/Sex - Gluteus maximus',
      'Trippelvärmare - Gracilis, Soleus, Gastrocnemius',
      'Gallblåsa - Popliteus',
      'Lever - Rhomboids',
      'Lunga - Coracobrachialis, Diafragma',
      'Tjocktarmen - Hamstrings',
    ],
  },
  {
    step: 4,
    title: 'Touch for Health: Avancerad balans och energi',
    approval: 'Godkänd av Touch for Health School of the International Kinesiology College',
    description:
      'Balansering av känslor, ljud, färg och 42 muskler från topp till tå med olika tekniker och alternativ.',
    sectionTitles: ['Energiövningar', 'TFH 4:s tekniktillämpningar', 'TFH muskler'],

    energyExercises: [
      'Balansering av känslor med hjälp av de fem elementen',
      'Ljudbalansering med hjälp av de fem elementen',
      'Teorin om akupressurens hållpunkter',
      'Luo-punkter',
      'Tid på dagen-balans',
      'Figur Åtta Energi',
      'Neurolymfatisk frigöring',
      'Postural stressfrigöring',
      'Granskning av reaktiva Muskler',
      'Postural analys',
      '42 Muskler från Topp till Tå inkl. stående tester',
      {
        title: 'Information om andra kinesiologikurser/resurser',
        sub: [
          'TFH Studentarbetsbok',
          'TFH Färdighetsbedömning',
          'TFH Skolträningsworkshops',
          'TFH Metaforer',
          'Samhällsworkshops',
        ],
      },
    ],
    techniques: [
      {
        title: 'Balanseringsalternativ',
        sub: [
          'Med ett mål',
          'Med ett mål och en känsla',
          '14 muskelbalansering "as you go"',
          '14+ muskelbalansering',
          '42 muskler balanserar "as you go"',
        ],
      },
      {
        title: 'Alternativ med hjulet',
        sub: [
          'Trianglar och kvadrater',
          'Dag - och natt',
          'De fem elementens lag',
          'Färgbalansering',
          'Ljudbalansering',
          'Näringsbalansering',
        ],
      },
    ],
    muscles: [
      'Teres minor',
      'Subscapularis',
      'Deltoid',
      'Anterior serratus',
      'Coracobrachialis',
      'Diafragma',
      'Pectoralis major clavicular',
      'Pectoralis major sternal',
      'Rhomboids',
      'Levator Scapulae',
      'Latissimus dorsi',
      'Brachioradialmuskeln',
      'Triceps',
      'Opponens pollicis',
      'Anterior deltoid',
      'Supraspinatus',
      'Mellersta trapeziusmuskeln',
      'Nedre trapeziusmuskeln',
      'Övre trapeziusmuskeln',
      'Främre nackböjare',
      'Abdominals - rectus, transversus, obliqua magmuskler',
      'Facia lata',
      'Psoas',
      'Iliacus',
      'Gluteus medius',
      'Adduktorer',
      'Gracilis',
      'Piriformis',
      'Sartorius',
      'Popliteus',
      'Quadriceps',
      'Peroneus',
      'Främre tibialmuskler',
      'Bakre tibialmuskler',
      'Quadratus lumborum',
      'Bakre halsextensorer',
      'Teres major',
      'Sacrospinalis',
      'Gluteus maximus',
      'Hamstrings',
      'Soleus',
      'Gastrocnemius',
    ],
    muscleDescription: 'Liggandes på rygg eller ståendes upprätt',
  },
];

export default function Page() {
  return (
    <>
      <DefaultHero title='Touch For Health' />
      <section style={{ padding: '2rem 0', backgroundColor: 'var(--tertiary-100)' }}>
        <div className={style.container}>
          <div className={style.content}>
            {/* Flex-rad för Title + Bild */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '3rem',
                flexWrap: 'wrap', // gör layouten responsiv
              }}
            >
              <div style={{ flex: '1 1 0', minWidth: '300px' }}>
                <Title
                  heading='Touch For Health Steg 1-4'
                  subHeading='Vad är Touch For Health?'
                  description={[
                    `Touch for Health® Kinesiologi (TFHK) är ett system för att balansera hållning, attityd och livsenergi för större komfort, vitalitet och livsglädje. Touch for Health faller under den gren av alternativ och komplementär terapi som kallas kinesiologi – läkningssystem som använder manuell muskelbiofeedback för att avgöra vilka stimuli som stressar kroppen och hur den stressen kan minskas. Touch for Health-modellen behandlar eller diagnostiserar inte symtom, utan arbetar med klientens energi, livsstil och ambitioner och erbjuder ett säkert och effektivt sätt att upprätthålla hälsan, förbättra välbefinnandet och förbättra prestationen. Touch for Health är det mest använda kinesiologisystemet i världen. Det är erkänt och respekterat som en grundläggande träning för andra kinesiologisystem samt en läkningsmetod i sig.,`,
                    `Touch for Health är en syntes av uråldrig kunskap om de kinesiska akupunkturmeridianerna och tekniker som härrör från kiropraktik, naturläkemedel, osteopati och personcentrerad rådgivning, inklusive akupressur, beröringsreflexer, meridianspårning, näring och kropp-själ-tekniker för att balansera subtila energier samtidigt som man fokuserar på meningsfulla, personliga mål.,`,
                  ]}
                  left
                />
              </div>

              <div className={style['touch-image-container']}>
                <Image
                  src='/touch-for-health-logo-removebg-preview.png'
                  alt='Touch For Health'
                  width={400}
                  height={400}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    display: 'block',
                  }}
                  className='touch-image-container'
                />
              </div>
            </div>
            <TreatmentSection heading='Ett enkelt, smidigt och säkert system för energikinesiologi'>
              <ul>
                <li>Utveckla personlig medvetenhet och tydliggöra dina mål och motivation</li>
                <li>Rensa mentala, emotionella, fysiska och energiska blockeringar</li>
                <li>Öka energi och vitalitet och motverka trötthet</li>
                <li>
                  Lindra smärta och spänningar – huvudvärk, ryggvärk, magont,
                  arm/axlar/ben/knä-smärtor
                </li>
                <li>Släpp mental och emotionell stress</li>
                <li>Förbättra hälsa och välbefinnande, förebygga sjukdomar och skador</li>
                <li>Snabbare återhämtning från sjukdomar och skador</li>
                <li>Förbättra prestationer på arbete, skola, sport och i relationer</li>
                <li>Identifiera livsmedel som ökar energi</li>
                <li>Balansera energiflödet för topprestation och livsglädje</li>
              </ul>
            </TreatmentSection>

            <TreatmentItem
              heading='För vem?'
              description={`Touch For Health-kinesiologi kan enkelt läras av vem som helst (med lite övning!), utan förkunskaper om muskler, fysiologi, vital energi, meridianer etc. De praktiska Touch for Health-workshoparna leds i över 60 länder av certifierade Touch for Health-instruktörer, utbildade av fakulteten vid International Kinesiology College (IKC).`}
            />
          </div>
        </div>
      </section>

      {courseSteps.map((step, index) => (
        <section
          key={step.step}
          style={{
            padding: '2rem 0',
            backgroundColor: index % 2 === 0 ? 'var(--tertiary-200)' : 'transparent', // index börjar på 0, så 0,2,4 = steg 1,3,5
          }}
        >
          <div className={style.container}>
            <div className={style.content}>
              <Title
                heading={`${step.approval}`}
                subHeading={step.title}
                description={step.description}
                left
              />

              <div className={style['treatment-items']}>
                {step.muscleBalances && step.muscleBalances.length > 0 && (
                  <TreatmentSection heading={step.sectionTitles?.[0] ?? 'Muskelbalanseringar'}>
                    <ul>{renderList(step.muscleBalances)}</ul>
                  </TreatmentSection>
                )}

                {step.techniques && step.techniques.length > 0 && (
                  <TreatmentSection heading={step.sectionTitles?.[1] ?? 'Tekniktillämpningar'}>
                    <ul>{renderList(step.techniques)}</ul>
                  </TreatmentSection>
                )}

                {step.muscles && step.muscles.length > 0 && (
                  <TreatmentSection heading={step.sectionTitles?.[2] ?? 'Muskler'}>
                    {step.muscleDescription && (
                      <p
                        className={style.muscleDescription}
                        style={{
                          marginBottom: '1.5rem',
                          fontStyle: 'italic',
                          color: 'gray',
                        }}
                      >
                        {step.muscleDescription}
                      </p>
                    )}
                    <ul>{renderList(step.muscles)}</ul>
                  </TreatmentSection>
                )}

                {step.energyExercises && step.energyExercises.length > 0 && (
                  <TreatmentSection
                    heading={step.sectionTitles?.[0] ?? 'Övningar och energiövningar'}
                  >
                    <ul>{renderList(step.energyExercises)}</ul>
                  </TreatmentSection>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

function renderList(items: (string | { title: string; sub: string[] })[]) {
  return items.map((item, i) => {
    if (typeof item === 'string') {
      return <li key={i}>{item}</li>;
    } else {
      return (
        <li key={i}>
          {item.title}
          <ul>
            {item.sub.map((subItem, j) => (
              <li key={j}>{subItem}</li>
            ))}
          </ul>
        </li>
      );
    }
  });
}
