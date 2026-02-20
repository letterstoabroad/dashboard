import React from "react";
import Image from "next/image";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer--container">
      <div className="footer--left-section">
        <p className="footer--caption">
          Every university weighs these differently. to understand which
          university truly fits you best.
        </p>
        <div className="footer--cta-row">
          <button className="footer--btn-primary">Book a session</button>
          <button className="footer--btn-secondary">
            <div className="footer--icon-wrapper-whatsapp">
              <Image
                src="/assets/icons/WhatsappIcon.svg"
                alt="WhatsApp"
                width={18}
                height={18}
              />
            </div>
            <span className="footer--btn-text">Chat with a Mentor</span>
          </button>
        </div>
      </div>

      <div className="footer--right-section">
        <div className="footer--brand-group">
          <div className="footer--lta-logo">
            <Image
              src="/assets/icons/LTALogoIcon.svg"
              alt="LTA Logo"
              width={30}
              height={20}
              className="footer--lta-icon"
            />
          </div>
          <div className="footer--social-proof-text">
            Built by people who&apos;ve
            <br />
            lived this journey
          </div>
        </div>

        <div className="footer--social-icons">
          <a href="#" className="footer--social-link" aria-label="LinkedIn">
            <Image
              src="/assets/icons/LinkdlnIcon.svg"
              alt="LinkedIn"
              width={36}
              height={36}
            />
          </a>
          <a href="#" className="footer--social-link" aria-label="Instagram">
            <Image
              src="/assets/icons/InstagramIcon.svg"
              alt="Instagram"
              width={34}
              height={34}
            />
          </a>
          <a href="#" className="footer--social-link" aria-label="YouTube">
            <Image
              src="/assets/icons/YoutubeIcon.svg"
              alt="YouTube"
              width={34}
              height={28}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
