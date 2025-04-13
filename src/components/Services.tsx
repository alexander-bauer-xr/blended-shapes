// src/components/Services.tsx
import { useNavigate } from 'react-router-dom';
import { LandingPage } from '../models/LandingPage';

interface ServicesProps {
  services?: LandingPage['services'];
}

const removeOuterParagraph = (html: string): string => {
  const trimmedHTML = html.trim();
  if (trimmedHTML.startsWith('<p>') && trimmedHTML.endsWith('</p>')) {
    return trimmedHTML.substring(3, trimmedHTML.length - 4);
  }
  return html;
};

const Services = ({ services }: ServicesProps) => {
  const navigate = useNavigate();

  if (!services || services.length === 0) return null;

  const handleTagClick = (tag: string) => {
    navigate(`/services?tags=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="services-section">
      <div className="content">
        <div className="experiences-scrolly" id="experiencesScrolly">
          <div className="sticky-container experiences" id="stickyExperiences">
            <h2>Services</h2>
            {services.map((service) => (
              <div
                key={service.id}
                className="experience"
                data-fullheight="300"
                data-minheight="100"
              >
                <div className="experience-text">
                  <h3>{service.title}</h3>
                  <div className='tags'>
                  {service.tags?.map((tag, index) => (
                    <button
                      key={index}
                      className="tag-button"
                      onClick={() => handleTagClick(tag.title)}
                    >
                      {tag.title}
                    </button>
                  ))}
                  </div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: removeOuterParagraph(service.beschreibungLang),
                    }}
                  />
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