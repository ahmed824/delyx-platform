import Link from 'next/link';
import WebsiteLayout from '@/components/WebsiteLayout';

export default function Login() {
  return (
    <WebsiteLayout>
    <main>
      <section style={{ minHeight: '100vh', display: 'flex' }}>
        <div className="container__login">
          <div className="img__login">
            <div className="img-wrapper login animate-image-login">
              <div className="wrapper__text">
                <h1>Hey! Welcome Back</h1>
                <p>Monitor and manage autonomous deliveries in real time</p>
              </div>
            </div>
          </div>
          <div className="form login animate-form-login">
            <form className="form">
              <div className="flex-column">
                <label>Email or Phone number </label>
                <div className="inputForm">
                  <input placeholder="Enter your Email Or Phone Number" className="input" type="text" />
                </div>
              </div>

              <div className="flex-column">
                <label>Password </label>
                <div className="inputForm">
                  <input placeholder="Enter your Password" className="input" type="password" />
                  <i className="fa-solid fa-eye"></i>
                </div>
              </div>

              <div className="flex-row">
                <div>
                  <input type="radio" />
                  <label>Remember me </label>
                </div>
                <span className="span">Forgot password?</span>
              </div>

              <button className="button-submit type1">
                <span className="btn-txt">Log In</span>
              </button>
              <p className="p">New to DELY X ?<Link href="/register"><span className="span">Create Account</span></Link></p>
            </form>
          </div>
        </div>
      </section>
    </main>
    </WebsiteLayout>
  );
}
