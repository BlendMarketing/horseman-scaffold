import React from 'react';
import styled from 'styled-components';

const StyledIntro = styled.div`
  position: absolute;
  top: 50%; right: 0; bottom: 0; left: 0;
  transform: translateY(-50%);
  padding: 1em;
  //text-align: center;
  color: #3cf;
  font-family: 'Open Sans';
  > img {
    width: 5em;
  }
`;

const Intro = () => (
  <StyledIntro>
    <img src="http://blendimc.com/design/images/logo.svg" alt="Blend Marketing Logo" />
    <h1>Welcome to Horseman</h1>
  </StyledIntro>
);


export default Intro;
