import Link from 'next/link';

export default function Register() {
  return (
    <main>
      <section style={{ minHeight: '100vh', display: 'flex' }}>
        <div className="container__register">
          <div className="form register animate-form-register">
            <form className="form">
              <div className="hero"></div>
              <div className="flex-column">
                <label>Full Name</label>
                <div className="inputForm">
                  <input placeholder="Enter your Full Name" className="input" type="text" autoFocus />
                </div>
              </div>
              <div className="flex-column">
                <label>Email or Phone number </label>
                <div className="inputForm">
                  <input placeholder="Enter Your Email Or Phone Number" className="input" type="text" />
                </div>
              </div>

              <div className="flex-column">
                <label>Password </label>
                <div className="inputForm">
                  <input placeholder="Enter your Password" className="input password-input" type="password" />
                  <i className="fa-solid fa-eye toggle-password"></i>
                </div>
              </div>

              <div className="flex-row">
                <div>
                  <input type="radio" />
                  <label>Remember me </label>
                </div>
              </div>

              <button className="button-submit type1">
                <span className="btn-txt">Create Account</span>
              </button>
              <p className="p">Already have an account ? <Link href="/login"><span className="span">sign In</span></Link></p>
            </form>
          </div>
          <div className="img__register animate-image-register">
            <div className="img-wrapper register">
              <div className="wrapper__text ">
                <h1>Welcome !</h1>
                <p>Access secure, real-time autonomous delivery services.</p>
              </div>
            </div>
          </div>
        </div>    
      </section>
    </main>
  );
}
