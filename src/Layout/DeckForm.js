import React from 'react';

const DeckForm = ({ formData, handleChange }) => {

return (
    <div>
        <label>
            Name:
        </label>
        <br />
        <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Deck Name"
            onChange={handleChange}
            value={formData.name}
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
        rows="3" 
        onChange={handleChange} 
        value={formData.description} 
        style={{ width: '100%' }}
        />
        <br />
    </div>
)};

export default DeckForm;