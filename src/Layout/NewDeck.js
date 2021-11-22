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
        let response = [];
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
        <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="/">
        <svg xmlns="http://www.w3.org/2000/svg" 
        width="14" height="14" 
        fill="currentColor" 
        class="bi bi-house-door-fill" 
        viewBox="0 0 16 16">
        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 
        .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 
        0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
        </svg>{" "}Home</Link></li>
        <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
    </nav>
        <h1>Create Deck</h1>
        <form className='form col-12' onSubmit={handleSubmit}>
            <DeckForm formData={formData} handleChange={handleChange} />
            <Link to="/" className="btn btn-secondary">Cancel</Link>
            <button className="btn btn-primary m-4" type='submit'>Submit</button>
        </form>
    </div>
    );
}

export default NewDeck;