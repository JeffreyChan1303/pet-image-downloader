import styled from 'styled-components';

const StyledListItem = styled.li`
  list-style-type: none;
`;

const About = () => {
  return (
    <div>
      <h1>About Me Page!</h1>
      <h3>Hi! I'm Jeffrey Chan, the creator of this website!</h3>
      <h4>
        I'm a University student studying computer science expected to graduate December 2024.
      </h4>

      <hr />

      <h2>Check me out through these other websites!</h2>
      <ul>
        <StyledListItem>
          Linkedin:{' '}
          <a
            href="https://www.linkedin.com/in/jeffrey-chan-1303/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.linkedin.com/in/jeffrey-chan-1303/
          </a>
        </StyledListItem>
        <StyledListItem>
          Github:{' '}
          <a href="https://github.com/JeffreyChan1303" target="_blank" rel="noopener noreferrer">
            https://github.com/JeffreyChan1303
          </a>
        </StyledListItem>
        <StyledListItem>
          Portfolio:{' '}
          <a href="https://www.jeffreychan.dev/" target="_blank" rel="noopener noreferrer">
            https://www.jeffreychan.dev/
          </a>
        </StyledListItem>
      </ul>
    </div>
  );
};

export default About;
