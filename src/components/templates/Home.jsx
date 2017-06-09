import React from 'react';
import styled from 'styled-components';

import Intro from '../molecules/Intro/Intro';

/**
 * This component will be rendered at the '/' url.
 */
const StyledHome = styled.section`
  position: relative;
  overflow: hidden;
  height: 100vh;
  background: #333;
  color: white;
  font-family: 'Open Sans';
`;

const Home = () => (
  <StyledHome>
    <Intro />
  </StyledHome>
);


export default Home;
