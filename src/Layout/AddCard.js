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
            <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">
           {" "}Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Add Card</li>
            </ol>
        </nav>
        <br />
            <h1>{deck.name}</h1>
            <form className='form col-12' onSubmit={handleSubmit}>
                <CardForm formData={formData} handleChange={handleChange} />
                <Link to="/" className="btn btn-secondary">Cancel</Link>
                <button className="btn btn-primary m-4" onClick={handleSubmit}>Add Card</button>
            </form>
        </div>
        );
}

export default AddCard;
