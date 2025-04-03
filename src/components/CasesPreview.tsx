// src/components/CasesPreview.tsx
import case1Img from '../assets/img/cases/case1.png';
import case2Img from '../assets/img/cases/case2.png';
import case3Img from '../assets/img/cases/case3.png';
import case4Img from '../assets/img/cases/case4.png';

const caseItems = [
  { id: 'item1', img: case1Img, title: 'ein-anderes-duisburg.de', position: 'top-left' },
  { id: 'item2', img: case2Img, title: 'therapie-fokus.at', position: 'top-right' },
  { id: 'item3', img: case3Img, title: 'grauzone-pott.de', position: 'bottom-left' },
  { id: 'item4', img: case4Img, title: 'Sand im Getriebe', position: 'bottom-right' },
];

const CasesPreview = () => {
  return (
    <section className="cases-section">
      <div className="content">
        <h2>Cases</h2>
        <div className="grid">
          {caseItems.map((item) => (
            <div className={`grid-item ${item.position}`} key={item.id} id={item.id}>
              <img src={item.img} alt={item.title} />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
        <a href="/dev/cases" className="button Cases">
          <span className="cases-icon"></span>Alle Cases ansehen
        </a>
      </div>
    </section>
  );
};

export default CasesPreview;