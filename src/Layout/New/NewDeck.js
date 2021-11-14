import { React, useState, useEffect } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';

function NewDeck(){
    return (
    <div>
        <h1>Create Deck</h1>
        <form>
            <label for="deckname">Name</label>
            <input name = "deckname" type="text" placeholder="Deck Name"></input>
            <label for="desc">Description</label>
            <input name = "desc" type="text" placeholder="Brief Description Of The Deck"></input>
        </form>
    </div>
    );
}

export default NewDeck;