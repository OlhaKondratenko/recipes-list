import React, {useEffect} from 'react';
import useBeerRecipeStore from '../../store';
import './list.css';
import RecipeCard from "../RecipeCard/RecipeCard";
import {Button} from "@mui/material";

const List = () => {
    const recipes = useBeerRecipeStore((state) => state.recipes);
    const recipesToFilter = useBeerRecipeStore((state) => state.recipesToFilter);
    const currentPage = useBeerRecipeStore((state) => state.currentPage);
    const getRecipesPage = useBeerRecipeStore((state) => state.getRecipesPage);
    const setRecipesToFilter = useBeerRecipeStore((state) => state.setRecipesToFilter);
    const deleteRecipe = useBeerRecipeStore((state) => state.deleteRecipes);
    const incrementCurrentPage = useBeerRecipeStore((state) => state.incrementCurrentPage);

    const selectRecipe = (event, id) => {
        event.preventDefault();
        const idRecipeInFilterList = recipesToFilter.some((recipe) => recipe.id === id);
        if (idRecipeInFilterList) {
            const newRecipesToFilter = recipesToFilter.filter((recipe) => recipe.id !== id);
            setRecipesToFilter(newRecipesToFilter);
        } else {
            const currentRecipe = recipes.find((recipe) => recipe.id === id);
            setRecipesToFilter([...recipesToFilter, currentRecipe]);
        }
    }

    const onDeleteButtonClick = () => {
        deleteRecipe(recipesToFilter);
    }

    useEffect(() => {
        if (recipes.length === 0) {
            getRecipesPage(currentPage);
            incrementCurrentPage();
        }
    }, [recipes.length]);

    return (
        <>
            {recipesToFilter.length !== recipes.length ?
                <Button variant='outlined' onClick={onDeleteButtonClick}>Delete Cards</Button> : <></>}
            <div className='list'>
                {recipes.slice(0, 15).map(({id, name, description}) => {
                    return (
                        <RecipeCard onContextMenu={selectRecipe} on key={id} id={id} name={name}
                                    description={description}/>
                    )
                })}
            </div>
        </>
    );
};

export default List;
