import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import useBeerRecipeStore from "../../store";
import Card from "@mui/material/Card";
import {CardContent, Typography} from "@mui/material";
import {Stack} from "@mui/system";
import './recipe.css';

const Recipe = () => {
    const params = useParams();
    const recipeId = params.id;

    const recipe = useBeerRecipeStore((state) => state.recipe);
    const getRecipeById = useBeerRecipeStore((state) => state.getRecipeById);

    useEffect(() => {
        getRecipeById(recipeId);
    }, [recipeId, getRecipeById]);

    return (
        <Stack className='recipe-page'>
            <Card sx={{maxWidth: 500}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {recipe.name}
                        <sup>
                            <Typography variant="caption" color="text.secondary">
                                <i>{recipe.tagline}</i>
                            </Typography>
                        </sup>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {recipe.description}
                    </Typography>
                </CardContent>
            </Card>
        </Stack>
    );
};

export default Recipe;
