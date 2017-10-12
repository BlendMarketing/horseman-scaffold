/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const testsContext = require.context("../", true, /spec.jsx?$/);
testsContext.keys().forEach(testsContext);
