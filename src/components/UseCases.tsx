export default function UseCases() {
  const useCases = [
    {
      icon: "fa-graduation-cap",
      title: "Campus Delivery",
      description: "Securely deliver packages, documents, and supplies across large university campuses without traffic congestion."
    },
    {
      icon: "fa-hospital",
      title: "Healthcare Facilities",
      description: "Speed up medical supply delivery within hospitals, ensuring critical items reach destinations faster and safely."
    },
    {
      icon: "fa-building",
      title: "Corporate Compounds",
      description: "Automate inter-office delivery in business parks and large corporate facilities with precision routing."
    },
    {
      icon: "fa-store",
      title: "Retail & Logistics",
      description: "Enable point-to-point delivery in controlled environments like warehouses and retail complexes."
    },
    {
      icon: "fa-utensils",
      title: "Food Service",
      description: "Deliver meals and food orders within restaurants, hotels, and hospitality venues without contact."
    },
    {
      icon: "fa-city",
      title: "Smart Communities",
      description: "Support autonomous last-mile delivery in gated communities and controlled residential areas."
    }
  ];

  return (
    <section>
      <div className="usecases-section">
        <div className="container">
          <div className="section-title">
            <h2>Real-World Use Cases</h2>
            <p>Transforming delivery across industries with intelligent automation</p>
          </div>

          <div className="usecases-grid">
            {useCases.map((usecase, index) => (
              <div key={index} className="usecase-card">
                <div className="usecase-icon">
                  <i className={`fa-solid ${usecase.icon}`}></i>
                </div>
                <h3>{usecase.title}</h3>
                <p>{usecase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
