// src/components/CTA.tsx
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="CTA-wraper">
      <div className="content">
        <h2 className="CTA-head">
          <span>Unternehmen wir gemeinsam die nächsten Schritte.</span>
        </h2>
        <div className="sticky-CTA-container">
          <div className="CTA">
            <Link to="/contact">
              <button>
                <span className="clip-icon"></span> Schreib mir!
              </button>
            </Link>
            <div className="CTA-spacer"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;