// src/components/Hero.tsx
const Hero = () => {
    return (
      <>
        <section className="hero-container">
          <div className="clip">
            <div className="transform-frame-left">
              <div className="transform-left">
                <span>shapes</span>
                <br />
                <span style={{ marginLeft: 'calc(2vw + 1.5rem)' }}>between</span>
              </div>
            </div>
            <div className="transform-frame-right">
              <div className="transform-right">
                and
                <br />
                <span style={{ marginLeft: 'calc(2vw + 1.5rem)' }}>around us</span>
              </div>
            </div>
          </div>
          <div id="canvas-container" aria-hidden="true"></div>
        </section>
        <div id="canvas-background" aria-hidden="true"></div>
      </>
    );
};

export default Hero;