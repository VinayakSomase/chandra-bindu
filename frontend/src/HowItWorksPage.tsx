import "./App.css";

function HowItWorksPage() {
  return (
    <main className="page-content">

      {/* HERO */}
      <section className="page-hero">
        <p className="page-kicker">CHANDRA-BINDU</p>

        <h2>HOW CHANDRA-BINDU WORKS</h2>

        <p className="page-subtitle">
          Turning different views of the same lunar terrain into reliable
          correspondence.
        </p>

        <p className="page-description">
          CHANDRA-BINDU combines lunar photometric correction,
          structure-aware matching and geometric refinement to establish
          accurate correspondence between multi-sensor lunar observations.
        </p>
      </section>


      {/* CORE CHALLENGE */}
      <section className="glass-card page-section">

        <div className="section-heading">
          <div className="section-icon">⚠</div>

          <div>
            <h2>WHY IS LUNAR IMAGE CORRESPONDENCE HARD?</h2>
          </div>
        </div>

        <div className="challenge-grid">

          <div className="info-card">
            <span>01</span>
            <h3>ILLUMINATION</h3>
            <p>
              The same terrain can appear different under different Sun
              angles and shadow conditions.
            </p>
          </div>

          <div className="info-card">
            <span>02</span>
            <h3>VIEWPOINT</h3>
            <p>
              Different orbital passes introduce changes in viewing
              geometry, rotation and perspective.
            </p>
          </div>

          <div className="info-card">
            <span>03</span>
            <h3>SCALE</h3>
            <p>
              OHRC, TMC-2 and IIRS observe the Moon at very different
              spatial scales.
            </p>
          </div>

          <div className="info-card">
            <span>04</span>
            <h3>MODALITY</h3>
            <p>
              Different instruments capture terrain with different
              imaging characteristics.
            </p>
          </div>

        </div>

        <div className="strong-statement">
          These differences make direct appearance-based matching unreliable.
        </div>

      </section>


      {/* APPROACH */}
      <section className="glass-card page-section">

        <div className="section-heading">
          <div className="section-icon">◈</div>

          <div>
            <h2>THE CHANDRA-BINDU APPROACH</h2>
          </div>
        </div>

        <div className="approach-list">

          <div className="approach-card">
            <div className="approach-number">01</div>

            <div>
              <h3>PHYSICS-INFORMED</h3>

              <h4>Correct the illumination difference</h4>

              <p>
                Use lunar photometric information such as Sun/terrain
                geometry to reduce illumination-driven appearance changes
                before correspondence.
              </p>

              <small>Lunar-Lambert correction</small>
            </div>
          </div>


          <div className="approach-card">
            <div className="approach-number">02</div>

            <div>
              <h3>STRUCTURE-AWARE</h3>

              <h4>Match terrain, not just brightness</h4>

              <p>
                Use structural terrain features and spatially distributed
                matching to find correspondence that is less dependent on
                raw pixel appearance.
              </p>

              <small>Grid-based correspondence</small>
            </div>
          </div>


          <div className="approach-card">
            <div className="approach-number">03</div>

            <div>
              <h3>GEOMETRY + SUB-PIXEL</h3>

              <h4>Refine the final correspondence</h4>

              <p>
                Use robust geometric estimation to reject inconsistent
                matches, followed by sub-pixel refinement for precise
                correspondence locations.
              </p>

              <small>Robust alignment • Sub-pixel refinement</small>
            </div>
          </div>

        </div>

      </section>


      {/* CONCEPTUAL FLOW */}
      <section className="glass-card page-section">

        <div className="section-heading">
          <div className="section-icon">◈</div>

          <div>
            <h2>FROM OBSERVATIONS TO CORRESPONDENCE</h2>
          </div>
        </div>

        <div className="concept-flow">

          <div className="flow-instruments">
            <span>OHRC</span>
            <span>TMC-2</span>
            <span>IIRS</span>
          </div>

          <div className="flow-arrow">↓</div>

          <div className="flow-core">
            <strong>CHANDRA-BINDU</strong>

            <span>Physics</span>
            <span>+</span>
            <span>Structure</span>
            <span>+</span>
            <span>Geometry</span>
          </div>

          <div className="flow-arrow">↓</div>

          <div className="flow-result">
            CORRESPONDENCE POINTS
          </div>

          <div className="flow-arrow">↓</div>

          <div className="flow-result">
            REGISTERED IMAGE
          </div>

          <p>Same terrain • Common reference frame</p>

        </div>

      </section>


      {/* DIFFERENT */}
      <section className="glass-card page-section">

        <div className="section-heading">
          <div className="section-icon">✦</div>

          <div>
            <h2>WHAT MAKES CHANDRA-BINDU DIFFERENT?</h2>
          </div>
        </div>

        <div className="difference-grid">

          <div>
            <strong>PHYSICS BEFORE MATCHING</strong>
            <p>
              Addresses illumination variation instead of relying only on
              appearance-invariant descriptors.
            </p>
          </div>

          <div>
            <strong>UNIFORM BY DESIGN</strong>
            <p>
              Grid-based feature selection helps distribute correspondences
              across the image.
            </p>
          </div>

          <div>
            <strong>PRECISION BEYOND INTEGER PIXELS</strong>
            <p>
              Accepted matches can be refined to sub-pixel coordinates.
            </p>
          </div>

          <div>
            <strong>BUILT FOR LUNAR MULTI-SENSOR DATA</strong>
            <p>
              Designed around the OHRC, TMC-2 and IIRS correspondence
              problem.
            </p>
          </div>

        </div>

      </section>


      {/* FINAL MESSAGE */}
      <section className="final-message">

        CHANDRA-BINDU does not treat lunar illumination as just image noise
        — it treats it as part of the registration problem.

      </section>

    </main>
  );
}

export default HowItWorksPage;