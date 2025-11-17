import React, { useState, useEffect } from "react";

const planetData = [
  {
    id: "mercury",
    name: "Mercury",
    size: 40,
    image:
      "https://cdn.pixabay.com/photo/2013/07/12/17/58/mercury-152909_1280.png",
    details: "Mercury — Fastest orbit, smallest rocky planet."
  },
  {
    id: "venus",
    name: "Venus",
    size: 55,
    image:
      "https://cdn.pixabay.com/photo/2012/04/10/23/02/venus-26855_1280.png",
    details: "Venus — Thick atmosphere, volcanic surface."
  },
  {
    id: "earth",
    name: "Earth",
    size: 60,
    image:
      "https://cdn.pixabay.com/photo/2011/12/13/14/29/earth-11048_1280.jpg",
    details: "Earth — Home planet, liquid water, life."
  },
  {
    id: "mars",
    name: "Mars",
    size: 50,
    image:
      "https://cdn.pixabay.com/photo/2012/04/10/23/02/mars-26856_1280.png",
    details: "Mars — Red planet, potential for life."
  },
  {
    id: "jupiter",
    name: "Jupiter",
    size: 100,
    image:
      "https://cdn.pixabay.com/photo/2012/04/10/23/02/jupiter-26860_1280.png",
    details: "Jupiter — Largest gas giant with massive storms."
  },
  {
    id: "saturn",
    name: "Saturn",
    size: 120,
    image:
      "https://cdn.pixabay.com/photo/2013/07/12/17/58/saturn-152912_1280.png",
    details: "Saturn — Known for its iconic rings."
  },
  {
    id: "neptune",
    name: "Neptune",
    size: 80,
    image:
      "https://cdn.pixabay.com/photo/2012/04/10/23/02/neptune-26858_1280.png",
    details: "Neptune — Fastest winds in the solar system."
  }
];

export default function App() {
  const [activePlanet, setActivePlanet] = useState<string | null>(null);
  const [ufoPos, setUfoPos] = useState({ x: 0, y: 0 });

  // Track mouse for UFO movement
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setUfoPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      {/* GLOBAL CSS */}
      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #020617;
          color: #e5edff;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .space-root {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }

        /* STARFIELD BACKGROUND */
        .stars {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(2px 2px at 20% 30%, rgba(155,175,255,.9) 0, transparent 50%),
            radial-gradient(2px 2px at 70% 60%, rgba(255,255,255,.8) 0, transparent 50%),
            radial-gradient(2px 2px at 10% 80%, rgba(120,200,255,.9) 0, transparent 50%);
          opacity: 0.3;
          animation: drift 90s linear infinite;
        }

        @keyframes drift {
          from { transform: translate(0,0); }
          to { transform: translate(-300px, -200px); }
        }

        /* SOLAR SYSTEM */
        .space-map {
          position: absolute;
          inset: 0;
          width: 100vw;
          height: 100vh;
        }

        .orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 1px dashed rgba(255,255,255,0.15);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: rotate 25s linear infinite;
        }

        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .planet {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(100px, -50%);
          cursor: pointer;
        }

        .planet img {
          display: block;
          user-select: none;
          pointer-events: none;
        }

        /* UFO */
        .ufo {
          position: fixed;
          width: 70px;
          height: 70px;
          transform: translate(-50%, -50%);
          pointer-events: none;
          transition: transform 0.1s linear;
        }

        .hud {
          position: absolute;
          top: 15px;
          left: 20px;
          font-size: 20px;
        }

        /* MODAL */
        .modal-bg {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-card {
          background: #0f172a;
          padding: 20px;
          border-radius: 12px;
          width: 360px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .close-btn {
          margin-top: 15px;
          padding: 10px;
          cursor: pointer;
          background: #1e293b;
          border: 1px solid #334155;
          color: white;
          border-radius: 8px;
          text-align: center;
        }
      `}</style>

      <div className="space-root">
        <div className="stars"></div>

        {/* UFO FOLLOWING MOUSE */}
        <img
          className="ufo"
          src="https://cdn-icons-png.flaticon.com/512/860/860763.png"
          style={{ left: ufoPos.x, top: ufoPos.y }}
        />

        {/* HEADER */}
        <header className="hud">
          <h1>SaiVerse — Sai Kiran Patwari</h1>
          <p>Fly the UFO and click on planets to explore my universe.</p>
        </header>

        <div className="space-map">
          {planetData.map((p, index) => {
            const orbitSize = 200 + index * 120;
            return (
              <React.Fragment key={p.id}>
                {/* ORBIT */}
                <div
                  className="orbit"
                  style={{
                    width: orbitSize,
                    height: orbitSize,
                    animationDuration: `${20 + index * 6}s`
                  }}
                />

                {/* PLANET */}
                <div
                  className="planet"
                  style={{
                    transform: `translate(${orbitSize / 2}px, -50%)`
                  }}
                  onClick={() => setActivePlanet(p.id)}
                >
                  <img
                    src={p.image}
                    width={p.size}
                    height={p.size}
                    alt={p.name}
                  />
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* MODAL */}
        {activePlanet && (
          <div className="modal-bg" onClick={() => setActivePlanet(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <h2>{planetData.find((p) => p.id === activePlanet)?.name}</h2>
              <p>{planetData.find((p) => p.id === activePlanet)?.details}</p>

              <div className="close-btn" onClick={() => setActivePlanet(null)}>
                Close
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
