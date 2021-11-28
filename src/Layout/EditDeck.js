import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api/index';
import DeckForm from './DeckForm';

function EditDeck() {
    const history = useHistory();
    const params = useParams();
    const deckId = params.deckId;
    const [name, setName] = useState('');
    const [deck, setDeck] = useState({});

    useEffect(() => {
        setDeck({})
        async function loadData() {
            try {
            const response = await readDeck(deckId);
            setDeck(response); 
            setName(response.name);
            
            } catch (error) {
            if(error.name === 'AbortError'){
                console.error('Aborted');
                } else {
                throw error;
                }
            }
        }
        loadData();
    }, [deckId]);

    const handleChange = ({ target }) => {
        const value = target.value;
        setDeck({...deck, [target.name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        async function updateForm() {
            try {
              await updateDeck(deck);
              history.push(`/decks/${deckId}`);
            } catch (error) {
                if (error.name === 'AbortError'){
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }
        updateForm();
    }
    return (
        <div>
            <DeckForm 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            name={deck.name} 
            description={deck.description}/>
        </div>
    )
}

export default EditDeck
