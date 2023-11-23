import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarWrapper = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  padding: 0.5rem 1rem 0;

  .nav-link {
    padding: 0.25rem 0.5rem;
  }
`;

const Navbar = () => {
  return (
    <NavbarWrapper>
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="about-me">
        About Me
      </Link>
    </NavbarWrapper>
  );
};

export default Navbar;
