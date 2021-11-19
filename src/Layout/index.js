import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from 'react-router-dom';
import HomePage from "./HomePage";
import NewDeck from "./NewDeck";
import Deck from "./ViewDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import StudyDeck from "./StudyDeck";
import EditDeck from "./EditDeck";


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
      
      <Switch>
        <Route exact={true} path={'/'}>
          <HomePage />
        </Route>

        <Route path={'/decks/:deckId/study'}>
          <StudyDeck />
        </Route>

        <Route path={'/decks/new'}>
          <NewDeck />
        </Route>

        <Route path={'/decks/:deckId/cards/:cardId/edit'}>
          <EditCard />
        </Route>

        <Route path={'/decks/:deckId/cards/new'}>
          <AddCard />
        </Route>

      <Route path={'/decks/:deckId/edit'}>
        <EditDeck />
      </Route>


        <Route path={'/decks/:deckId'}>
          <Deck />
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
