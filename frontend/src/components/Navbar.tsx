interface NavbarProps {
    theme: string;
    toggleTheme: () => void;
}

function Navbar({ theme, toggleTheme }: NavbarProps) {
    return (
        <nav className={`navbar ${theme === 'light' ? 'navbar-light bg-light' : 'navbar-dark bg-dark'}`}>
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1" style={{ color: 'green' }}>MOVEdigi Video Call</span>
                <button className="btn btn-outline-secondary" onClick={toggleTheme}>
                    {theme === 'light' ? 'Enable Dark Mode' : 'Enable Light Mode'}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;