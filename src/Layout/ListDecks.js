import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { listDecks, deleteDeck } from '../utils/api/index'

function DecklistComponent() {
const [decks, setDecks] = useState([]);

useEffect(() => {
    async function loadDecks() {
        try {
            const response = await listDecks();
            setDecks(response);
        } catch (error) {
            if (error.name === 'AbortError'){
                console.error(error.message);
            } else {
                throw error;
            }
        }
    }
    loadDecks();
}, []);

const handleDeleteDecks = ({target}) => {
const selected = target.value;

const result = window.confirm(`Are you sure you want to delete ${selected}?`);

if (result) {
    async function deleteData(){
        try {
            await deleteDeck(selected);
            const response = await listDecks();
            setDecks(response)
        } catch (error) {
            if (error.name === "AbortError"){
                console.log('Aborted')
            }
            else{
                throw error;
            }
        }
    }
    deleteData();
    }
};
if (decks.length > 0){
      
    return (
      <div>
        {decks.map((deck) =>(
          <div className="card">
          <div className="container">
            <div className="row card-header">
              <div className="col-10">
              <h4>{deck.name}</h4>
              </div>
              <div className="col-2">
                <p> {deck.cards.length} cards</p>
              </div>
            </div>
          </div>
        
        <div className="card-body">
          <p className="card-text">{deck.description}</p>
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-4">
                <Link to={`decks/${deck.id}`} className="btn btn-secondary">View</Link> &nbsp;
                <Link to={`decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
              </div>
              <div className="col-1">
                <button className="btn btn-danger" value={deck.id} onClick={handleDeleteDecks}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
        ))}
        
    </div>
    );
}
return (
    "Please add a deck."
);

        }
export default DecklistComponent;