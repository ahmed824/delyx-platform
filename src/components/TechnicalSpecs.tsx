export default function TechnicalSpecs() {
  const specs = [
    { category: "Controller", details: "Raspberry Pi 4B (BCM2711 quad-core ARM)" },
    { category: "Processing Power", details: "4GB RAM, 64-bit CPU @ 1.5GHz" },
    { category: "Camera System", details: "USB 1080p camera with wide-angle lens for navigation" },
    { category: "Ultrasonic Sensors", details: "8x HC-SR04 for obstacle detection and distance measurement" },
    { category: "IMU Sensor", details: "9-axis accelerometer, gyroscope, magnetometer (MPU-9250)" },
    { category: "Connectivity", details: "Wi-Fi 802.11ac, Bluetooth 5.0, optional LTE module" },
    { category: "Power System", details: "Dual 18650 Li-ion batteries, 10+ hour runtime" },
    { category: "Motor Drivers", details: "DC motor drivers (TB6612FNG) with PID-controlled velocity" },
    { category: "Dimensions", details: "450mm L × 350mm W × 200mm H, weight: 3.5kg" },
    { category: "Payload Capacity", details: "Up to 2.5kg secure container for small packages" }
  ];

  return (
    <section>
      <div className="specs-section">
        <div className="container">
          <div className="section-title">
            <h2>Technical Specifications</h2>
            <p>Under the hood: precision engineering meets autonomous intelligence</p>
          </div>

          <div className="specs-container">
            <div className="specs-grid">
              {specs.map((spec, index) => (
                <div key={index} className="spec-item">
                  <h4>{spec.category}</h4>
                  <p>{spec.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
