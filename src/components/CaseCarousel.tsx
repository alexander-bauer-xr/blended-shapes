import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { getCases } from '../services/cmsClient';
import { CaseEntry } from '../models/CaseEntry';

const CaseCarousel = () => {
  const [cases, setCases] = useState<CaseEntry[]>([]);
  const [index, setIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    getCases().then((data) => {
      setCases(data);
  
      if (data.length === 0) return;
  
      if (slug) {
        const foundIndex = data.findIndex((c) => c.slug === slug);
        setIndex(foundIndex >= 0 ? foundIndex : 0);
      } else {
        const randomIndex = Math.floor(Math.random() * data.length);
        setIndex(randomIndex);
        navigate(`/cases/${data[randomIndex].slug}`, { replace: true });
      }
    });
  }, [slug]);  

  const next = () => {
    setCollapsed(true);
    setTimeout(() => {
      const newIndex = (index + 1) % cases.length;
      setIndex(newIndex);
  
      navigate(`/cases/${cases[newIndex].slug}`, { replace: false });
  
      setCollapsed(false);
    }, 400);
  };
  

  const handlers = useSwipeable({
    onSwipedLeft: next,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  const current = cases[index];
  if (!current) return null;

  return (
    <main className="container-xl sub" {...handlers}>
      <section className="cases-section">
        <div className={`content transition-box ${collapsed ? 'collapsed' : 'expanded'}`}>
          <div className="lead-wrapper">
            <h2>Cases</h2>
            <h3>{current.title}</h3>
            <div
              className="case-description"
              dangerouslySetInnerHTML={{ __html: current.beschreibungKurz }}
            />
            {current.tags.length > 0 && (
              <div className="tags">
                {current.tags.map((tag, i) => (
                  <button key={i}>{tag}</button>
                ))}
              </div>
            )}
          </div>

          <div className="gallery-wrapper">
            {current.casespreviews.map((preview) => (
              <div key={preview.id} className={`gallery-item ${preview.cssStyle}`}>
                {preview.gallerie.map((img) => (
                  <img key={img.id} src={img.url} alt={preview.beschreibung} />
                ))}
              </div>
            ))}
          </div>

          <div className="nav-buttons">
            <button onClick={next} className="next-button">
              → nächster Case
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CaseCarousel;