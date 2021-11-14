import React from 'react';
import { Link } from 'react-router-dom';
import NewDeck from '../New/NewDeck';

function HomePage() {
    return (
        <Link to='/decks/new' className='btn btn-secondary'>Create Deck</Link>
    );

}

export default HomePage;