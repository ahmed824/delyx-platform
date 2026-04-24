import WebsiteLayout from "@/components/WebsiteLayout";

export default function Contact() {
  return (
    <WebsiteLayout>
    <main>
      <section>
        <div className="background__contanctUs animate-bg">
          <div className="overlay ">
            <div className="container">
              <div className="overlay__text">
                <h2 className="animate-text">Contact Us</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="detelis">
          <div className="container contactUs ">
            <div className="detelis__content animate-text">
              <h1>Get in Touch With Us</h1>
              <p>Reach out to our team and we’ll respond as quickly as possible. Whether it’s a business inquiry, technical support, or general feedback, we’d love to hear from you.</p>
              <ul>
                <li><i className="fa-solid fa-envelope"></i> contact@delyx.com</li>
                <li><i className="fa-solid fa-location-dot"></i> Cairo, Egypt</li>
                <li><i className="fa-solid fa-phone"></i> +20 XXX XXX XXXX</li>
              </ul>
            </div>

            <div className="contactUs-form animate-form-contactUs">
              <form action="" method="post">
                <div className="input__group">
                  <div className="flex-column">
                    <label>Full Name</label>
                    <div className="inputForm">
                      <input placeholder="Enter your Full Name" className="input" type="text" autoFocus />
                    </div>
                  </div>

                  <div className="flex-column">
                    <label>Email</label>
                    <div className="inputForm">
                      <input placeholder="Enter Your Email " className="input" type="text" />
                    </div>
                  </div>

                  <div className="flex-column">
                    <label>Phone number </label>
                    <div className="inputForm">
                      <input placeholder="Enter your Phone number" className="input password-input" type="text" />
                    </div>
                  </div>

                  <div className="flex-column">
                    <label>Message </label>
                    <div className="inputForm text">
                      <textarea placeholder="Enter your Message" className="input text-input"></textarea>
                    </div>
                  </div>

                  <button className="button-submit type1">
                    <span className="btn-txt">Send Message</span>
                  </button>            
                </div>
              </form>
            </div>
          </div> 
        </div>       
      </section>
    </main>
    </WebsiteLayout>
  );
}
