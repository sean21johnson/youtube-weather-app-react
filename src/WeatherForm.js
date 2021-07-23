import React from 'react';

function WeatherForm({ onFormSubmit }) {
    
    return (
        <form onSubmit={onFormSubmit}>
            <input type="text" name="location" placeholder="Search by location"></input>
            <label name="location"></label>
        </form>
    )
}


export default WeatherForm;