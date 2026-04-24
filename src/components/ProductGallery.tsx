export default function ProductGallery() {
  const gallery = [
    { image: "/images/photo-section2.png", title: "Robot Navigation" },
    { image: "/images/Logo.png", title: "DELY X Brand" },
    { image: "/images/photo-section2.png", title: "Sensor Array" }
  ];

  return (
    <section>
      <div className="gallery-section">
        <div className="container">
          <div className="section-title">
            <h2>Product Gallery</h2>
          </div>

          <div className="gallery-grid">
            {gallery.map((item, index) => (
              <div key={index} className="gallery-item">
                <img src={item.image} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
