const Footer = () => {
  return (
    <footer className="bg-base-100 text-center text-sm text-gray-500 py-3 mt-8">
      <div className="divider">
        © {new Date().getFullYear()} SMJ Register. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
