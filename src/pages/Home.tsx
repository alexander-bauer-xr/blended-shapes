// src/pages/Home.tsx

import { useLayoutEffect, useState, useEffect, useMemo } from 'react';
import { getLandingPage } from '../services/cmsClient';
import { LandingPage } from '../models/LandingPage';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import CasesPreview from '../components/CasesPreview';
import Services from '../components/Services';
import Story from '../components/Story';
import CTA from '../components/CTA';
import initVisualScrollEffects from '../js/visual';
import initThreeScene, { destroyThreeScene } from '../js/main';
import initGridEffects from '../js/grid';
import './Home.scss';

const cleanHTML = (html: string): string => {
  const trimmedHTML = html.trim();
  if (trimmedHTML.startsWith('<p>') && trimmedHTML.endsWith('</p>')) {
    return trimmedHTML.substring(3, trimmedHTML.length - 4);
  }
  return html;
};

const Home = () => {
  const [landingData, setLandingData] = useState<LandingPage | null>(null);

  useLayoutEffect(() => {
    setTimeout(() => {
      const retryVisualInit = () => {
        const sticky = document.querySelector('.sticky-container');
        if (sticky) {
          initVisualScrollEffects();
        } else {
          setTimeout(retryVisualInit, 100);
        }
      };

      retryVisualInit();
      initThreeScene();
      initGridEffects();
    }, 0);

    return () => {
      destroyThreeScene();
    };
  }, []);

  useEffect(() => {
    getLandingPage().then((data) => {
      setLandingData(data?.[0] || null);
    });
  }, []);

  const cleanedLeadtext = useMemo(() => {
    return landingData?.leadtext ? cleanHTML(landingData.leadtext) : '';
  }, [landingData]);

  return (
    <>
      <Helmet>
        <title>Home | Blended Shapes</title>
        <meta name="description" content="Creative Coding, Design & 3D-Visualisierungen" />
        <meta property="og:title" content="Home | Blended Shapes" />
        <meta property="og:description" content="Blended Shapes – wir bringen Form und Funktion zusammen." />
      </Helmet>

      <Hero />

      <main className="container-xl index">
        {cleanedLeadtext && (
          <section className="lead-section">
            <div className="content">
              <div className="lead-wrapper">
                <p className="lead" dangerouslySetInnerHTML={{ __html: cleanedLeadtext }} />
              </div>
            </div>
          </section>
        )}

        <CasesPreview casepreview={landingData?.casepreview ?? []} />
        <Services services={landingData?.services ?? []} />
        <Story />
        <CTA />
      </main>
    </>
  );
};

export default Home;