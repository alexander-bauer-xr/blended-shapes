// src/pages/contact.tsx
import { useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import initVisualScrollEffects from '../js/menuBackground';
import ContactForm from '../components/ContactForm';

const Contact = () => {

  useLayoutEffect(() => {

    initVisualScrollEffects();

  }, []);

  return (
    <>
      <Helmet>
        <title>Contact | Blended Shapes | Creative Coding, Design und Art Direction, 3D-Visualisierungen</title>
        <meta name="description" content="Ausgewählte Projekte von Blended Shapes im Überblick." />
        <meta property="og:title" content="Cases | Blended Shapes" />
        <meta property="og:description" content="Ausgewählte Projekte und Leistungen von Blended Shapes." />
      </Helmet>
      <main className="container-xl sub contact">
        <ContactForm />
      </main>
    </>
  );
};

export default Contact;