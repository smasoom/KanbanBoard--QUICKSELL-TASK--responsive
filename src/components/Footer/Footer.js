import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h6 className="footer-text">All rights reserved &copy; Masoom with ❤️</h6>
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/masoom-sahu-09a469230/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100065692891679"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.github.com/smasoom"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}
