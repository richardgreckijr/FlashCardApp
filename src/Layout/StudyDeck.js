import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck } from '../utils/api/index';

function StudyDeck() {
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState({});
    const [facing, setFacing] = useState(true);
    const [cardNum, setCardNum] = useState(0);
    const params = useParams();
    const history = useHistory();
    const deckId = params.deckId;

    useEffect(() => {
        setCards({});

        async function loadData() {
            try {

            const response = await readDeck(deckId);
            setDeck(response);
            setCards(response.cards);

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
    

    function handleCardFlip() {
        setFacing(!facing);
    }

    function cardOrder(){
        if (cardNum + 1 < cards.length) {
            setCardNum(cardNum + 1);
            setFacing(true);
        } else {
        const restart = window.confirm(`Select okay to reset cards or click 'Cancel' to return to the Home-Page`);
    
            if(restart){
            setCardNum(0);
            setFacing(true);
        }       else {
                history.push('/');
        }
    }
    }
    
    if (cards.length > 2){

        return (
            <div>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item" 
                    key="0">
                        <Link to="/">
                            Home
                        </Link>
                </li>
                <li className="breadcrumb-item" 
                    aria-current="page" 
                    key="1">
                        <Link to={`/decks/${deckId}`}>
                            {deck.name}
                        </Link>
                    </li>
                <li className="breadcrumb-item active" 
                    aria-current="page" 
                    key="2">
                        Study
                </li>
            </ol>
            </nav>
           

            <heading>
                <h2 className='my-4'>Study: {deck.name}</h2>
            </heading>
            <div className="d-flex card">
                    <div className="card-body justify-content-between">
                            <div className="row">
                                <h3 className="card-title"> Card {cardNum + 1} of {cards.length}</h3>
                                <div className="card-text col-6">{(facing) ? `${cards[cardNum].front}` : `${cards[cardNum].back}`}</div>
                                <div className='btn-group justify-content-end'>
                                    <button onClick={handleCardFlip} 
                                            className="btn btn-secondary" >
                                                Flip
                                    </button> 

                                    {(facing) ? ' ' : 
                                    <button 
                                    onClick={cardOrder} 
                                    className="btn btn-primary">
                                    Next
                                    </button> }

                                </div>
                                </div>
                                
                            </div>
                    </div>
            </div>
        );
    } else {
            return (
                <div>
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item" key="3"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item" aria-current="page" key="4"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page" key="5">Study</li>
                </ol>
                </nav>

                <heading>
                    <h2>Study: {deck.name}</h2>
                </heading>
                <div className="card">
                       <div className="card-body">
                            <h3 className="card-title">Not Enough Cards.</h3>
                            <Link to ={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
                        </div> 
                </div>
                </div>
            
            );
        } 
}

export default StudyDeck
