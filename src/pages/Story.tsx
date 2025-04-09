// src/pages/Cases.tsx
import { useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import initVisualScrollEffects from '../js/menuBackground';
import StoryLiner from '../components/StoryLiner';
import StoryLongLiner from '../components/StoryLongLiner';
import People from '../components/People';


const Story = () => {

    useLayoutEffect(() => {

        initVisualScrollEffects();

    }, []);

    return (
        <>
            <Helmet>
                <title>Story | Blended Shapes | Creative Coding, Design & Art Direction, 3D-Visualisierungen</title>
                <meta name="description" content="Erfahre wer Blended Shapes gegründet hat." />
                <meta property="og:title" content="Story | Blended Shapes | Creative Coding, Design und Art Direction, 3D-Visualisierungen" />
                <meta property="og:description" content="Erfahre wer Blended Shapes gegründet hat." />
            </Helmet>

            <main className="container-xl sub">
                <section className="cases-section">
                    <div className="content">
                        <h2>Story</h2>
                        <div className="lead-wrapper">
                            <StoryLongLiner />
                        </div>
                    </div>
                </section>

                <section>
                    <div className="content">
                        <StoryLiner />
                    
                        <People />
                    </div>
                </section>
            </main>
        </>
    );
};

export default Story;