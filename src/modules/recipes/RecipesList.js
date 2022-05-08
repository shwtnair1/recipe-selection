import React from 'react';

import { Row, Col } from '../../components/Grid';
import Flex from '../../components/Flex';
import Box from '../../components/Box';
import RecipeCard from './RecipeCard';
import PriceInfo from './PriceInfo';
import { parseRawPrice } from './price';
import useFetchHelloFreshBox from '../../hooks/useFetchHelloFreshBox';

const Recipes = () => {
  // This state stores the array of recipes with the changes performed by the customer.
  const [recipes, setRecipes] = React.useState([]);
  const { data, loading } = useFetchHelloFreshBox();

  // Add recipe based on recipe Id passed from the event calling this function.
  const handleAddRecipe = (recipeId) => {
    setRecipes(recipes.map(recipe => recipe.id === recipeId ? {...recipe,selected:recipe.selected+1} : recipe));
  };

  // Remove recipe based on recipe Id passed from the event calling this function.
  const handleRemoveRecipe = (recipeId) => {
    setRecipes(recipes.map(recipe => recipe.id === recipeId ? {...recipe,selected:recipe.selected-1} : recipe));
  };
  
  // Recipe Select Count : Calculates and sets the total no. of recipes selected.
  let recipeSelectCount = recipes.length > 0 ? recipes.reduce((total,recipe)=>total + recipe.selected , 0) : 0;
  // Min recipe boundary : if min recipe boundary limit of the boundary is reached , set to true .
  const minRecipesSelected = recipeSelectCount >= data.min ? true :false;
  //Max recipe boundary : if max recipes limit of the box is reached , set to true .
  const maxRecipesSelected = recipeSelectCount === data.max ? true :false;

  // price summary and total price, feel free to remove or rename these variables and values.
  const summary = [];
  const totalPrice = parseRawPrice(0);

  React.useEffect(() => {
    const { recipes: fetchedRecipes } = data;

    if (fetchedRecipes) {
      setRecipes(fetchedRecipes);
    }
  }, [setRecipes, data]);

  if (loading) {
    return null;
  }

  return (
    <>
      <Row>
        <Col sm={6}>
          <h3>{data.headline}</h3>
        </Col>
        <Col sm={6}>
          <Flex alignItems="center" justifyContent="flex-end">
            <Box textAlign="right" mr="xs">
              <h3>{totalPrice}</h3>
            </Box>
            <PriceInfo summary={summary} totalPrice={totalPrice} />
          </Flex>
        </Col>
      </Row>

      <Row>
        {recipes.map((recipe) => (
          <Col sm={12} md={6} xl={4} key={recipe.id}>
            <Box mb="md">
              <RecipeCard
                {...recipe}
                handleAddRecipe={handleAddRecipe}
                handleRemoveRecipe={handleRemoveRecipe}
                minRecipesSelected={minRecipesSelected}
                maxRecipesSelected={maxRecipesSelected}
              />
            </Box>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Recipes;
