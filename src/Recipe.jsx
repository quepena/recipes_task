import React from 'react'
import { useParams } from 'react-router-dom';
import { store } from './store';
import { useEffect } from 'react';

const Recipe = () => {
    const { recipe } = useParams();
    const getRecipes = store(state => state.loadRecipes)
    const recipes = store(state => state.recipes)

    useEffect(() => {
        getRecipes()
    }, [getRecipes])

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {recipes && recipes.data &&
                <div>
                    <img src={recipes.data[recipe].image_url} style={{ height: "300px", width: "auto" }} alt="" />
                    <div style={{ textAlign: 'center' }}>{recipes.data[recipe].name}</div>
                </div>
            }
        </div>
    )
}

export default Recipe