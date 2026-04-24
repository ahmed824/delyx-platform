export default function ProductFeatures() {
  const features = [
    {
      icon: "fa-robot",
      title: "Autonomous Navigation",
      description: "Advanced AI-powered navigation system that learns environments and optimizes delivery routes in real-time."
    },
    {
      icon: "fa-traffic-light",
      title: "Traffic Awareness",
      description: "Computer vision and sensor fusion detect obstacles, traffic signals, and pedestrians for safe autonomous operation."
    },
    {
      icon: "fa-eye",
      title: "Real-time Monitoring",
      description: "Live camera feeds, GPS tracking, and telemetry data streamed to the control dashboard with minimal latency."
    },
    {
      icon: "fa-brain",
      title: "AI-based Decision Making",
      description: "Machine learning models process sensor data and make intelligent decisions for dynamic delivery scenarios."
    }
  ];

  return (
    <section>
      <div className="features-section">
        <div className="container">
          <div className="section-title">
            <h2>Intelligent Features Designed for Modern Delivery</h2>
            <p>The DELY X robot combines cutting-edge robotics with AI to deliver smarter, faster, and safer.</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <i className={`fa-solid ${feature.icon}`}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
