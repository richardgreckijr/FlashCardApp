import { React } from 'react';
import { Link } from 'react-router-dom';


const DeckForm = ({ handleSubmit, handleChange, name, description }) => {


return (
    <form onSubmit={(event) => handleSubmit(event)}>
    <div>
        <label>
            Name
        </label>
        <br />
        <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Deck Name"
            onChange={handleChange}
            value={name || ""}
            style={{ width: '100%' }}
        />
        <br />
        <br />
        <label>
            Description
        </label>
        <textarea
            type="textarea" 
            id="description" 
            name="description" 
            placeholder="Enter Deck Description"
            rows="3" 
            onChange={handleChange} 
            value={description || ""} 
            style={{ width: '100%' }}
        />
        <br />
    </div>
    <Link
        to={'/'}
        className="btn btn-secondary mb-4 mr-3"
      >
        Cancel
      </Link>
      <button type="submit" 
              className="btn btn-primary mb-4">
        Submit
      </button>
    </form>
)};

export default DeckForm;