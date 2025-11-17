import React, { useEffect, useState } from "react";

// Types
type PlanetId =
  | "summary"
  | "experience"
  | "skills"
  | "education"
  | "internships"
  | "projects"
  | "fun";

interface Planet {
  id: PlanetId;
  label: string;
  description: string;
  size: number;
}

const planets: Planet[] = [
  { id: "summary", label: "Mission Briefing", description: "Summary", size: 140 },
  { id: "experience", label: "Work Experience", description: "Career orbits", size: 170 },
  { id: "skills", label: "Skills Station", description: "Tech stack & tools", size: 150 },
  { id: "education", label: "Education Star", description: "Academic core", size: 130 },
  { id: "internships", label: "Internships Belt", description: "Past intern orbits", size: 160 },
  { id: "projects", label: "Project Planet", description: "Builds & creations", size: 165 },
  { id: "fun", label: "Fun Comet", description: "Fun fact & links", size: 110 },
];

// Unique planet textures (approx real planets)
const planetTextures: Record<PlanetId, string> = {
  summary:
    "url('https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg')",
  experience: "url('https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg')",
  skills: "url('https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg')",
  education:
    "url('https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg')",
  internships:
    "url('https://upload.wikimedia.org/wikipedia/commons/5/5f/Venus-real_color.jpg')",
  projects:
    "url('https://upload.wikimedia.org/wikipedia/commons/0/0d/Mercury_in_true_color.jpg')",
  fun: "url('https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg')",
};

