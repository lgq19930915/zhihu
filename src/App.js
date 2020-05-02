
import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import asyncComponent from "./util/asyncComponent"
// import Index from "./pages/Index/Index"
// import Detail from "./pages/Detai/Detail"
// import Collection from "./pages/Collection/Collection"
// import Discuss from "./pages/Discuss/Discuss"
// 懒加载
const Index = asyncComponent(() => import("./pages/Index/Index"))
const Detail = asyncComponent(() => import("./pages/Detai/Detail"))
const Collection = asyncComponent(() => import("./pages/Collection/Collection"))
const Discuss = asyncComponent(() => import("./pages/Discuss/Discuss"))



function App() {
  return (
    <div>
      <Switch>
        <Route path="/index" component={Index}></Route>
        <Route path="/detail/:id" component={Detail}></Route>
        <Route path="/collection" component={Collection}></Route>
        <Route path="/discuss" component={Discuss}></Route>
        <Redirect to="/index"></Redirect>
      </Switch>
    </div>
  )
}
export default App;
