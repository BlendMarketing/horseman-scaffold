/* eslint-disable no-unused-expressions */
import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';

injectGlobal`
  ${styledNormalize}

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

const theme = {
};

export default theme;
