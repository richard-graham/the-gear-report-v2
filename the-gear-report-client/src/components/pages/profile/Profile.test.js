import Profile from './Profile'
import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

test('Profile works', () => {
  expect(
    shallow(
      <Provider store={store}>
        <Profile />
      </Provider>
    ).exists()
    ).toBe(true)
})