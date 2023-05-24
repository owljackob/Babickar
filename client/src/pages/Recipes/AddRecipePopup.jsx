import React, { useState } from 'react';
import './AddRecipePopup.css';

const AddRecipePopup = ({ isOpen, onClose, onAddRecipe }) => {
    const [recipeName, setRecipeName] = useState('');
    const [complexityLevel, setComplexityLevel] = useState('');

    const handleRecipeNameChange = (event) => {
        setRecipeName(event.target.value);
    };

    const handleComplexityLevelChange = (event) => {
        setComplexityLevel(event.target.value);
    };

    const handleAddRecipe = () => {
        onAddRecipe(recipeName);
        setRecipeName('');
        onAddRecipe(complexityLevel);
        setComplexityLevel('');
    };

    return (
        <div className={`popup ${isOpen ? 'open' : ''}`}>
            <div className="popup-content">
                <h2>Sdílet recept</h2>
                <input
                    type="text"
                    placeholder="Název"
                    value={recipeName}
                    onChange={handleRecipeNameChange}
                />
                <input
                    type="text"
                    placeholder="Složitost"
                    value={complexityLevel}
                    onChange={handleComplexityLevelChange}
                />
                <div className="popup-actions">
                    <button onClick={handleAddRecipe}>Ok</button>
                    <button onClick={onClose}>Zrušit</button>
                </div>
            </div>
        </div>
    );
};

export default AddRecipePopup;
