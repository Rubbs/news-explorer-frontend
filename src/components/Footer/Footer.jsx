import "./Footer.css";
import githubIcon from "../../assets/githubicon.png";
import linkedinIcon from "../../assets/union.png";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        © 2025 News Explorer · Created by Rubi Rios
      </p>

      <nav className="footer__nav">
        <div className="footer__links">
          <a href="/" className="footer__link">
            Home
          </a>
          <a
            href="https://tripleten.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            TripleTen
          </a>
        </div>

        <div className="footer__icons">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubIcon} alt="GitHub" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
