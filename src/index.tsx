import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { createStore } from "redux"

import Main from "./main"
import rootReducer from "./redux/reducers/RootReducer"
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from "./theme"

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any
  }
}

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

render(
  <Provider store={store}>
    <FixedGlobalStyle />
    <ThemeProvider>
      <ThemedGlobalStyle />
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
)
