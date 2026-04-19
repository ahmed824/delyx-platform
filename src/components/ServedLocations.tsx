export default function ServedLocations() {
  return (
    <section>
      <div className="Served">
        <div className="container">
          <div className="Served__content ">
            <div className="served_title">
              <h2>Served Locations</h2>
            </div>
            
            <div className="locations">
              <div className="location__icon">
                <i className="fa-solid fa-road"></i>
                <h3>street</h3>
              </div>

              <div className="location__icon">
                <i className="fa-solid fa-shop"></i>
                <h3>Store</h3>
              </div>

              <div className="location__icon">
                <i className="fa-solid fa-utensils"></i>
                <h3>Resturent</h3>
              </div>

              <div className="location__icon">
                <i className="fa-solid fa-hotel"></i>
                <h3>Hotel</h3>
              </div>

              <div className="location__icon">
                <i className="fa-solid fa-staff-snake"></i>
                <h3>Pharmacy</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
