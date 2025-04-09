// src/pages/Cases.tsx
import { useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import initVisualScrollEffects from '../js/menuBackground';
import CaseCarousel from '../components/CaseCarousel';

const Cases = () => {

  useLayoutEffect(() => {

    initVisualScrollEffects();

  }, []);

  return (
    <>
      <Helmet>
        <title>Cases | Blended Shapes | Creative Coding, Design und Art Direction, 3D-Visualisierungen</title>
        <meta name="description" content="Ausgewählte Projekte von Blended Shapes im Überblick." />
        <meta property="og:title" content="Cases | Blended Shapes" />
        <meta property="og:description" content="Ausgewählte Projekte und Leistungen von Blended Shapes." />
      </Helmet>

        <CaseCarousel />
    </>
  );
};

export default Cases;