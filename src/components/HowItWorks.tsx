export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Order Submission",
      description: "Users request delivery through the web app or mobile interface with package details and destination."
    },
    {
      number: "02",
      title: "Route Planning",
      description: "AI system analyzes traffic, obstacles, and robot availability to plan optimal delivery route."
    },
    {
      number: "03",
      title: "Autonomous Navigation",
      description: "Robot begins autonomous navigation using computer vision, sensors, and real-time decision making."
    },
    {
      number: "04",
      title: "Live Tracking",
      description: "Users receive real-time GPS coordinates, camera feed, and status updates during delivery."
    },
    {
      number: "05",
      title: "Safe Delivery",
      description: "Robot arrives at destination, verifies location, and securely delivers package with confirmation."
    },
    {
      number: "06",
      title: "Data Analytics",
      description: "System logs delivery metrics, generates reports, and optimizes future routes with machine learning."
    }
  ];

  return (
    <section>
      <div className="howitworks-section">
        <div className="container">
          <div className="section-title">
            <h2>How It Works</h2>
            <p>Simple process for intelligent autonomous delivery</p>
          </div>

          <div className="steps-container">
            <div className="steps-grid">
              {steps.map((step, index) => (
                <div key={index} className="step-card">
                  <div className="step-number">{step.number}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  {index < steps.length - 1 && <div className="step-arrow"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
