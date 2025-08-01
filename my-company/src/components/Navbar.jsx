import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <header>
            <nav>
                <ul style={{ backgroundColor: 'transparent', display: 'flex', listStyleType: 'none', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/services">Services</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">Contact</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
