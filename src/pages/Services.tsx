import { useLayoutEffect, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getServicesPage } from '../services/cmsClient';
import { ServicesPageEntry } from '../models/ServicesPageEntry';
import initVisualScrollEffects from '../js/menuBackground';

const Services = () => {
    const [data, setData] = useState<ServicesPageEntry | null>(null);
    const [activeTagIds, setActiveTagIds] = useState<string[]>([]);

    useLayoutEffect(() => {
        initVisualScrollEffects();
    }, []);

    useEffect(() => {
        getServicesPage().then(setData);
    }, []);

    const toggleTag = (tagId: string) => {
        setActiveTagIds(prev =>
            prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
        );
    };

    const filteredProjects = useMemo(() => {
        if (!data) return [];
        if (activeTagIds.length === 0) return data.projects;

        return data.projects.filter(project =>
            project.tags.some(tag => activeTagIds.includes(tag.id))
        );
    }, [activeTagIds, data]);

    return (
        <>
            <Helmet>
                <title>Services | Blended Shapes</title>
                <meta name="description" content="Entdecke unsere Leistungen – Web, 3D, XR und mehr." />
                <meta property="og:title" content="Services | Blended Shapes" />
                <meta property="og:description" content="Erfahre mehr über unsere angebotenen Leistungen." />
            </Helmet>

            <main className="container-xl sub">
                <section className="cases-section content">
                    <div className="services-center">
                        <h1>Services</h1>

                        <div className="services">
                            {data?.services.map(service => (
                                <div key={service.id} className="service-block">
                                    <h3>{service.title}</h3>
                                    <div className="tag-buttons">
                                        {service.assignedtags.map(tag => (
                                            <button
                                                key={tag.id}
                                                className={activeTagIds.includes(tag.id) ? 'active' : ''}
                                                onClick={() => toggleTag(tag.id)}
                                            >
                                                {tag.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="content">
                        <h2>Cases</h2>
                        <div className="grid-services">
                            {filteredProjects.map(project => (
                                <div key={project.id} className="project-tile">
                                    <Link to={`/cases/${project.slug}`} className="grid-link">

                                        <span>{project.title}</span>
                                        {project.gallerie[0]?.url && (
                                            <img src={project.gallerie[0].url} alt={project.title} />
                                        )}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Services;