import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        © 2025 News Explorer · Created by Rubi Rios
      </p>

      <nav className="footer__nav">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          GitHub
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
