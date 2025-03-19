// src/pages/Cases.tsx
import { useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import initVisualScrollEffects from '../js/menuBackground';

const Story = () => {

    useLayoutEffect(() => {

        initVisualScrollEffects();

    }, []);

    return (
        <>
            <Helmet>
                <title>Story | Blended Shapes | Creative Coding, Design & Art Direction, 3D-Visualisierungen</title>
                <meta name="description" content="Erfahre wer Blended Shapes gegründet hat." />
                <meta property="og:title" content="Story | Blended Shapes | Creative Coding, Design & Art Direction, 3D-Visualisierungen" />
                <meta property="og:description" content="Erfahre wer Blended Shapes gegründet hat." />
            </Helmet>

            <main className="container-xl sub">
                <section className="cases-section">
                    <div className="content">
                        <div className="lead-wrapper">
                            <h2>Story</h2>
                            <h3>blended shapes</h3>
                            <p className="story-lead">Form und Funktion lässt sich für uns nicht trennen. Diese beiden Dinge
                                müssen von einem eingängigen Konzept getragen werden, um eine klare
                                und unverwechselbare visuelle Sprache zu schaffen. Formen bringen
                                uns zusammen. Mit <span>Creative Coding</span>, <span>3D-Visualisierung</span>, <span>Art Direction</span>
                                 und
                                 <span>Design</span> setzen wir Ihre Marke kreativ in Szene – für mehr Sichtbarkeit
                                und Wirkung.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="content">
                        <div className="lead-wrapper">
                            <h2>Wir sind ...</h2>
                            <p className="lead">
                                ... ein Team aus Kreativen, Entwicklern und Visionären, die gemeinsam an einem Strang ziehen.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Story;