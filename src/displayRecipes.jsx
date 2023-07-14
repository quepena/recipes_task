import { Link } from "react-router-dom";
import { store } from "./store";
import { useEffect, useState } from "react";

const DisplayRecipes = () => {
    const getRecipes = store(state => state.loadRecipes)
    const recipes = store(state => state.recipes)
    const [toggle, setToggle] = useState([{}])

    useEffect(() => {
        getRecipes()
    }, [getRecipes])

    const indexes = recipes && recipes.data && Object.entries(recipes.data.slice(0, 15)).map((recipe, ix) => ({
        recipe
    }))

    // Since the API provides ids for all the recipes, but I always need only 15, I'm giving every recipe my own id
    // Sel is used to check selected items
    const initialRecipes = recipes && recipes.data && [...new Array(recipes.data.slice(0, 15).length)].map((item, index) => ({
        id: indexes.find((id) => (parseInt(id.recipe[0]) == index) && id.recipe[0]),
        sel: false
    }));

    useEffect(() => {
        initialRecipes && setToggle([...initialRecipes])
    }, [recipes])

    // Selecting items with right click
    const handleClick = (event, recipe) => {
        if (event.type === 'contextmenu') {
            const toggleRecipes = toggle.map((item, index) => (item.id.recipe[0] == recipe.recipe[0]) ? ({ id: item.id, sel: !item.sel }) : ({ id: item.id, sel: item.sel }));
            setToggle([...toggleRecipes])
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {recipes && recipes.data && recipes.data.slice(0, 15).map((recipe) =>
                <Link onContextMenu={(event) => handleClick(event, indexes.find((item) => { if (item.recipe[1].id == recipe.id) return recipe }))} to={`/${recipe.id}`} style={{ width: '220px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', color: 'black', textDecoration: 'none', backgroundColor: toggle.some(el => el.sel && el.id.recipe[0] == recipe[0] ? 'gray' : 'white') }}>
                    <img src={recipe.image_url} style={{ height: "300px", width: "auto" }} alt="" />
                    <div style={{ textAlign: 'center' }}>{recipe.name}</div>
                </Link>
            )}
        </div>
    );
};

export default DisplayRecipes;