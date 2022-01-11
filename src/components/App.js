import React, { Component } from 'react';
import '../css/App.css';
import HomeTemplate from "../template/homeTemplate"
import {homeRoutes} from "../routes";
import {BrowserRouter,Switch} from "react-router-dom"

function App()  {

  const renderUserUI=routes=>{
    if(routes && routes.length>0){
      return routes.map((item,index)=>{
        return (
          <HomeTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            Component={item.component}
          />
        )
      })
    }
  }

    return (
      <BrowserRouter>
        <Switch>
          {renderUserUI(homeRoutes)}
        </Switch>
      </BrowserRouter>
    );
}

export default App;
