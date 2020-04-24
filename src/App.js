
import React from "react"
import Index from "./pages/Index/Index"
import { Switch, Route, Redirect } from "react-router-dom"


function App() {
  return (
    <div>
      <Switch>
        <Route path="/index" component={Index}></Route>
        <Redirect to="/index"></Redirect>
      </Switch>
    </div>
  )
}
export default App;
