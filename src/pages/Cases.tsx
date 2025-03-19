// src/pages/Cases.tsx
import { useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import initVisualScrollEffects from '../js/menuBackground';

import case1Img from '../assets/img/case1/case1-1.png';
import case2Img from '../assets/img/case1/case1-2.png';
import case3Img from '../assets/img/case1/case1-3.png';
import case4Img from '../assets/img/case1/case1-4.png';

const caseItems = [
  { id: 'item1', img: case1Img, title: 'ABFAB', format: 'span-2' },
  { id: 'item2', img: case2Img, title: 'ABFAB', format: 'span-1' },
  { id: 'item3', img: case3Img, title: 'ABFAB', format: 'span-1' },
  { id: 'item4', img: case4Img, title: 'ABFAB', format: 'span-2' },
];

const Cases = () => {

  useLayoutEffect(() => {

    initVisualScrollEffects();

  }, []);

  return (
    <>
      <Helmet>
        <title>Cases | Blended Shapes | Creative Coding, Design & Art Direction, 3D-Visualisierungen</title>
        <meta name="description" content="Ausgewählte Projekte von Blended Shapes im Überblick." />
        <meta property="og:title" content="Cases | Blended Shapes" />
        <meta property="og:description" content="Ausgewählte Projekte und Leistungen von Blended Shapes." />
      </Helmet>

      <main className="container-xl sub">
        <section className="cases-section">
          <div className="content">
            <div className="lead-wrapper">
              <h2>Cases</h2>
              <h3>ABSOLUTELY FABULOUS</h3>
              <p>
                Absolutely Fabulous is a beauty concept store offering top quality nail
                services. Here we strive to bring cutting edge Ukrainian beauty standards
                to Vienna. All of our services include cuticle work, as well as thorough
                desinfection and sterilisation of tools and usage of disposable materials in
                order to insure your safe and pleasent treatment.
              </p>
              <div className="tags">
                <button>Art Direction</button>
                <button>Coding</button>
                <button>Design</button>
                <button>Social Media</button>
              </div>
            </div>

            <div className="gallery-wrapper">
              {caseItems.map((item) => (
                <div className={`gallery-item ${item.format}`} key={item.id} id={item.id}>
                  <img src={item.img} alt={item.title} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Cases;