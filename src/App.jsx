import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  ChevronRight,
  CircleDot,
  Crosshair,
  Gauge,
  Globe2,
  Home,
  Map,
  Menu,
  Rocket,
  Search,
  Shield,
  Sparkles,
  Target,
  Telescope,
  X,
  Zap,
} from 'lucide-react'

const PLANETS = [
  {
    id: 'aurelia',
    name: 'Aurelia',
    type: 'Ocean World',
    distance: '2.8 AU',
    temp: '18°C',
    habitability: 82,
    color: '#54d9ff',
    accent: '#1476ff',
    description:
      'A luminous ocean world wrapped in silver cloud belts. Its shallow seas reflect the blue-white light of a nearby binary star.',
    facts: ['72% ocean coverage', '2 moons', 'Nitrogen-rich atmosphere'],
  },
  {
    id: 'nyx',
    name: 'Nyx',
    type: 'Volcanic Planet',
    distance: '4.1 AU',
    temp: '612°C',
    habitability: 11,
    color: '#ff7c61',
    accent: '#ff3b30',
    description:
      'A young volcanic planet with vast lava plains and an unusually active magnetosphere. Long-range scans detect rare mineral deposits.',
    facts: ['Active volcanoes', 'High radiation', 'Titanium deposits'],
  },
  {
    id: 'elysium',
    name: 'Elysium',
    type: 'Habitable Candidate',
    distance: '5.7 AU',
    temp: '7°C',
    habitability: 94,
    color: '#7cffc4',
    accent: '#18c989',
    description:
      'The expedition fleet’s primary terraforming candidate. Its atmosphere, water cycle and surface chemistry closely match Earth-like models.',
    facts: ['Liquid water', 'Oxygen traces', 'Stable climate'],
  },
  {
    id: 'vanta',
    name: 'Vanta',
    type: 'Ice Giant',
    distance: '8.9 AU',
    temp: '-184°C',
    habitability: 34,
    color: '#a889ff',
    accent: '#684cff',
    description:
      'A deep-blue ice giant surrounded by a fractured ring system. Its gravity well hides signals from an unidentified source.',
    facts: ['14 rings', 'Strong gravity', 'Unknown signal'],
  },
]

const MISSIONS = [
  { title: 'Scan the Aurelia Basin', reward: '+180 XP', status: 'Ready', icon: Search },
  { title: 'Chart Elysium North Pole', reward: '+260 XP', status: 'Locked', icon: Map },
  { title: 'Investigate Vanta Signal', reward: '+420 XP', status: 'Locked', icon: Target },
]

function Starfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: 85 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        top: `${(i * 67) % 100}%`,
        size: `${1 + ((i * 13) % 3)}px`,
        delay: `${(i * 19) % 6}s`,
        duration: `${4 + ((i * 17) % 6)}s`,
      })),
    [],
  )

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((star, index) => (
        <i
          key={index}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
      <div className="nebula nebula-one" />
      <div className="nebula nebula-two" />
    </div>
  )
}

function PlanetVisual({ planet, compact = false }) {
  return (
    <div className={`planet-wrap ${compact ? 'compact' : ''}`}>
      <div
        className="planet-glow"
        style={{ background: `radial-gradient(circle, ${planet.color}44 0%, transparent 68%)` }}
      />
      <div
        className="planet"
        style={{
          background: `radial-gradient(circle at 32% 28%, #fff8 0%, ${planet.color} 10%, ${planet.accent} 62%, #050816 100%)`,
          boxShadow: `inset -28px -24px 55px #02030b, 0 0 45px ${planet.color}35`,
        }}
      >
        <span className="planet-crater crater-one" />
        <span className="planet-crater crater-two" />
        <span className="planet-crater crater-three" />
      </div>
      <div className="planet-orbit" />
      {!compact && <div className="planet-moon" />}
    </div>
  )
}

