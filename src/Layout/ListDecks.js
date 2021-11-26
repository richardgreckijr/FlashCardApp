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
          <div className="card" 
               key='0'>
          <div className="container" 
               key='1'>
            <div className="row card-header" 
                 key='2'>
              <div className="col-10" 
                   key='3'>
              <h4  key='4'>{deck.name}</h4>
              
              </div>
              <div key='5'>
                <p key='6'> {deck.cards.length} cards</p>
              </div>
            </div>
          </div>
        
        <div className="card-body" 
             key='7'>
          <p className="card-text" 
             key='8'>{deck.description}</p>
          <div 
          key='9'>
            <div className="container" 
                 key='9'>
            <div className="d-md-block btn-group align-center" 
                 key='10'>

                <Link 
                to={`decks/${deck.id}`} 
                className="btn btn-secondary" 
                key='11'>View
                </Link> 

                <Link 
                to={`decks/${deck.id}/study`} 
                className="btn btn-primary"
                key='12'>Study
                </Link>

                <button 
                className="btn btn-danger " 
                value={deck.id} 
                onClick={handleDeleteDecks}
                key='13'
                >Delete
                </button>
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