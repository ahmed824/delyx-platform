"use client";

import { useEffect, useState } from "react";

function useCountUp(target: number, { duration = 1500, decimals = 0 } = {}) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let rafId: number;
    const start = performance.now();
    const from = 0;
    const diff = target - from;
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const current = from + diff * t;
      setValue(Number(current.toFixed(decimals)));
      if (t < 1) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, decimals]);
  return value;
}

function formatCompact(value: number, opts?: { decimals?: number; suffix?: string }) {
  const decimals = opts?.decimals ?? 0;
  if (value >= 1000) {
    const k = value / 1000;
    // show one decimal if >= 1000 and <10000
    const d = k < 10 ? (opts?.decimals ?? 1) : 0;
    return `${Number(k.toFixed(d))}K${opts?.suffix ?? ""}`;
  }
  return `${Number(value.toFixed(decimals))}${opts?.suffix ?? ""}`;
}

export default function Stats() {
  const activeLocations = useCountUp(120, { duration: 900, decimals: 0 });
  const deliveries = useCountUp(35500, { duration: 1400, decimals: 0 });
  const robots = useCountUp(48000, { duration: 1200, decimals: 0 });
  const accuracy = useCountUp(99.8, { duration: 1000, decimals: 1 });

  return (
    <section>
      <div className="stats-section">
        <div className="container">
          <div className="section-title">
            <h2>
              Redefining last-mile delivery through autonomous technology
              that moves faster, safer, and smarter — everywhere.
            </h2>
          </div>

          <div className="stats-container">
            <div className="stats-left">
            <div className="card orange">
              <div className="title__icon">
                <h4>Active Locations</h4>
                <i className="fa-solid fa-globe"></i>
              </div>
              <h2>{formatCompact(activeLocations, { decimals: 0, suffix: "+" })}</h2>
              <p>Campuses, hospitals & smart communities</p>
            </div>

            <div className="card purple-light">
              <div className="title__icon">
                <h4>Deliveries Completed</h4>
                <i className="fa-solid fa-map-location-dot"></i>
              </div>
              <h2>{formatCompact(deliveries, { decimals: 1, suffix: "+" })}</h2>
              <p>Secure autonomous deliveries</p>
            </div>

            <div className="card purple-dark">
              <div className="title__icon">
                <h4>Robots Deployed</h4>
                <i className="fa-brands fa-shopify"></i>
              </div>
              <h2>{formatCompact(robots)}</h2>
              <p>Safely navigated in real environments</p>
            </div>

            <div className="card green">
              <div className="title__icon">
                <h4>System Accuracy</h4>
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h2>{accuracy}%</h2>
              <p>Successful point-to-point deliveries</p>
            </div>
            </div>

            <div className="stats-visual">
              <img src="/images/photo-section2.png" alt="Statistics Visualization" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
