import { FC, useEffect } from 'react';
import initGridEffects from '../js/grid';
import { Link } from 'react-router-dom';


type Props = {
  casepreview: {
    id: string;
    beschreibung: string;
    gallerie: {
      id: string;
      url: string | null;
    }[];
  }[];
};

const positionClasses = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

const CasesPreview: FC<Props> = ({ casepreview }) => {

  useEffect(() => {
    if (casepreview.length > 0) {
      setTimeout(() => {
        initGridEffects();
      }, 50);
    }
  }, [casepreview]);

  return (
    <section className="cases-section">
      <div className="content">
        <h2>Cases</h2>
        <div className="grid">
          {casepreview.slice(0, 4).map((item, index) => (
            <div className={`grid-item ${positionClasses[index]}`} key={item.id}>
              {item.gallerie[0]?.url ? (
                <img src={item.gallerie[0].url} alt={item.beschreibung} />
              ) : (
                <div className="img-placeholder">No Image</div>
              )}
              <span>{item.beschreibung}</span>
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