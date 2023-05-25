import React, { useState } from 'react';
import axios from 'axios';

import './AddRecipePopup.css';

const AddRecipePopup = ({ isOpen, onClose, onAddRecipe }) => {
    const [recipe, setRecipe] = useState({
        name: '',
        type: '1',
        complexity: '1',
        ingredients: '',
        directions: '',
        error: ''
    });

    const handleInputChange = event => {
        const { name, value } = event.target;
        setRecipe(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        const { name, type, complexity, ingredients, directions } = recipe;

        if (!name.trim() || !type || !complexity || !ingredients.trim() || !directions.trim()) {
            setRecipe(prevState => ({ ...prevState, error: 'Huh' }));
            return;
        }

        try {
            await addRecipeCall();
            onAddRecipe(recipe);
            setRecipe({
                name: '',
                type: '1',
                complexity: '1',
                ingredients: '',
                directions: '',
                error: ''
            });
        } catch (error) {
            console.error('Error adding recipe: ', error);
        }
    };


    const addRecipeCall = async () => {
        const response = await axios.post('http://localhost:3000/api/recipesApi/allRecipes/create', {
            name: recipe.name,
            categoryId: recipe.type,
            difficultyId: recipe.complexity,
            materials: recipe.ingredients
        });
        console.log(response.data);
    };

    return (
        <div className={`popup ${isOpen ? 'open' : ''}`}>
            <div className="popup-content">
                <h2>Sdílet recept</h2>
                {recipe.error && <p className="error-message">{recipe.error}</p>}
                <input type="text" placeholder="Název" value={recipe.name} name="name" onChange={handleInputChange} />
                <label htmlFor="type">Typ</label>
                <select name="type" id="type" value={recipe.type} onChange={handleInputChange}>
                    <option value="1">Snídaně</option>
                    <option value="2">Hlavní jídlo</option>
                    <option value="3">Večeře</option>
                </select>
                <label htmlFor="complexity">Obtížnost</label>
                <select name="complexity" id="complexity" value={recipe.complexity} onChange={handleInputChange}>
                    <option value="1">Malá</option>
                    <option value="2">Střední</option>
                    <option value="3">Obtížná</option>
                </select>
                <input
                    type="text"
                    placeholder="Ingredience"
                    value={recipe.ingredients}
                    name="ingredients"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Postup"
                    value={recipe.directions}
                    name="directions"
                    onChange={handleInputChange}
                />
                <div className="popup-actions">
                    <button onClick={handleSubmit}>Ok</button>
                    <button onClick={onClose}>Zrušit</button>
                </div>
            </div>
        </div>
    );
};

export default AddRecipePopup;
