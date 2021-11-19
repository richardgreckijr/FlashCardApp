import React from 'react'

const CardForm = ({ formData, handleChange}) => {
    return (
        <div>
        <label>
            Front
        </label>
        <br />
        <textarea
            type="textarea"
            id="front"
            name="front"
            rows="3"
            placeholder="Front side of the Card"
            onChange={handleChange}
            value={formData.front}
            style={{ width: '100%' }}
        />
        <br />
        <br />
        <label>
            Back
        </label>
        <textarea
        type="textarea" 
        id="back" 
        name="back"
        rows="3" 
        placeholder="Back side of the Card"
        onChange={handleChange} 
        value={formData.back} 
        style={{ width: '100%' }}
        />
        <br />
    </div>
    )
}

export default CardForm
