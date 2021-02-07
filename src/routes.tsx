import * as React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Header from "./components/Header"
import IndexPage from "./pages/Index"

const Routes: React.FunctionComponent = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={IndexPage} />
      <Route component={() => <div>Not Found</div>} />
    </Switch>
  </BrowserRouter>
)

export default Routes
