export default function ServiceCards() {
  const services = [
    {
      icon: "fa-box",
      title: "Smart Delivery Service",
      description: "End-to-end autonomous delivery solution with real-time tracking, secure containers, and verified delivery confirmation."
    },
    {
      icon: "fa-mobile",
      title: "Real-time Monitoring",
      description: "Live dashboard access with GPS tracking, camera feeds, sensor data, and instant alerts for delivery status."
    },
    {
      icon: "fa-network-wired",
      title: "Fleet Management",
      description: "Manage multiple robots across locations with centralized command, scheduling, and performance analytics."
    },
    {
      icon: "fa-chart-line",
      title: "AI Analytics",
      description: "Data-driven insights on delivery patterns, efficiency metrics, cost analysis, and optimization recommendations."
    }
  ];

  return (
    <section>
      <div className="services-cards-section">
        <div className="container">
          <div className="section-title">
            <h2>Our Service Offerings</h2>
            <p>Comprehensive solutions for autonomous delivery and fleet management</p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">
                  <i className={`fa-solid ${service.icon}`}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