function App() {
  const [activePlanet, setActivePlanet] = useState(PLANETS[0])
  const [fuel, setFuel] = useState(76)
  const [hull, setHull] = useState(92)
  const [xp, setXp] = useState(1240)
  const [toast, setToast] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 2400)
    return () => clearTimeout(timer)
  }, [toast])

  const travel = () => {
    if (fuel < 18) {
      setToast('Insufficient fuel. Refuel at the next station.')
      return
    }
    setFuel((value) => value - 18)
    setXp((value) => value + 40)
    setToast(`Warp jump complete — ${activePlanet.name} reached`)
  }

  const scan = () => {
    setXp((value) => value + 90)
    setHull((value) => Math.max(0, value - 2))
    setToast(`Deep scan complete — ${activePlanet.name} data uploaded`)
  }

  const refuel = () => {
    setFuel(100)
    setToast('Fuel reserves restored to 100%')
  }

  return (
    <div className="app-shell">
      <Starfield />

      <header className="topbar">
        <div className="brand">
          <div className="brand-mark"><Rocket size={18} /></div>
          <div>
            <strong>STELLAR FRONTIER</strong>
            <span>EXPLORATION COMMAND</span>
          </div>
        </div>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <button className="active" onClick={() => setMenuOpen(false)}><Home size={15} /> Dashboard</button>
          <button onClick={() => { setShowMap(true); setMenuOpen(false) }}><Map size={15} /> Star Map</button>
          <button onClick={() => { setToast('Mission archive synchronized'); setMenuOpen(false) }}><Telescope size={15} /> Discoveries</button>
        </nav>

        <div className="top-status">
          <span className="status-dot" /> ONLINE
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <main className="dashboard">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={14} /> DEEP SPACE EXPEDITION · 07</div>
            <h1>Explore beyond<br /><em>the known.</em></h1>
            <p>
              Navigate uncharted systems, discover alien worlds, and build your
              own record of the frontier.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={travel}>
                <Zap size={17} /> Travel to {activePlanet.name}
              </button>
              <button className="ghost-button" onClick={() => setShowMap(true)}>
                Open star map <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          <div className="hero-orbit">
            <div className="sun" />
            <div className="orbit orbit-a"><div className="orbit-body body-a" /></div>
            <div className="orbit orbit-b"><div className="orbit-body body-b" /></div>
            <div className="orbit orbit-c"><div className="orbit-body body-c" /></div>
            <div className="orbit orbit-d"><div className="orbit-body body-d" /></div>
          </div>
        </section>

        <section className="hud-grid">
          <div className="panel ship-panel">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">COMMAND VESSEL</span>
                <h2>ISS Pathfinder</h2>
              </div>
              <span className="chip"><CircleDot size={11} /> EXPLORER</span>
            </div>

            <div className="ship-visual">
              <div className="ship">
                <div className="ship-core" />
                <div className="ship-wing left" />
                <div className="ship-wing right" />
                <div className="ship-engine" />
              </div>
              <div className="ship-scanline" />
            </div>

            <div className="meters">
              <Meter label="Fuel reserves" value={fuel} icon={<Gauge size={14} />} />
              <Meter label="Hull integrity" value={hull} icon={<Shield size={14} />} />
              <Meter label="Warp charge" value={63} icon={<Zap size={14} />} />
            </div>

            <button className="refuel-button" onClick={refuel}>REFUEL AT STATION</button>
          </div>

          <div className="panel planet-panel">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">CURRENT TARGET</span>
                <h2>{activePlanet.name}</h2>
              </div>
              <div className="coordinates"><Crosshair size={13} /> {activePlanet.distance}</div>
            </div>

            <div className="planet-stage">
              <PlanetVisual planet={activePlanet} />
              <div className="planet-label">
                <span>{activePlanet.type}</span>
                <strong>{activePlanet.temp}</strong>
              </div>
            </div>

            <p className="planet-description">{activePlanet.description}</p>

            <div className="fact-row">
              {activePlanet.facts.map((fact) => <span key={fact}>{fact}</span>)}
            </div>

            <button className="scan-button" onClick={scan}>
              <Search size={15} /> Run deep-space scan
            </button>
          </div>

          <div className="panel mission-panel">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">ACTIVE OBJECTIVES</span>
                <h2>Mission Log</h2>
              </div>
              <span className="xp">LVL 08 · {xp.toLocaleString()} XP</span>
            </div>

            <div className="mission-list">
              {MISSIONS.map((mission, index) => {
                const Icon = mission.icon
                const ready = mission.status === 'Ready'
                return (
                  <button
                    key={mission.title}
                    className={`mission ${ready ? 'ready' : ''}`}
                    onClick={() => ready ? scan() : setToast('Complete the previous objective first')}
                  >
                    <div className="mission-icon"><Icon size={17} /></div>
                    <div className="mission-info">
                      <strong>{mission.title}</strong>
                      <span>{mission.reward} · {mission.status}</span>
                    </div>
                    <ChevronRight size={17} />
                  </button>
                )
              })}
            </div>

            <div className="progress-block">
              <div><span>SECTOR 04 PROGRESS</span><strong>68%</strong></div>
              <div className="progress"><span style={{ width: '68%' }} /></div>
            </div>
          </div>
        </section>

        <section className="discoveries">
          <div className="section-title">
            <div>
              <span className="section-kicker">KNOWN SYSTEMS</span>
              <h2>Planetary Atlas</h2>
            </div>
            <span>{PLANETS.length} worlds catalogued</span>
          </div>

          <div className="planet-grid">
            {PLANETS.map((planet) => (
              <button
                className={`planet-card ${activePlanet.id === planet.id ? 'selected' : ''}`}
                key={planet.id}
                onClick={() => setActivePlanet(planet)}
              >
                <PlanetVisual planet={planet} compact />
                <div className="planet-card-copy">
                  <div>
                    <span>{planet.type}</span>
                    <h3>{planet.name}</h3>
                  </div>
                  <div className="habitability">
                    <span>HABITABILITY</span>
                    <strong>{planet.habitability}%</strong>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <span>© 2187 STELLAR FRONTIER COMMAND</span>
        <span><Activity size={13} /> ALL SYSTEMS NOMINAL</span>
      </footer>

      {showMap && (
        <div className="modal-backdrop" onClick={() => setShowMap(false)}>
          <div className="map-modal" onClick={(event) => event.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowMap(false)}><X size={19} /></button>
            <span className="section-kicker">NAVIGATION ARRAY</span>
            <h2>Sector 04 — Star Map</h2>
            <div className="map-canvas">
              <div className="map-star star-main" />
              {PLANETS.map((planet, index) => (
                <button
                  key={planet.id}
                  className={`map-node node-${index}`}
                  onClick={() => { setActivePlanet(planet); setShowMap(false) }}
                  title={planet.name}
                >
                  <span />
                  {planet.name}
                </button>
              ))}
              <div className="map-route route-one" />
              <div className="map-route route-two" />
            </div>
            <p>Select a world to set it as your active navigation target.</p>
          </div>
        </div>
      )}

      {toast && <div className="toast"><Sparkles size={15} /> {toast}</div>}
    </div>
  )
}

function Meter({ label, value, icon }) {
  return (
    <div className="meter">
      <div className="meter-top"><span>{icon}{label}</span><strong>{value}%</strong></div>
      <div className="meter-track"><span style={{ width: `${value}%` }} /></div>
    </div>
  )
}

export default App
