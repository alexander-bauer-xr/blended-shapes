// src/components/Services.tsx
import { useEffect } from 'react';
import { LandingPageEntry } from '../types/cms';

interface ServicesProps {
  services?: LandingPageEntry['services'];
}

const removeOuterParagraph = (html: string): string => {
  const trimmedHTML = html.trim();
  if (trimmedHTML.startsWith('<p>') && trimmedHTML.endsWith('</p>')) {
    return trimmedHTML.substring(3, trimmedHTML.length - 4);
  }
  return html;
};

const Services = ({ services }: ServicesProps) => {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="services-section">
      <div className="content">
        <div className="experiences-scrolly" id="experiencesScrolly">
          <div className="sticky-container experiences" id="stickyExperiences">
          <h2>Services</h2>
            {services.map((service) => (
              <div key={service.id} className="experience" data-fullheight="300" data-minheight="100">
                <div className="experience-text">
                  <h3>{service.slug.replace('-', ' & ')}</h3>
                  <p dangerouslySetInnerHTML={{ __html: removeOuterParagraph(service.beschreibungLang) }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
