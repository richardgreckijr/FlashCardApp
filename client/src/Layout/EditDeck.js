import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api/index';
import DeckForm from './DeckForm';

function EditDeck() {
    const intialFormState = {
        name: '',
        description: '',
    };
    const [formData, setFormData] = useState({...intialFormState});
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState({});
    const params = useParams();
    const history = useHistory();
    const deckId = params.deckId;

    useEffect(() => {
        setCards({});

        async function loadData() {
            try {
            const response = await readDeck(deckId);
            setDeck(response); 
            
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

    const handleChange = ({target}) => {
        const value = target.value;
        setDeck({...deck, [target.name]: value});
    };

    const handleSubmit = (event) => {
        let response = [];
        event.preventDefault();
        async function updateForm () {
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
            <form className='form col-12' onSubmit={handleSubmit}>
            <DeckForm formData={deck} handleChange={handleChange} />
            <Link to="/" className="btn btn-secondary">Cancel</Link>
            <button className="btn btn-primary m-4" type='submit'>Submit</button>
        </form>
        </div>
    )
}

export default EditDeck
