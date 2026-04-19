export default function Hero() {
  return (
    <section>
      <div className="home-video-background animate-bg">
        <video autoPlay muted loop playsInline>
          <source src="/videos/DELYX.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay-home animate-overlay">
          <div className="container">
            <div className="overlay__text">
              <h1 className="animate-text">Precision Delivery, Perfected for Intelligent Spaces</h1>
              <p>Secure, real-time, point-to-point delivery using autonomous robots, designed for modern campuses, hospitals, smart compounds, and other controlled environments.</p>
              <div className="btn">
                <a href="/services" className="home__btn">Launch </a>
                <a href="#" className="Explore">Explore Features <i className="fa-solid fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
