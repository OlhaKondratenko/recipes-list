import React, {useEffect, useState} from 'react';
import {CardContent, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import {useNavigate} from "react-router-dom";
import useBeerRecipeStore from "../../store";
import './recipe-card.css';


const RecipeCard = ({id, name, description, onContextMenu}) => {
    const [isRecipeInFilterList, setIsRecipeInFilterList] = useState(true);
    const navigate = useNavigate();
    const recipesToFilter = useBeerRecipeStore((state) => state.recipesToFilter);
    const navigateToRecipe = () => {
        return navigate(`/recipe/${id}`);
    }

    useEffect(() => {
        setIsRecipeInFilterList(recipesToFilter.some((recipe) => recipe.id === id));
    }, [recipesToFilter, id]);

    return (
        <Card
            onContextMenu={(event) => onContextMenu(event, id)}
            onClick={navigateToRecipe}
            sx={{background: isRecipeInFilterList ? 'white' : 'red'}}
            className='recipe-card'>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography className='recipe-description' variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default RecipeCard;
