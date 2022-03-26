import fetch from 'node-fetch';
import express from 'express';
// const express = require('express');

const app = express();

const modifyDrinkDataForHomePage = (data) => {
  let drink = data.drinks[0];
  return {
    id: drink.idDrink,
    name: drink.strDrink,
    preview: drink.strDrinkThumb,
  };
};

const modifyDrinkForDetailPage = (data) => {
  let drink = data.drinks[0];
  let modifiedDrink = modifyDrinkDataForHomePage(data);
  modifiedDrink.instructions = drink.strInstructions;
  modifiedDrink.ingredients = [];

  const objectKeys = Object.keys(drink);

  for (let i = 0; i < objectKeys.length; i++) {
    if (objectKeys[i].indexOf('Ingredient') > -1 && drink[objectKeys[i]]) {
      let ingredient = drink[objectKeys[i]];
      let measureKey = objectKeys[i].replace('Ingredient', 'Measure');
      let measure =
        drink[measureKey] && drink[measureKey] !== '\n'
          ? drink[measureKey]
          : null;
      modifiedDrink.ingredients.push({
        ingredient,
        measure,
      });
    }
  }

  return modifiedDrink;
};

app.get('/api/cocktail', async (req, res) => {
  try {
    const response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    );

    let data = await response.json();
    data = modifyDrinkDataForHomePage(data);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

app.get('/api/cocktail/:id', async (req, res) => {
  try {
    const cocktail_id = req.params.id;

    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail_id}`
    );

    let data = await response.json();
    data = modifyDrinkForDetailPage(data);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

app.get('/api/cocktail-by-name/:name', async (req, res) => {
  try {
    const cocktail_name = req.params.name;

    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail_name}`
    );

    let data = await response.json();
    data = modifyDrinkDataForHomePage(data);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

app.listen(5000, () => {
  console.log('Server started on port: ' + 5000);
});
