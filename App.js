import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import AppNavigator from "./navigator/AppNavigator";

const initialState = {
  action: "",
  name: "Vlad"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLOSE_MENU":
      return { ...state, action: "closeMenu" };
    case "OPEN_MENU":
      return { ...state, action: "openMenu" };
    case "UPDATE_NAME":
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
