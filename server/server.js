import fetch from 'node-fetch';
import express from 'express';
// const express = require('express');

const app = express();

app.get('/api/cocktail', async (req, res) => {
  try {
    const response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    );

    let data = await response.json();

    let drinkObject = {
      id: data.drinks[0].idDrink,
      name: data.drinks[0].strDrink,
      preview: data.drinks[0].strDrinkThumb,
    };

    res.status(200).json(drinkObject);
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
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

app.listen(5000, () => {
  console.log('Server started on port: ' + 5000);
});
