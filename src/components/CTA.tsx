// src/components/CTA.tsx
const CTA = () => {
    return (
      <section className="CTA-wraper">
        <div className="content">
          <h2 className="CTA-head">
            <span>Unternehmen wir gemeinsam die nächsten Schritte.</span>
          </h2>
          <div className="sticky-CTA-container">
            <div className="CTA">
              <button>
                <span className="clip-icon"></span> Schreib mir!
              </button>
              <div className="CTA-spacer"></div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default CTA;