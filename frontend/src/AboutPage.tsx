import "./App.css";

function AboutPage() {
  return (
    <main className="page-content">

      <section className="glass-card about-page">

        <div className="section-heading">
          <div className="section-icon about-section-icon">ⓘ</div>

          <div>
            <h2>ABOUT CHANDRA-BINDU</h2>
            <p>Intelligent Lunar Image Correspondence</p>
          </div>
        </div>

        <div className="about-content">

          <p>
            CHANDRA-BINDU is a software system for establishing
            correspondence between lunar observations captured under
            different imaging conditions, scales and sensor modalities.
          </p>

          <p>
            The system is designed around the Chandrayaan-2 OHRC,
            TMC-2 and IIRS imaging problem described in SIH26166.
          </p>

          {/* ================= THE PROBLEM ================= */}

          <h3>THE PROBLEM</h3>

          <div className="about-flow">
            <span>Different observations</span>
            
            <span>Different appearance</span>
            
            <span>Difficult correspondence</span>
            
            <span>Reliable registration</span>
          </div>

          {/* ================= WHAT THE SYSTEM PROVIDES ================= */}

          <h3>WHAT THE SYSTEM PROVIDES</h3>

          <div className="about-output-grid">

            <div>
              <span>CORRESPONDENCE POINTS</span>
              <strong>
                Matching locations between images
              </strong>
            </div>

            <div>
              <span>REGISTERED IMAGE</span>
              <strong>
                Source aligned to reference frame
              </strong>
            </div>

            <div>
              <span>REGISTRATION METRICS</span>
              <strong>
                RMSE, inliers, ratio and coverage
              </strong>
            </div>

            <div>
              <span>VISUAL VALIDATION</span>
              <strong>
                Overlay and correspondence views
              </strong>
            </div>

          </div>

          {/* ================= CHANDRAYAAN-2 INSTRUMENTS ================= */}

          <h3>CHANDRAYAAN-2 IMAGING INSTRUMENTS</h3>

          <div className="about-info-grid">

            <div>
              <span>OHRC</span>
              <strong>
                High-resolution optical imaging
              </strong>
            </div>

            <div>
              <span>TMC-2</span>
              <strong>
                Terrain Mapping Camera imagery
              </strong>
            </div>

            <div>
              <span>IIRS</span>
              <strong>
                Imaging Infrared Spectrometer observations
              </strong>
            </div>

          </div>

          {/* ================= PROJECT INFORMATION ================= */}

          <h3 className="project-info-heading">
            PROJECT INFORMATION
          </h3>

          <div className="about-project-context">

            <div>
              <span>PROBLEM STATEMENT</span>
              <strong>SIH26166</strong>
            </div>

            <div>
              <span>THEME</span>
              <strong>Space Technology</strong>
            </div>

            <div>
              <span>CATEGORY</span>
              <strong>Software</strong>
            </div>

          </div>

          {/* ================= FINAL STATEMENT ================= */}

          <div className="about-final">
            From multi-sensor observations to a common lunar reference.
          </div>

        </div>

      </section>

    </main>
  );
}

export default AboutPage;