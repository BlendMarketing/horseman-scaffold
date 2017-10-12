/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */
import { expect } from "chai";

export default (wrapper, props) => {
  Object.keys(props).forEach(key => {
    expect(wrapper.props()[key]).to.equal(props[key]);
  });
};
