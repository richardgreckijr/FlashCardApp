import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { listDecks, deleteDeck } from '../utils/api/index'

const params = useParams();
const deckId = params.deckId;

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
}, [deckId]);

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
          <div className="card" key='0'>
          <div className="container" key='1'>
            <div className="row card-header" key='2'>
              <div className="col-10" key='3'>
              <h4 key='4'>{deck.id}&nbsp;.&nbsp;{deck.name}</h4>
              
              </div>
              <div>
                <p key='5'> {deck.cards.length} cards</p>
              </div>
            </div>
          </div>
        
        <div className="card-body">
          <p className="card-text">{deck.description}</p>
          <div>
            <div className="container">
            <div className="d-md-block btn-group align-center">
                <Link to={`decks/${deck.id}`} className="btn btn-secondary">View</Link> 
                <Link to={`decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
                <button 
                className="btn btn-danger " 
                value={deck.id} 
                onClick={handleDeleteDecks}
                >Delete</button>
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