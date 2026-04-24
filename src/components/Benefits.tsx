export default function Benefits() {
  const benefits = [
    {
      icon: "fa-rocket",
      title: "Speed & Efficiency",
      description: "Deliver faster than traditional methods with optimized routes and 24/7 operation capability."
    },
    {
      icon: "fa-coins",
      title: "Cost Reduction",
      description: "Lower operational costs through automation, reduced labor dependency, and fuel elimination."
    },
    {
      icon: "fa-gears",
      title: "Automation at Scale",
      description: "Automate hundreds of daily deliveries with predictable, reliable performance and minimal supervision."
    },
    {
      icon: "fa-leaf",
      title: "Eco-Friendly",
      description: "Zero emissions with battery-powered robots, supporting sustainability and environmental goals."
    },
    {
      icon: "fa-shield",
      title: "Enhanced Safety",
      description: "Reduced traffic congestion and human-robot collisions through intelligent navigation and awareness."
    },
    {
      icon: "fa-chart-column",
      title: "Data-Driven Insights",
      description: "Gain valuable analytics on delivery patterns, efficiency trends, and optimization opportunities."
    }
  ];

  return (
    <section>
      <div className="benefits-section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose DELY X Services?</h2>
            <p>Transform your delivery operations with proven benefits</p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">
                  <i className={`fa-solid ${benefit.icon}`}></i>
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
