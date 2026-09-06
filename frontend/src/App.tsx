import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AboutPage from "./AboutPage";
import HowItWorksPage from "./HowItWorksPage";
import "./App.css";

const mockMatches = [
  {
    source: [120, 80],
    reference: [150, 95],
    inlier: true,
  },
  {
    source: [250, 140],
    reference: [280, 155],
    inlier: true,
  },
  {
    source: [380, 220],
    reference: [410, 235],
    inlier: true,
  },
  {
    source: [500, 300],
    reference: [530, 315],
    inlier: true,
  },
];

type RegistrationStatus =
  | "idle"
  | "uploading"
  | "processing"
  | "matching"
  | "registering"
  | "completed";

function App() {
  const location = useLocation();
  /* =========================================================
     REFERENCES
     ========================================================= */

  const correspondenceStageRef =
    useRef<HTMLDivElement>(null);

  /* =========================================================
     IMAGE STATES
     ========================================================= */

  const [sourceImage, setSourceImage] =
    useState<File | null>(null);

  const [referenceImage, setReferenceImage] =
    useState<File | null>(null);

  const [sourcePreview, setSourcePreview] =
    useState<string | null>(null);

  const [referencePreview, setReferencePreview] =
    useState<string | null>(null);

  /* =========================================================
     REGISTRATION STATUS
     ========================================================= */

 const [status, setStatus] = useState<RegistrationStatus>("idle");

  const [opacity, setOpacity] = useState(50);

  /* =========================================================
     CORRESPONDENCE LINE POSITIONS
     ========================================================= */

  const [linePoints, setLinePoints] = useState<
    {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }[]
  >([]);

  /* =========================================================
     SOURCE IMAGE PREVIEW
     ========================================================= */

  useEffect(() => {
    if (!sourceImage) {
      setSourcePreview(null);
      return;
    }

    const url =
      URL.createObjectURL(sourceImage);

    setSourcePreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [sourceImage]);

  /* =========================================================
     REFERENCE IMAGE PREVIEW
     ========================================================= */

  useEffect(() => {
    if (!referenceImage) {
      setReferencePreview(null);
      return;
    }

    const url =
      URL.createObjectURL(referenceImage);

    setReferencePreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [referenceImage]);

  /* =========================================================
     CALCULATE CORRESPONDENCE LINES
     
     IMPORTANT:
     We use the ACTUAL rendered positions of the
     blue and green points.
     ========================================================= */

  useEffect(() => {
    if (status !== "completed") {
      setLinePoints([]);
      return;
    }

    const calculateLines = () => {
      const stage =
        correspondenceStageRef.current;

      if (!stage) {
        return;
      }

      const stageRect =
        stage.getBoundingClientRect();

      const sourcePoints =
        stage.querySelectorAll(
          ".source-point"
        );

      const referencePoints =
        stage.querySelectorAll(
          ".reference-point"
        );

      const newLinePoints: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
      }[] = [];

      const count = Math.min(
        sourcePoints.length,
        referencePoints.length
      );

      for (let i = 0; i < count; i++) {
        const sourceRect =
          sourcePoints[i].getBoundingClientRect();

        const referenceRect =
          referencePoints[i].getBoundingClientRect();

        newLinePoints.push({
          x1:
            sourceRect.left -
            stageRect.left +
            sourceRect.width / 2,

          y1:
            sourceRect.top -
            stageRect.top +
            sourceRect.height / 2,

          x2:
            referenceRect.left -
            stageRect.left +
            referenceRect.width / 2,

          y2:
            referenceRect.top -
            stageRect.top +
            referenceRect.height / 2,
        });
      }

      setLinePoints(newLinePoints);
    };

    /* Wait until the browser has finished layout */
    const frame1 =
      requestAnimationFrame(() => {
        const frame2 =
          requestAnimationFrame(() => {
            calculateLines();
          });

        return frame2;
      });

    /* Recalculate whenever the viewer changes size */
    const resizeObserver =
      new ResizeObserver(() => {
        calculateLines();
      });

    if (correspondenceStageRef.current) {
      resizeObserver.observe(
        correspondenceStageRef.current
      );
    }

    window.addEventListener(
      "resize",
      calculateLines
    );

    return () => {
      cancelAnimationFrame(frame1);

      resizeObserver.disconnect();

      window.removeEventListener(
        "resize",
        calculateLines
      );
    };
  }, [
    status,
    sourcePreview,
    referencePreview,
  ]);

  /* =========================================================
     REGISTER BUTTON
     ========================================================= */

  const handleRegister = () => {
    setStatus("uploading");

    setTimeout(() => {
      setStatus("processing");
    }, 1500);

    setTimeout(() => {
      setStatus("matching");
    }, 3000);

    setTimeout(() => {
      setStatus("registering");
    }, 4500);

    setTimeout(() => {
      setStatus("completed");
    }, 6000);
  };

  /* =========================================================
     MAIN UI
     ========================================================= */
const downloadFile = (
  content: string,
  filename: string,
  type: string
) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};


const handleDownloadImage = () => {
  if (!sourcePreview) return;

  const link = document.createElement("a");
  link.href = sourcePreview;
  link.download = "chandra-bindu-registered-image.jpg";
  link.click();
};


const handleDownloadMatches = () => {
  const content = JSON.stringify(mockMatches, null, 2);

  downloadFile(
    content,
    "chandra-bindu-match-points.json",
    "application/json"
  );
};


const handleDownloadReport = () => {
  const report = `
CHANDRA-BINDU
Lunar Image Correspondence & Registration
SIH26166

REGISTRATION REPORT
===================

Total Matches: 128
Inlier Matches: 96
Inlier Ratio: 75.0%
RMSE: 0.42 px
Spatial Coverage: 87.3%

Status: Registration Completed
`;

  downloadFile(
    report,
    "chandra-bindu-registration-report.txt",
    "text/plain"
  );
};
  return (
    <div className="app">
      {/* =====================================================
         HEADER
         ===================================================== */}

      <header className="header">

        <div className="brand">

          <div className="moon-symbol">
            ☾
          </div>

          <div>
            <h1>
              CHANDRA-BINDU
            </h1>

            <p>
              Lunar Image Correspondence & Registration
            </p>
          </div>

        </div>

        <nav className="navigation">

  <NavLink
    to="/"
    className={({ isActive }) => (isActive ? "active" : "")}
  >
    ⌂ Home
  </NavLink>

  <NavLink
    to="/about"
    className={({ isActive }) => (isActive ? "active" : "")}
  >
    ⓘ About
  </NavLink>

  <NavLink
    to="/how-it-works"
    className={({ isActive }) => (isActive ? "active" : "")}
  >
    ◉ How it Works
  </NavLink>

</nav>
      </header>

      {/* ================= PAGE ROUTING ================= */}

      {location.pathname === "/about" ? (
        <AboutPage />
      ) : location.pathname === "/how-it-works" ? (
        <HowItWorksPage />
      ) : (
        <>
      {/* =====================================================
         HERO
         ===================================================== */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-description">
            Upload a source image and a reference image
            to start the registration process and explore
            the lunar surface with advanced image
            correspondence.
          </p>

          <div className="feature-row">

            <div className="feature">

              <div className="feature-icon">
                ◎
              </div>

              <span>
                Accurate
                <br />
                Image Matching
              </span>

            </div>


            <div className="feature">

              <div className="feature-icon">
                ▣
              </div>

              <span>
                Advanced
                <br />
                Registration
              </span>

            </div>


            <div className="feature">

              <div className="feature-icon">
                ▥
              </div>

              <span>
                Reliable
                <br />
                Analysis
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
         INPUT IMAGES
         ===================================================== */}

      <section
  id="input-images"
  className="glass-card input-section"
>

        <div className="section-heading">

          <div className="section-icon input-section-icon">
            ▧
          </div>

          <div>

            <h2>
              INPUT IMAGES
            </h2>

            <p>
              Upload a source image and a reference image
              to start the registration process.
            </p>

          </div>

        </div>


        <div className="image-grid">

          {/* SOURCE IMAGE */}

          <div className="image-card">

            <h3>
              <span className="card-icon">
                ▣
              </span>

              SOURCE IMAGE
            </h3>


            {!sourcePreview ? (

              <label className="upload-box">

                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {

                    const file =
                      event.target.files?.[0] ??
                      null;

                    setSourceImage(file);

                  }}
                />

                <div className="upload-icon">
                  ↑
                </div>

                <p>
                  Drag & drop an image here
                </p>

                <span>
                  or
                </span>

                <strong>
                  Browse Image
                </strong>

                <small>
                  Supports: JPG, PNG, TIFF
                </small>

              </label>

            ) : (

              <div className="selected-image">

                <img
                  src={sourcePreview}
                  alt="Source preview"
                />

                <p>
                  {sourceImage?.name}
                </p>

                <button
                  onClick={() =>
                    setSourceImage(null)
                  }
                >
                  Remove
                </button>

              </div>

            )}

          </div>


          {/* REFERENCE IMAGE */}

          <div className="image-card">

            <h3>
              <span className="card-icon">
                ▣
              </span>

              REFERENCE IMAGE
            </h3>


            {!referencePreview ? (

              <label className="upload-box">

                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {

                    const file =
                      event.target.files?.[0] ??
                      null;

                    setReferenceImage(file);

                  }}
                />

                <div className="upload-icon">
                  ↑
                </div>

                <p>
                  Drag & drop an image here
                </p>

                <span>
                  or
                </span>

                <strong>
                  Browse Image
                </strong>

                <small>
                  Supports: JPG, PNG, TIFF
                </small>

              </label>

            ) : (

              <div className="selected-image">

                <img
                  src={referencePreview}
                  alt="Reference preview"
                />

                <p>
                  {referenceImage?.name}
                </p>

                <button
                  onClick={() =>
                    setReferenceImage(null)
                  }
                >
                  Remove
                </button>

              </div>

            )}

          </div>

        </div>


        {/* REGISTER BUTTON */}

        <button
          className="register-button"
          disabled={
            !sourceImage ||
            !referenceImage
          }
          onClick={handleRegister}
        >
          ⚙ &nbsp; REGISTER IMAGES &nbsp; →
        </button>

      </section>


      {/* =====================================================
         REGISTRATION STATUS
         ===================================================== */}

      <section className="status-section">

        <div className="section-heading">

          <div className="section-icon status-section-icon">
            ◉
          </div>

          <div>

            <h2>
              REGISTRATION STATUS
            </h2>

            <p>
              Track the progress of the registration pipeline.
            </p>

          </div>

        </div>

        {/* =====================================================
           REGISTRATION STATUS FLOW
           ===================================================== */}

        <div className="status-list">

          {/* UPLOADING */}
          <div
            className={`status-step ${
              status === "uploading" ? "active" : ""
            }`}
          >
            <div className="status-symbol uploading-symbol">
              ⇧
            </div>

            <span>Uploading</span>

            {status === "uploading" && (
              <small
                style={{
                  display: "block",
                  width: "160px",
                  marginTop: "10px",
                  textAlign: "center",
                  lineHeight: "1.35",
                  whiteSpace: "normal",
                }}
              >
                Uploading images...
              </small>
            )}
          </div>

          <div className="status-line"></div>

          {/* PROCESSING */}
          <div
            className={`status-step ${
              status === "processing" ? "active" : ""
            }`}
          >
            <div className="status-symbol processing-symbol">
              ⚙
            </div>

            <span>Processing</span>

            {status === "processing" && (
              <small
                style={{
                  display: "block",
                  width: "160px",
                  marginTop: "10px",
                  textAlign: "center",
                  lineHeight: "1.35",
                  whiteSpace: "normal",
                }}
              >
                Processing images...
              </small>
            )}
          </div>

          <div className="status-line"></div>

          {/* MATCHING */}
          <div
            className={`status-step ${
              status === "matching" ? "active" : ""
            }`}
          >
            <div className="status-symbol matching-symbol">
              ⊕
            </div>

            <span>Matching</span>

            {status === "matching" && (
              <small
                style={{
                  display: "block",
                  width: "190px",
                  marginTop: "10px",
                  textAlign: "center",
                  lineHeight: "1.35",
                  whiteSpace: "normal",
                }}
              >
                Finding image correspondences...
              </small>
            )}
          </div>

          <div className="status-line"></div>

          {/* REGISTERING */}
          <div
            className={`status-step ${
              status === "registering" ? "active" : ""
            }`}
          >
            <div className="status-symbol registering-symbol">
              ◈
            </div>

            <span>Registering</span>

            {status === "registering" && (
              <small
                style={{
                  display: "block",
                  width: "190px",
                  marginTop: "10px",
                  textAlign: "center",
                  lineHeight: "1.35",
                  whiteSpace: "normal",
                }}
              >
                Registering images...
              </small>
            )}
          </div>

          <div className="status-line"></div>

          {/* COMPLETED */}
          <div
            className={`status-step ${
              status === "completed" ? "active" : ""
            }`}
          >
            <div className="status-symbol completed-symbol">
              ✓
            </div>

            <span>Completed</span>

            {status === "completed" && (
              <small
                style={{
                  display: "block",
                  width: "190px",
                  marginTop: "10px",
                  textAlign: "center",
                  lineHeight: "1.35",
                  whiteSpace: "normal",
                }}
              >
                Registration completed successfully.
              </small>
            )}
          </div>

        </div>

      </section>

      {/* =====================================================
         RESULTS
         ===================================================== */}

      {status === "completed" && (

        <section className="glass-card results-section">

          <div className="section-heading">

            <div className="section-icon">
              ▣
            </div>

            <div>

              <h2>
                RESULTS
              </h2>

              <p>
                Input images used for the completed registration.
              </p>

            </div>

          </div>


          <div className="results-grid">

            {/* SOURCE RESULT */}

            <div className="result-card">

              <h3>
                SOURCE IMAGE
              </h3>

              {sourcePreview && (

                <img
                  src={sourcePreview}
                  alt="Source result"
                />

              )}

            </div>


            {/* REFERENCE RESULT */}

            <div className="result-card">

              <h3>
                REFERENCE IMAGE
              </h3>

              {referencePreview && (

                <img
                  src={referencePreview}
                  alt="Reference result"
                />

              )}

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
         CORRESPONDENCE VIEW
         ===================================================== */}

      {status === "completed" && (

        <section className="glass-card correspondence-section">

          <div className="section-heading">

            <div className="section-icon">
              ⊕
            </div>

            <div>

              <h2>
                CORRESPONDENCE VIEW
              </h2>

              <p>
                Visual correspondence between source and
                reference images.
              </p>

            </div>

          </div>


          {/* =================================================
             CORRESPONDENCE STAGE
             ================================================= */}

          <div
            className="correspondence-viewer correspondence-stage"
            ref={correspondenceStageRef}
            style={{
              position: "relative",
            }}
          >

            {/* =================================================
               SOURCE IMAGE
               ================================================= */}

            <div className="correspondence-image correspondence-source">

              <h3>
                SOURCE IMAGE
              </h3>


              <div className="correspondence-image-wrapper">

                {sourcePreview && (

                  <img
                    src={sourcePreview}
                    alt="Source correspondence"
                  />

                )}


                {/* SOURCE POINTS */}

                {mockMatches.map(
                  (match, index) => (

                    <div
                      key={index}
                      className="match-point source-point"
                      style={{
                        left:
                          `${(match.source[0] / 600) * 100}%`,

                        top:
                          `${(match.source[1] / 350) * 100}%`,
                      }}
                    >
                      {index + 1}
                    </div>

                  )
                )}

              </div>

            </div>


            {/* =================================================
               CENTER CONNECTOR
               ================================================= */}

            <div className="correspondence-connector">
              ↔
            </div>


            {/* =================================================
               REFERENCE IMAGE
               ================================================= */}

            <div className="correspondence-image correspondence-reference">

              <h3>
                REFERENCE IMAGE
              </h3>


              <div className="correspondence-image-wrapper">

                {referencePreview && (

                  <img
                    src={referencePreview}
                    alt="Reference correspondence"
                  />

                )}


                {/* REFERENCE POINTS */}

                {mockMatches.map(
                  (match, index) => (

                    <div
                      key={index}
                      className="match-point reference-point"
                      style={{
                        left:
                          `${(match.reference[0] / 600) * 100}%`,

                        top:
                          `${(match.reference[1] / 350) * 100}%`,
                      }}
                    >
                      {index + 1}
                    </div>

                  )
                )}

              </div>

            </div>


            {/* =================================================
               CORRESPONDENCE LINES

               IMPORTANT:
               This SVG covers the WHOLE stage.
               Coordinates are actual screen positions
               relative to the stage.
               ================================================= */}

            <svg
              className="correspondence-lines"
              width="100%"
              height="100%"
              viewBox={`0 0 ${
                correspondenceStageRef.current?.clientWidth || 1000
              } ${
                correspondenceStageRef.current?.clientHeight || 500
              }`}
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 5,
                overflow: "visible",
              }}
            >

              {linePoints.map(
                (point, index) => (

                  <line
                    key={index}
                    x1={point.x1}
                    y1={point.y1}
                    x2={point.x2}
                    y2={point.y2}
                    stroke="#21a6ff"
                    strokeWidth="2.5"
                    opacity="0.9"
                    vectorEffect="non-scaling-stroke"
                  />

                )
              )}

            </svg>

          </div>

        </section>
        )}

        {/* ================= REGISTERED RESULT ================= */}
{status === "completed" && (
  <section className="glass-card registered-section">

    <div className="section-heading">
      <div className="section-icon">
        ◈
      </div>

      <div>
        <h2>REGISTERED RESULT</h2>
        <p>
          Compare the reference image with the registered source image.
        </p>
      </div>
    </div>

    <div className="registered-overlay">

      {/* REFERENCE IMAGE */}
      {referencePreview && (
        <img
          src={referencePreview}
          alt="Reference image"
          className="registered-base-image"
        />
      )}

      {/* REGISTERED SOURCE IMAGE */}
      {sourcePreview && (
        <img
          src={sourcePreview}
          alt="Registered source image"
          className="registered-overlay-image"
          style={{ opacity: opacity / 100 }}
        />
      )}

    </div>

    <div className="opacity-control">

      <label htmlFor="opacity">
        OVERLAY OPACITY
      </label>

      <input
        id="opacity"
        type="range"
        min="0"
        max="100"
        value={opacity}
        onChange={(e) => setOpacity(Number(e.target.value))}
      />

      <span>{opacity}%</span>

    </div>

  </section>


  
)}
      
{/* ================= METRICS ================= */}
<section className="glass-card metrics-section">

  <div className="section-heading">

    <div className="section-icon metrics-section-icon">
      ◌
    </div>

    <div>
      <h2>REGISTRATION METRICS</h2>
      <p>Quantitative accuracy and correspondence statistics.</p>
    </div>

  </div>

  <div className="metrics-grid">

    <div className="metric-card">
      <span className="metric-label">TOTAL MATCHES</span>
      <strong>128</strong>
    </div>

    <div className="metric-card">
      <span className="metric-label">INLIER MATCHES</span>
      <strong>96</strong>
    </div>

    <div className="metric-card">
      <span className="metric-label">INLIER RATIO</span>
      <strong>75.0%</strong>
    </div>

    <div className="metric-card">
      <span className="metric-label">RMSE</span>
      <strong>0.42 <small>px</small></strong>
    </div>

    <div className="metric-card">
      <span className="metric-label">SPATIAL COVERAGE</span>
      <strong>87.3%</strong>
    </div>

  </div>

</section>
{/* ================= DOWNLOADS ================= */}
<section className="glass-card downloads-section">

  <div className="section-heading">

    <div className="section-icon downloads-section-icon">
      ⇩
    </div>

    <div>
      <h2>DOWNLOAD RESULTS</h2>
      <p>Export the registered product, match points and analysis report.</p>
    </div>

  </div>

  <div className="downloads-grid">

    <button
  className="download-card"
  onClick={handleDownloadImage}
>
      <span className="download-icon">▣</span>

      <span>
        <strong>REGISTERED IMAGE</strong>
        <small>Download registered product</small>
      </span>

      <b>↓</b>
    </button>


    <button
  className="download-card"
  onClick={handleDownloadMatches}
>
      <span className="download-icon">⊕</span>

      <span>
        <strong>MATCH POINTS</strong>
        <small>Download correspondence points</small>
      </span>

      <b>↓</b>
    </button>


    <button
  className="download-card"
  onClick={handleDownloadReport}
>
      <span className="download-icon">▤</span>

      <span>
        <strong>REGISTRATION REPORT</strong>
        <small>Download analysis report</small>
      </span>

      <b>↓</b>
    </button>

  </div>

</section>

        </>
      )}

    </div>
  );
}

export default App;