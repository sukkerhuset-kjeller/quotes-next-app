const Header = () => {
    return (
        <div className="header">
            <h1>Sukkerhuset Sitater</h1>

            <style jsx>{`
                .header {
                    position: fixed;
                    padding: 1rem;
                    width: 100%;
                    max-width: 500px;
                    background: #ffffff;
                    color: #000000;
                    z-index: 1;
                    box-shadow: 0px 1px 2px 0px #0000001a;
                }

                h1 {
                    font-size: 1.625rem;
                    font-weight: 800;
                    text-align: center;
                    margin: 0;
                }
            `}</style>
        </div>
    );
};

export default Header;
