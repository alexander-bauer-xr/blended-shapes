import { FC, useEffect } from 'react';
import initGridEffects from '../js/grid';
import { Link } from 'react-router-dom';

type Props = {
  featuredcases: {
    id: string;
    title: string;
    slug: string;
    gallerie: {
      id: string;
      title: string;
      url: string | null;
    }[];
  }[];
};

const positionClasses = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

const CasesPreview: FC<Props> = ({ featuredcases }) => {
  useEffect(() => {
    if (featuredcases.length > 0) {
      setTimeout(() => {
        initGridEffects();
      }, 50);
    }
  }, [featuredcases]);

  return (
    <section className="cases-section">
      <div className="content">
        <h2>Cases</h2>
        <div className="grid">
          {featuredcases.slice(0, 4).map((item, index) => (
            <div className={`grid-item ${positionClasses[index]}`} key={item.id}>
              {item.gallerie[0]?.url ? (
                <Link to={`/cases/${item.slug}`} className="grid-link">
                  <img src={item.gallerie[0].url} alt={item.gallerie[0].title ?? item.title} />
                </Link>
              ) : (
                <div className="img-placeholder">No Image</div>
              )}
              {item.title?.trim() ? (
                <span>{item.title}</span>
              ) : null}
            </div>
          ))}
        </div>
        <Link to="/cases" className="button Cases">
          <span className="cases-icon"></span>Alle Cases ansehen
        </Link>
      </div>
    </section>
  );
};

export default CasesPreview;