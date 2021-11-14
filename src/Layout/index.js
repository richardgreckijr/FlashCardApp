import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from 'react-router-dom';
import HomePage from "./Home/HomePage";
import NewDeck from "./New/NewDeck"



function Layout() {
  return (
    <>
      <div className="container">
      <Header />
      
      <Switch>
        <Route exact={true} path={'/'}>
          <HomePage />
        </Route>
        <Route path={'/decks/new'}>
          <NewDeck />
        </Route>
        <Route>
        <NotFound />
        </Route>
      </Switch>
    
      </div>
    </>
  );
}

export default Layout;
