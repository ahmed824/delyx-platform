export default function Stats() {
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
          
          <div className="stats-grid">
            <div className="card orange">
              <div className="title__icon">
                <h4>Active Locations</h4>
                <i className="fa-solid fa-globe"></i>
              </div>
              <h2>120+</h2>
              <p>Campuses, hospitals & smart communities</p>
            </div>

            <div className="card purple-light">
              <div className="title__icon">
                <h4>Deliveries Completed</h4>
                <i className="fa-solid fa-map-location-dot"></i>
              </div>
              <h2>35.5K+</h2>
              <p>Secure autonomous deliveries</p>
            </div>

            <div className="card purple-dark">
              <div className="title__icon">
                <h4>Robots Deployed</h4>
                <i className="fa-brands fa-shopify"></i>
              </div>
              <h2>48K</h2>
              <p>Safely navigated in real environments</p>
            </div>

            <div className="card green">
              <div className="title__icon">
                <h4>System Accuracy</h4>
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h2>99.8%</h2>
              <p>Successful point-to-point deliveries</p>
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
