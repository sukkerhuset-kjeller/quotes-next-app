const Header = () => {
  return (
    <div className="header">
      <h1>Sukkerhuset sitater</h1>

      <style jsx>{`
        .header {
          position: fixed;
          padding: 2rem 3rem 2rem 3rem;
          width: 100%;
          max-width: 500px;
          background: #ffffff;
          color: #000000;
          border-radius: 0 0 0 80px;
          z-index: 1;
        }

        h1 {
          font-size: 1.625rem;
          font-weight: 800;
        }
      `}</style>
    </div>
  );
};

export default Header;
