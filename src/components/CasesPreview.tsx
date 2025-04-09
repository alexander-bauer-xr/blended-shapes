// src/components/CasesPreview.tsx

import { FC } from 'react';

type Props = {
  gallery: {
    id: string;
    path: string;
    filename: string;
    url: string | null;
  }[];
};

const positionClasses = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
const caseTitles = [
  'ein-anderes-duisburg.de',
  'therapie-fokus.at',
  'grauzone-pott.de',
  'Sand im Getriebe',
];

const CasesPreview: FC<Props> = ({ gallery }) => {
  return (
    <section className="cases-section">
      <div className="content">
        <h2>Cases</h2>
        <div className="grid">
          {gallery.slice(0, 4).map((item, index) => (
            <div className={`grid-item ${positionClasses[index]}`} key={item.id}>
              {item.url ? (
                <img src={item.url} alt={caseTitles[index]} />
              ) : (
                <div className="img-placeholder">No Image</div>
              )}
              <span>{caseTitles[index]}</span>
            </div>
          ))}
        </div>
        <a href="/cases" className="button Cases">
          <span className="cases-icon"></span>Alle Cases ansehen
        </a>
      </div>
    </section>
  );
};

export default CasesPreview;