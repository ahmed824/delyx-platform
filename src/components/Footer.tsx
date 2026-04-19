import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer__padding">
      <div className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="logo">
              <img src="/images/Logo.png" alt="logo footer" />
            </div>
          </div>
          <div className="footer-center">
            <div className="img">
              <img src="/images/footer.png" alt="robot" className="robot" />
            </div>
            <div className="footer-links">
              <div className="col">
                <Link href="#">About</Link>
                <Link href="#">Our Robot</Link>
                <Link href="#">Operation</Link>
              </div>
              <div className="col">
                <Link href="#">Our Solutions</Link>
                <Link href="#">Future Updates</Link>
                <Link href="#">Our Team</Link>
                <Link href="#">Plan</Link>
                <Link href="#">References</Link>
              </div>
              <div className="col">
                <Link href="/contact">Contact Us</Link>
                <Link href="#">Support Center</Link>
                <Link href="#">FAQs</Link>
                <Link href="#">Privacy Policy</Link>
                <Link href="#">Terms & Conditions</Link>
              </div>
            </div>
          </div>
          <div className="footer-down">
            <div className="social">
              <Link href="#"><i className="fa-brands fa-facebook"></i></Link>
              <Link href="#"><i className="fa-brands fa-instagram"></i></Link>
              <Link href="#"><i className="fa-brands fa-x-twitter"></i></Link>
              <Link href="#"><i className="fa-brands fa-youtube"></i></Link>
              <Link href="#"><i className="fa-brands fa-linkedin"></i></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
