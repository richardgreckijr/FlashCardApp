import { React, useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { createCard, readDeck } from '../utils/api/index';
import CardForm from './CardForm';

function AddCard() {
    const history = useHistory();
    const [deck, setDeck] = useState([]);
    const params = useParams();
    const deckId = params.deckId;
    
    const intialCardState = {
        Front: '',
        Back: '',
    };
    const [formData, setFormData] = useState({...intialCardState});
    
    const handleChange = ({target}) => {
        const value = target.value;
        setFormData({...formData, [target.name]: value });
    };

    useEffect(() => {
        async function loadData() {
           try {
            const response = await readDeck(deckId);
            setDeck(response);  
           } catch (error) {
               if (error.name === 'AbortError'){
                   console.log('Aborted');
               } else {
                   throw error;
               }  
           }
        }
        loadData();
    }, [deckId]);

    const handleSubmit = (event) => {
        let response = [];
        event.preventDefault();
        async function updateForm () {
            try {
                const response = await createCard(deckId, formData);
                setFormData(intialCardState)
            } catch (error) {
                if(error.name === 'AbortError'){
                    console.log('Aborted');
                } else {
                    throw error;
                }
            }
        }
        updateForm();
        history.push(`/decks/${deckId}`);

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
        <br />
            <h1>{deck.name} Create Card</h1>
            <form className='form col-12' onSubmit={handleSubmit}>
                <CardForm formData={formData} handleChange={handleChange} />
                <Link to="/" className="btn btn-secondary">Cancel</Link>
                <button className="btn btn-primary m-4" onClick={handleSubmit}>Save</button>
            </form>
        </div>
        );
}

export default AddCard;
