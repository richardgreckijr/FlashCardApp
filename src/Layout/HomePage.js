import React from 'react';
import { Link } from 'react-router-dom';
import DecklistComponent from './ListDecks';


function HomePage() {
    return (
        <div className="container">
            <Link to='/decks/new' className='d-block btn btn-secondary'>Create Deck</Link>
            <br />
            <DecklistComponent />
        </div>
    );

}

export default HomePage;