// Neon collapsible card
function Collapsible({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      style={
        {
          marginBottom: "1rem",
          border: "1px solid rgba(56,189,248,0.9)",
          borderRadius: "12px",
          padding: "0.7rem 1rem",
          background:
            "radial-gradient(circle at top left, rgba(56,189,248,0.18), transparent 55%)," +
            "radial-gradient(circle at bottom right, rgba(129,140,248,0.22), transparent 55%)," +
            "rgba(10,20,55,0.9)",
          boxShadow:
            "0 0 12px rgba(56,189,248,0.7), 0 0 28px rgba(59,130,246,0.55)",
          transition:
            "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        } as React.CSSProperties
      }
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: "pointer",
          fontWeight: 600,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}
        <span>{open ? "▲" : "▼"}</span>
      </div>
      <div
        style={{
          maxHeight: open ? "800px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <div style={{ marginTop: open ? "0.6rem" : "0" }}>{children}</div>
      </div>
    </div>
  );
}

function App() {
  const [isTraditional, setIsTraditional] = useState(false);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const [activePlanet, setActivePlanet] = useState<Planet | null>(null);

  // Wide solar system radii (inner -> outer)
  const radii: Record<PlanetId, number> = {
    summary: 260,
    experience: 380,
    skills: 520,
    education: 680,
    internships: 760,
    projects: 840,
    fun: 920,
  };

  useEffect(() => {
    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    setPointerPos({ x: initialX, y: initialY });

    const handleMouseMove = (e: MouseEvent) => {
      setPointerPos((prev) => {
        const easing = 0.2;
        return {
          x: prev.x + (e.clientX - prev.x) * easing,
          y: prev.y + (e.clientY - prev.y) * easing,
        };
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const rootClassName =
    "space-root h-screen w-screen overflow-hidden text-slate-100 " +
    (activePlanet ? "cursor-default" : "cursor-none");

  // ---------------- TRADITIONAL VIEW ----------------
  if (isTraditional) {
    return (
      <div
        className="space-root"
        style={{
          minHeight: "100vh",
          padding: "2.5rem 1.5rem 3rem",
          background:
            "radial-gradient(circle at 0% 0%, #0f172a 0, #020617 38%, #000014 100%)",
          color: "#e5edff",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          boxShadow:
            "0 0 40px rgba(59,130,246,0.55) inset, 0 0 90px rgba(8,47,73,0.9) inset",
        }}
      >
        <header style={{ marginBottom: "1.8rem" }}>
          <h1 style={{ fontSize: "2.1rem", margin: 0 }}>Sai Kiran Patwari</h1>
          <p style={{ margin: "0.4rem 0", opacity: 0.85 }}>
            Software Engineer • Backend, Distributed Systems, Cloud
          </p>
          <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}>
            Email:{" "}
            <a
              href="mailto:SaiKiranPatwari99@gmail.com"
              style={{ color: "#93c5fd" }}
            >
              saikiranpatwari99@gmail.com
            </a>{" "}
            · LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/patwari-saikiran/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#93c5fd" }}
            >
              patwari-saikiran
            </a>{" "}
            · GitHub:{" "}
            <a
              href="https://github.com/SaiKiranPatwari"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#93c5fd" }}
            >
              SaiKiranPatwari
            </a>
            ,{" "}
            <a
              href="https://github.com/Saikiran2527"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#93c5fd" }}
            >
              Saikiran2527
            </a>
          </p>
          <button
            onClick={() => setIsTraditional(false)}
            style={{
              marginTop: "0.9rem",
              padding: "0.35rem 0.9rem",
              borderRadius: 999,
              background: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(148,163,255,0.8)",
              color: "#e5edff",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            ◀ Back to SaiVerse (Solar System)
          </button>
        </header>

        {/* Summary */}
        <section style={{ marginBottom: "1.6rem" }}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>Summary</h2>
          <p style={{ margin: 0, lineHeight: 1.6, fontSize: "0.95rem" }}>
            Software Engineer with 4+ years of experience building scalable backend
            services, distributed event-driven systems, and cloud-native
            applications. Strong in Java, Python, AWS, microservices, CI/CD, and
            real-time data processing.
          </p>
        </section>

        {/* Experience */}
        <section style={{ marginBottom: "1.6rem" }}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>Experience</h2>

          <Collapsible title="Techpods LLC - Software Developer (May 2025 - Present)">
            <ul>
              <li>
                Designed and developed scalable full-stack web applications using
                ReactJS, Angular, and Spring Boot, improving system performance and
                user engagement by 40% through optimized front-end rendering and API
                integration.
              </li>
              <li>
                Built and deployed AI-driven pipelines using Python, TensorFlow, and
                PyTorch for predictive analytics and NLP tasks, automating 70% of
                manual workflows and boosting data processing efficiency by 35%.
              </li>
              <li>
                Implemented RESTful APIs and serverless data pipelines on AWS
                (Lambda, EC2, SageMaker), achieving 99.9% uptime and 30% faster data
                synchronization across microservices.
              </li>
              <li>
                Collaborated with designers and backend teams to develop responsive,
                accessible UI/UX features, reducing page load time by 25% and
                enhancing overall usability scores.
              </li>
              <li>
                Adopted Agile and CI/CD best practices (Jenkins, Git, AWS
                CodePipeline), improving release frequency by 50% while maintaining
                high code quality and system reliability.
              </li>
            </ul>
          </Collapsible>

          <Collapsible title="Inqui-Lab Foundationl - Software Developer (Sept 2022 - July 2023)">
            <ul>
              <li>
                Optimized broadband network performance by testing and validating
                Layer 3 switches, leveraging AWS CloudWatch and Grafana for
                real-time performance monitoring, improving QoS reliability by 40%
                and reducing network latency fluctuations by 30%.
              </li>
              <li>
                Crafted automated testing pipelines using Robot Framework and
                Python, integrating AWS Lambda for on-demand execution and
                JSON-based QoS validation, increasing testing efficiency by 45%.
              </li>
              <li>
                Elevated observability and distributed system communication by
                deploying Grafana dashboards for real-time network monitoring,
                integrating Apache Kafka for high-throughput log processing, and
                containerizing test environments with Docker and Kubernetes,
                reducing test deployment time by 50%.
              </li>
              <li>
                Implemented Test-Driven Development (TDD), improving broadband
                connection quality by 33% while integrating Jenkins CI/CD workflows
                for automated regression testing, reducing deployment failures by
                25% and accelerating feature reliability.
              </li>
            </ul>
          </Collapsible>

          <Collapsible title="Morgan Stanley - Software Developer (May 2021 - May 2022)">
            <ul>
              <li>
                Engineered Prime Brokerage Matrix, a multi-asset portfolio and risk
                management platform enabling real-time visualization of trade
                status, margin transparency, cash flows, and collateral exposure for
                institutional clients.
              </li>
              <li>
                Developed modular microservices using Spring Boot and integrated
                React JS dashboards to deliver dynamic portfolio overviews, what-if
                risk analysis, and real-time market data visualization, improving
                transparency and client engagement by 40%.
              </li>
              <li>
                Implemented data streaming with Kafka for real-time updates of
                clearing, listed derivatives, and OTC trades—reducing portfolio
                reconciliation time by 35% and ensuring accurate, intraday risk
                reporting.
              </li>
              <li>
                Integrated AWS-hosted data services for cross-product risk
                analytics and report generation, supporting flexible trade queries,
                MTM valuations, and customizable reporting schedules.
              </li>
              <li>
                Collaborated with front-office and risk teams to design margin and
                financing balance transparency modules, leveraging Oracle DB
                optimization and caching to reduce query latency by 25%.
              </li>
              <li>
                Enhanced security with OAuth 2.0, JWT-based access control, and AES
                encryption for client data in alignment with PCI DSS and internal
                Morgan Stanley security standards.
              </li>
              <li>
                Optimized deployment pipeline using Dockerized microservices
                orchestrated via Jenkins and AWS CodePipeline, achieving 99.9%
                uptime for global users accessing via desktop and Matrix Mobile.
              </li>
            </ul>
          </Collapsible>
        </section>

        {/* Skills */}
        <section style={{ marginBottom: "1.6rem" }}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>Skills</h2>
          <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.95rem" }}>
            <li>
              <strong>Languages:</strong> Java, Python, C, C++, C#, JavaScript, HTML,
              CSS, SQL, Go, Ruby, Scala
            </li>
            <li>
              <strong>Cloud &amp; Databases:</strong> AWS, MySQL, PostgreSQL, OracleDB,
              MongoDB, DynamoDB
            </li>
            <li>
              <strong>Frameworks:</strong> Spring Boot, Hibernate, ASP.NET, REST APIs,
              GraphQL, SOAP APIs, Angular, React
            </li>
            <li>
              <strong>Tools:</strong> WordPress, IBM Integration Bus, Kafka,
              RabbitMQ, Docker, Kubernetes, Grafana, Jenkins, Git, JIRA
            </li>
            <li>
              <strong>ML &amp; Python:</strong> Pandas, NumPy, PyTorch, TensorFlow,
              Keras, OpenCV, NLTK, Matplotlib
            </li>
          </ul>
        </section>

        {/* Education */}
        <section style={{ marginBottom: "1.6rem" }}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>Education</h2>
          <p style={{ margin: 0, fontSize: "0.95rem" }}>
            <strong>University of Florida, Gainesville, Florida</strong>
            <br />
            Master of Science in Computer Science — GPA: 3.74 / 4.00
          </p>
        </section>

        {/* Internships */}
        <section style={{ marginBottom: "1.6rem" }}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>INTERNSHIPS</h2>

          <Collapsible title="Wiley Mthree | SDE Intern (Jan 2021 – May 2021)">
            <ul>
              <li>
                Project: Library Management System | Tech-Stack: JDBC(Java),
                Angular, MySQL, Tomcat.
              </li>
              <li>
                Developed a full-stack library management system and user-friendly
                interface that simplified borrowing and return processes.
              </li>
              <li>
                Utilized JDBC with Java to manage database connections and CRUD
                operations, ensuring accurate and real-time data updates.
              </li>
            </ul>
          </Collapsible>

          <Collapsible title="Cantilever Labs | SDE Intern (May 2020 – Aug 2020)">
            <ul>
              <li>
                Project: Online Car Rental Portal | Tech-Stack: JDBC(Java),
                JavaScript, Tomcat, MySQL.
              </li>
              <li>
                Created a user-centric interface enabling seamless booking and
                management of rentals with dynamic searching and filtering.
              </li>
              <li>
                Implemented JDBC for efficient application–database communication,
                streamlining booking operations and ensuring data integrity.
              </li>
            </ul>
          </Collapsible>

          <Collapsible title="Barelogics Solutions | Intern (May 2019 – July 2019)">
            <ul>
              <li>
                Project: Face Recognition using OpenCV | Tech-Stack: Python, OpenCV.
              </li>
              <li>
                Developed a robust face detection and recognition module using
                OpenCV.
              </li>
              <li>
                Fine-tuned recognition accuracy and speed, improving detection
                reliability.
              </li>
            </ul>
          </Collapsible>
        </section>

        {/* Projects */}
        <section style={{ marginBottom: "1.6rem" }}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>PROJECTS</h2>

          <Collapsible title="Double Star Attack Analysis in Unreal Engine">
            <ul>
              <li>
                Tech-Stack: Unreal Engine, AirSim, Python, Depth Estimation.
              </li>
              <li>
                Simulated real-world cyber-attacks on depth estimation models to
                evaluate vulnerabilities in stereo imaging.
              </li>
              <li>
                Integrated DispNet, PSMNet, and Monodepth models to capture stereo
                images and depth maps for performance evaluation.
              </li>
              <li>
                Conducted error mapping and model robustness tests, leading to an
                18% improvement in security measures against depth estimation
                attacks.
              </li>
            </ul>
          </Collapsible>

          <Collapsible title="E-Car Rental Portal">
            <ul>
              <li>
                Tech-Stack: JDBC(Java), React, JavaScript, Tomcat, MySQL (database).
              </li>
              <li>
                Engineered a full-stack web application to facilitate direct
                peer-to-peer car rentals, eliminating intermediary costs and
                improving transaction transparency.
              </li>
              <li>
                Developed secure user authentication and role-based access for
                renters, lenders, and administrators.
              </li>
              <li>
                Implemented optimized search and booking systems, enhancing
                customer engagement and increasing rental matches by 35%.
              </li>
            </ul>
          </Collapsible>

          <Collapsible title="Image Enhancement using Generative Adversarial Networks (GANs)">
            <ul>
              <li>
                Tech Stack: PyTorch, Convolutional Neural Networks (CNN).
              </li>
              <li>
                Developed a GAN-based image enhancement system to upscale and
                restore low-resolution images with 20% higher accuracy than
                traditional filtering techniques.
              </li>
              <li>
                Compared model performance with Median and Wiener filtering,
                demonstrating superior image clarity and noise reduction.
              </li>
              <li>
                Designed a user-friendly GUI for real-time image processing,
                making AI-driven enhancements accessible to non-technical users.
              </li>
            </ul>
          </Collapsible>

          <Collapsible title="Placement Prediction and Data Visualization">
            <ul>
              <li>
                Tech-Stack: Python, Machine Learning, Flask.
              </li>
              <li>
                Processed and analyzed 10 years of college placement data by
                cleaning, normalizing, and consolidating records.
              </li>
              <li>
                Applied ML models (SVM, K-NN, Naive Bayes) to predict placement
                probabilities with ~90% accuracy.
              </li>
              <li>
                Built a Flask-based web application to visualize and analyze
                placement trends, helping universities make data-driven decisions.
              </li>
            </ul>
          </Collapsible>

          <Collapsible title="Football Transfer Intelligence Feed">
            <ul>
              <li>
                Football Transfer Intelligence Feed — Python, FastAPI, SQLite,
                Ollama (LLM), yt-dlp, Whisper, HTML/CSS/JS.
              </li>
              <li>
                Built a full stack pipeline that ingests Fabrizio Romano YouTube
                updates, transcribes audio (captions → Whisper), and extracts
                structured transfer data with a local LLM (Ollama), publishing to a
                FastAPI + minimal web UI.
              </li>
              <li>
                Implemented multi-item extraction (JSON) with dedupe keys to record
                multiple transfers per video; added debug artifacts (meta,
                transcript, LLM raw, fallback) to speed triage.
              </li>
              <li>
                Hardened yt-dlp with cookies / browser profile and client args to
                bypass bot checks; added retries, ANSI stripping, and timeouts for
                robust local inference.
              </li>
              <li>
                Deployed as a single-command app (Uvicorn) with a scheduler to poll
                the channel; stored results in SQLite with an API endpoint consumed
                by a filterable UI.
              </li>
            </ul>
          </Collapsible>
        </section>
      </div>
    );
  }

  // ---------------- SAIVERSE SOLAR SYSTEM VIEW ----------------
  return (
    <div className={rootClassName}>
      {/* Inline CSS for demo */}
      <style>{`
        .space-root {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 30%, #020617 0%, #020111 55%, #000008 100%);
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .space-map {
          position: relative;
          height: 100%;
          width: 100%;
          z-index: 6;
        }

        /* Parallax galaxy layers */
        .starfield,
        .starfield--mid,
        .starfield--slow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .starfield {
          background-image:
            url('https://raw.githubusercontent.com/matteobruni/tsparticles/gh-pages/images/stars.png');
          background-size: repeat;
          opacity: 0.9;
          animation: driftFast 80s linear infinite;
        }

        .starfield--mid {
          background-image:
            radial-gradient(circle at 60% 40%, rgba(140,80,255,0.25) 0, transparent 70%),
            radial-gradient(circle at 20% 70%, rgba(255,80,180,0.18) 0, transparent 72%);
          background-size: cover;
          mix-blend-mode: screen;
          opacity: 0.7;
          animation: driftMid 140s linear infinite;
        }

        .starfield--slow {
          background-image:
            url('https://raw.githubusercontent.com/matteobruni/tsparticles/gh-pages/images/stars.png');
          background-size: 200% 200%;
          opacity: 0.35;
          filter: blur(1px);
          animation: driftSlow 220s linear infinite;
        }

        .astronaut {
          position: fixed;
          transform: translate(-50%, -50%);
          font-size: 2.4rem;
          pointer-events: none;
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.7);
          animation: bob 2.8s ease-in-out infinite;
          z-index: 8;
        }

        .hud {
          position: absolute;
          top: 1.5rem;
          left: 2rem;
          z-index: 9;
          padding: 0.75rem 1.25rem;
          border-radius: 999px;
          background: rgba(4, 9, 27, 0.85);
          border: 1px solid rgba(138, 180, 255, 0.4);
          box-shadow: 0 0 18px rgba(0, 150, 255, 0.35);
          backdrop-filter: blur(12px);
        }

        .hud h1 {
          margin: 0;
          font-size: 1.3rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hud p {
          margin: 0.2rem 0 0;
          font-size: 0.85rem;
          opacity: 0.9;
        }

        .planet {
          position: absolute;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          overflow: visible;
        }

        .planet__body {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background-image:
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.9) 0, rgba(255,255,255,0.1) 35%, transparent 60%),
            radial-gradient(circle at 130% 50%, rgba(0,0,0,0.8) 0, rgba(0,0,0,0.2) 55%, transparent 75%),
            var(--planetTexture);
          background-size: 180% 180%, 200% 200%, cover;
          background-position: 20% 20%, 120% 50%, center;
          background-repeat: no-repeat;
          background-blend-mode: screen, multiply, normal;
          box-shadow:
            inset -18px -24px 32px rgba(0,0,0,0.85),
            inset 8px 10px 18px rgba(255,255,255,0.28),
            0 0 55px rgba(130,170,255,0.85),
            0 0 140px rgba(70,90,255,0.55);
          animation: spin 40s linear infinite;
        }

        .planet__ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 210%;
          height: 70%;
          transform: translate(-50%, -50%) rotate(30deg);
          border-radius: 50%;
          border: 4px solid rgba(187, 215, 255, 0.6);
          box-shadow: 0 0 24px rgba(94, 153, 255, 0.7);
          pointer-events: none;
        }

        .planet__label {
          position: absolute;
          bottom: -3.2rem;
          width: max-content;
          max-width: 10rem;
          text-align: center;
          font-size: 0.8rem;
          pointer-events: none;
          padding: 0.25rem 0.6rem;
          border-radius: 999px;
          background: rgba(3, 10, 25, 0.9);
          border: 1px solid rgba(163, 200, 255, 0.7);
          backdrop-filter: blur(8px);
        }

        .planet__label h3 {
          margin: 0;
          font-size: 0.85rem;
        }

        .planet__label small {
          display: block;
          margin-top: 0.1rem;
          font-size: 0.7rem;
          opacity: 0.75;
        }

        .planet:hover {
          transform: translate(-50%, -50%) scale(1.08);
          box-shadow: 0 0 30px rgba(138, 180, 255, 0.95);
        }

        .orbit {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(160, 190, 255, 0.35);
          box-shadow: 0 0 18px rgba(80, 120, 255, 0.25);
          transform-origin: 50% 50%;
          animation-name: planetOrbit;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          z-index: 4;
        }

        .sun {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background:
            radial-gradient(circle at 30% 25%, #fffbe6 0, #ffe28c 35%, #ffb733 60%, #e67a00 78%, #6b3500 100%);
          box-shadow:
            0 0 45px rgba(255,221,102,0.9),
            0 0 120px rgba(255,187,51,0.8),
            0 0 220px rgba(255,136,0,0.7);
          animation: sunPulse 6s ease-in-out infinite;
          z-index: 5;
          pointer-events: none;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at center, rgba(2, 8, 25, 0.7), rgba(0, 0, 0, 0.95));
          z-index: 98;
          pointer-events: auto;
        }

        .modal {
          cursor: default;
          position: fixed;
          z-index: 99;
          inset: 50% auto auto 50%;
          transform: translate(-50%, -50%);
          width: min(650px, 92vw);
          max-height: 80vh;
          padding: 1.2rem 1.3rem 1.4rem;
          border-radius: 1.4rem;
          background: radial-gradient(circle at top, rgba(15, 32, 72, 0.98), rgba(4,  7, 22, 0.98));
          border: 1px solid rgba(163, 200, 255, 0.7);
          box-shadow: 0 0 30px rgba(122, 176, 255, 0.7), 0 0 80px rgba(0, 0, 0, 1);
          backdrop-filter: blur(14px);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: pop-in 0.2s ease-out;
          pointer-events: auto;
        }

        .modal__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.4rem;
        }

        .modal__header h2 {
          margin: 0;
          font-size: 1.25rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .modal__close {
          border: none;
          background: transparent;
          color: inherit;
          font-size: 1.1rem;
          cursor: pointer;
          padding: 0.2rem 0.4rem;
          border-radius: 999px;
        }

        .modal__close:hover {
          background: rgba(12, 25, 63, 0.9);
        }

        .modal__content {
          overflow-y: auto;
          padding-right: 0.2rem;
          font-size: 0.9rem;
        }

        .modal__content h3 {
          margin-top: 0.4rem;
        }

        .modal__content p {
          line-height: 1.5;
        }

        .job {
          margin-top: 0.8rem;
        }

        .job h4 {
          margin: 0;
          font-size: 1rem;
        }

        .job__meta {
          margin: 0.1rem 0 0.2rem;
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 0.7rem;
          margin-top: 0.6rem;
        }

        .skills-grid h4 {
          margin: 0 0 0.2rem;
          font-size: 0.9rem;
        }

        .skills-grid p {
          margin: 0;
          font-size: 0.85rem;
          opacity: 0.95;
        }

        .links {
          margin-top: 0.8rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .links a {
          font-size: 0.85rem;
          text-decoration: none;
          color: #d5e5ff;
          padding: 0.25rem 0.7rem;
          border-radius: 999px;
          border: 1px solid rgba(144, 191, 255, 0.9);
          background: rgba(4, 16, 45, 0.9);
          pointer-events: auto;
          position: relative;
          z-index: 100;
        }

        .links a:hover {
          background: rgba(16, 40, 98, 0.95);
        }

        .hint {
          margin-top: 0.4rem;
          font-size: 0.8rem;
          opacity: 0.8;
          font-style: italic;
        }

        .comet {
          position: absolute;
          width: 3px;
          height: 14px;
          background: linear-gradient(to bottom right, #9ad0ff 0%, #7bbaff 40%, transparent 80%);
          border-radius: 999px;
          box-shadow:
            0 0 12px rgba(150,190,255,0.95),
            0 0 32px rgba(120,160,255,0.75);
          transform: rotate(45deg);
          animation: cometTrail 7s linear infinite;
          z-index: 2;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes bob {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-6px); }
        }

        @keyframes driftFast {
          0% { transform: translate3d(0,0,0) scale(1); }
          100% { transform: translate3d(-600px,-260px,0) scale(1.4); }
        }

        @keyframes driftMid {
          0% { transform: translate3d(0,0,0) scale(1); }
          100% { transform: translate3d(-320px,-180px,0) scale(1.2); }
        }

        @keyframes driftSlow {
          0% { transform: translate3d(0,0,0) scale(1); }
          100% { transform: translate3d(-200px,-120px,0) scale(1.1); }
        }

        @keyframes cometTrail {
          0% { transform: translateX(-10vw) translateY(-10vh) scale(0.6); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateX(120vw) translateY(120vh) scale(1.4); opacity: 0; }
        }

        @keyframes pop-in {
          from { opacity: 0; transform: translate(-50%, -46%); }
          to { opacity: 1; transform: translate(-50%, -50%); }
        }

        @keyframes sunPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.06); }
        }

        @keyframes planetOrbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 600px) {
          .hud {
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            max-width: 90vw;
          }

          .planet__label {
            bottom: -3.7rem;
          }

          .modal {
            inset: 52% auto auto 50%;
            width: 94vw;
          }
        }
      `}</style>

      {/* Dense comet shower */}
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={"comet-" + i}
          className="comet"
          style={{
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * -40}vw`,
            animationDelay: `${Math.random() * -12}s`,
          }}
        />
      ))}

      {/* Parallax galaxy layers */}
      <div className="starfield" />
      <div className="starfield--mid" />
      <div className="starfield starfield--slow" />

      {/* UFO cursor */}
      <div
        className="astronaut"
        style={{ left: pointerPos.x + "px", top: pointerPos.y + "px" }}
      >
        🛸
      </div>

      {/* HUD */}
      <header className="hud">
        <h1>SaiVerse — Sai Kiran Patwari</h1>
        <p>Fly the UFO and click on planets to explore my universe.</p>
        <button
          onClick={() => setIsTraditional((prev) => !prev)}
          style={{
            marginTop: "0.4rem",
            padding: "0.35rem 0.9rem",
            borderRadius: 999,
            background: "rgba(20,40,80,0.9)",
            border: "1px solid rgba(150,190,255,0.8)",
            color: "#dce6ff",
            cursor: "pointer",
            fontSize: "0.8rem",
            backdropFilter: "blur(6px)",
          }}
        >
          Switch to Traditional View
        </button>
      </header>

      {/* Central Sun */}
      <div className="sun" />

      {/* Planets & Orbits */}
      <div className="space-map">
        {planets.map((planet, index) => {
          const r = radii[planet.id];
          const orbitDuration = 26 + r / 10; // inner faster, outer slower
          const phaseOffset = (index / planets.length) * orbitDuration; // spread start time

          return (
            <div
              key={planet.id + "-orbit"}
              className="orbit"
              style={{
                pointerEvents: "none",
                left: "50%",
                top: "50%",
                width: r * 2,
                height: r * 2,
                marginLeft: -r,
                marginTop: -r,
                animationDuration: `${orbitDuration}s`,
                animationDelay: `${-phaseOffset}s`,
              }}
            >
              <div
                className="planet"
                style={{
                  pointerEvents: "auto",
                  left: "50%",
                  top: 0,
                  width: planet.size,
                  height: planet.size,
                }}
                onClick={() => setActivePlanet(planet)}
              >
                <div
                  className="planet__body"
                  style={{
                    // @ts-ignore CSS custom property
                    "--planetTexture": planetTextures[planet.id],
                  }}
                />
                {planet.id === "experience" && <div className="planet__ring" />}
                <div className="planet__label">
                  <h3>{planet.label}</h3>
                  <small>{planet.description}</small>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {activePlanet && (
        <>
          <div
            className="modal-backdrop"
            onClick={() => setActivePlanet(null)}
          />

          <section className="modal">
            <header className="modal__header">
              <h2>{activePlanet.label}</h2>
              <button
                className="modal__close"
                onClick={() => setActivePlanet(null)}
              >
                ✕
              </button>
            </header>

            <div className="modal__content">
              {activePlanet.id === "summary" && (
                <div>
                  <h3>Mission Summary</h3>
                  <p>
                    Software Engineer with 4+ years of hands-on experience building
                    scalable backend services, distributed event-driven systems, and
                    cloud-native applications.
                  </p>
                  <p>
                    Strong expertise in Python, Java, microservices, AWS, CI/CD
                    automation, and real-time data processing.
                  </p>
                </div>
              )}

              {activePlanet.id === "experience" && (
                <div>
                  <h3>Work Experience</h3>
                  <article className="job">
                    <h4>Techpods LLC – Software Developer</h4>
                    <p className="job__meta">May 2025 – Present</p>
                  </article>
                  <article className="job">
                    <h4>Inqui-Lab Foundation – Software Developer</h4>
                    <p className="job__meta">Sept 2022 – July 2023</p>
                  </article>
                  <article className="job">
                    <h4>Morgan Stanley – Software Developer</h4>
                    <p className="job__meta">May 2021 – May 2022</p>
                  </article>
                </div>
              )}

              {activePlanet.id === "skills" && (
                <div>
                  <h3>Skills Space Station</h3>
                  <div className="skills-grid">
                    <div>
                      <h4>Languages</h4>
                      <p>
                        Java, Python, C, C++, C#, JavaScript, HTML, CSS, SQL, Go,
                        Ruby, Scala
                      </p>
                    </div>
                    <div>
                      <h4>Cloud &amp; Databases</h4>
                      <p>AWS, MySQL, PostgreSQL, OracleDB, MongoDB, DynamoDB</p>
                    </div>
                    <div>
                      <h4>Frameworks</h4>
                      <p>
                        Spring Boot, Hibernate, ASP.NET, REST APIs, GraphQL, SOAP
                        APIs, Angular, React
                      </p>
                    </div>
                    <div>
                      <h4>Tools &amp; Technologies</h4>
                      <p>
                        WordPress, IBM Integration Bus, Kafka, RabbitMQ, Docker,
                        Kubernetes, Grafana, Jenkins, Git, JIRA
                      </p>
                    </div>
                    <div>
                      <h4>ML &amp; Python Libraries</h4>
                      <p>
                        Pandas, NumPy, PyTorch, TensorFlow, Keras, OpenCV, NLTK,
                        Matplotlib
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activePlanet.id === "education" && (
                <div>
                  <h3>Education Star</h3>
                  <p>
                    <strong>University of Florida, Gainesville, Florida</strong>
                  </p>
                  <p>Master of Science in Computer Science</p>
                  <p>GPA: 3.74 / 4.00</p>
                </div>
              )}

              {activePlanet.id === "internships" && (
                <div>
                  <h3>Internships</h3>
                  <article className="job">
                    <h4>Wiley Mthree – SDE Intern</h4>
                    <p className="job__meta">Jan 2021 – May 2021</p>
                    <p>
                      Library Management System — JDBC(Java), Angular, MySQL, Tomcat
                    </p>
                  </article>
                  <article className="job">
                    <h4>Cantilever Labs – SDE Intern</h4>
                    <p className="job__meta">May 2020 – Aug 2020</p>
                    <p>Online Car Rental Portal — Java, JDBC, JS, Tomcat, MySQL</p>
                  </article>
                  <article className="job">
                    <h4>Barelogics Solutions – Intern</h4>
                    <p className="job__meta">May 2019 – Jul 2019</p>
                    <p>Face Recognition using Python + OpenCV</p>
                  </article>
                </div>
              )}

              {activePlanet.id === "projects" && (
                <div>
                  <h3>Projects</h3>
                  <ul>
                    <li>
                      <strong>Double Star Attack Analysis</strong> — Unreal Engine,
                      AirSim, Python
                    </li>
                    <li>
                      <strong>E-Car Rental Portal</strong> — React, Java, JDBC,
                      Tomcat, MySQL
                    </li>
                    <li>
                      <strong>Image Enhancement using GANs</strong> — PyTorch, CNN
                    </li>
                    <li>
                      <strong>Placement Prediction and Data Visualization</strong>
                      — Python ML, Flask
                    </li>
                    <li>
                      <strong>Football Transfer Intelligence Feed</strong> —
                      FastAPI, SQLite, LLMs, yt-dlp
                    </li>
                  </ul>
                </div>
              )}

              {activePlanet.id === "fun" && (
                <div>
                  <h3>Fun Comet</h3>
                  <p>
                    "Reject this resume and risk being intercepted by 3I/ATLAS, your
                    call."
                  </p>
                  <div className="links">
                    <a
                      href="mailto:SaiKiranPatwari99@gmail.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Contact Mission Control (Email)
                    </a>
                    <a
                      href="https://www.linkedin.com/in/patwari-saikiran/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View LinkedIn Orbit
                    </a>
                    <a
                      href="https://github.com/SaiKiranPatwari"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub Main
                    </a>
                    <a
                      href="https://github.com/Saikiran2527"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub Projects
                    </a>
                  </div>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default App;
