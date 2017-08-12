import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import { ThemeProvider } from 'styled-components';

import theme from 'themes/main';
/**
 * Helper method for testing. Allows us to test styled components which utilize
 * the `<ThemeProvider />`
 */
const shallowWithTheme = (children, options) => {
  const wrapper = shallow(<ThemeProvider theme={theme}>{children}</ThemeProvider>, options);
  const instance = wrapper.root.instance();
  return wrapper.shallow({ context: instance.getChildContext() });
};

export default shallowWithTheme;
