/* eslint-disable no-unused-expressions */
import { normalize } from "polished";
import { injectGlobal } from "styled-components";

injectGlobal`
  ${normalize()};

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

const baseColors = {};

const theme = {
  colors: {
    ...baseColors,
  },
};

export default theme;
