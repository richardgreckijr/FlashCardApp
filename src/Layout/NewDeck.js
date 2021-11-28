import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from '../utils/api/index.js';
import DeckForm from './DeckForm';

function NewDeck(){
    const intialFormState = {
        name: '',
        description: '',
    };
    const history = useHistory();
    const [formData, setFormData] = useState({...intialFormState});

    const handleChange = ({target}) => {
        const value = target.value;
        setFormData({...formData, [target.name]: value});
    };

    const handleSubmit = (event) => {
        
        event.preventDefault();
        async function updateForm () {
            try {
              const response = await createDeck(formData);
              history.push(`/decks/${response.id}`);
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
    <div className="col-12 justify-content-center">
    <nav className="justify-content-center" aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item" 
                key='0'>
                <Link to="/">
                {" "}Home
                </Link>
            </li>
            <li className="breadcrumb-item active" 
                aria-current="page"
                key='1'
                >Create Deck
            </li>
        </ol>
    </nav>
        <h1>Create Deck</h1>

            <DeckForm name={formData.name} description={formData.description} handleSubmit={handleSubmit} handleChange={handleChange} />

    </div>
    );
}

export default NewDeck;