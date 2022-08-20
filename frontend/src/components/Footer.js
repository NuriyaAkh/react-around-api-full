import React from "react";
export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© {new Date().getFullYear() } Around The U.S.</p>
    </footer>
  );
}
