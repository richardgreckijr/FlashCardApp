import { React, useState, useEffect } from 'react';
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
        const restart = window.confirm(`Restart cards? Click 'Cancel' to return to the Home-Page`);
    
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
                <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page" key="1">{deck.name}</li>
            </ol>
            </nav>
           

            <heading>
                <h2>Study: {deck.name}</h2>
            </heading>
           <div className="card">
                    <div className="card-body">
                     
                            <div className="row justify-Content-start">
                                <h3 className="card-title"> Card {cardNum + 1} of {cards.length}</h3>
                                <div className="col-6">{(facing) ? `${cards[cardNum].front}` : `${cards[cardNum].back}`}</div>
                                <button onClick={handleCardFlip} className="btn btn-secondary">Flip</button></div>
                                <button onClick={cardOrder} className="btn btn-primary">Next</button>
                                
                            </div>
                    </div>
            </div>
        );
    } else {
            return (
                <div>
                    <div>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page" key="1">{deck.name}</li>
                            </ol>
                        </nav>
                        <h3>{deck.name}</h3>
                        <p>{deck.description}</p>
            
                        <h2>No Cards, Please add some.</h2>
                    </div>
                </div>
            );
        }
}

export default StudyDeck
