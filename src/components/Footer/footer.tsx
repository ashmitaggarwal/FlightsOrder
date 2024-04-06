import './footer.css'
const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        &copy; Transportly {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
