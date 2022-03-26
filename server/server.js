import fetch from 'node-fetch';
import express from 'express';

const app = express();

// Helper function to get rid of all the unnecessary data
const modifyDrinkDataForHomePage = (data) => {
  let drink = data.drinks[0];
  return {
    id: drink.idDrink,
    name: drink.strDrink,
    preview: drink.strDrinkThumb,
  };
};

// I admit this is kind of messy
// This function retrieves every ingreadient and the associated measure
// The Logic behind it: Only retrieve the value if its key contains the Ingreadient word and if its value is not null
// it does the same for the measurements by replacing the Ingredient word in the object key
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

// Get Random cocktail
app.get('/api/cocktail', async (req, res) => {
  try {
    console.log(`Requesting a random cocktail.`);
    const response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    );

    let data = await response.json();
    data = modifyDrinkDataForHomePage(data);

    console.log(`Requesting a random cocktail ended, sending back the data.`);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

// Get cocktail by id
app.get('/api/cocktail/:id', async (req, res) => {
  try {
    const cocktail_id = req.params.id;

    console.log(`Requesting a cocktail by the id of ${cocktail_id}`);
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail_id}`
    );

    let data = await response.json();
    data = modifyDrinkForDetailPage(data);

    console.log(
      `Requesting a cocktail by the id of ${cocktail_id} ended, sending back the modified data.`
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

// Get cocktail by name
app.get('/api/cocktail-by-name/:name', async (req, res) => {
  try {
    const cocktail_name = req.params.name;

    console.log(`Requesting a cocktail by the name of ${cocktail_name}`);
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail_name}`
    );

    let data = await response.json();
    data = modifyDrinkDataForHomePage(data);

    console.log(
      `Requesting a cocktail by the name of ${cocktail_name} ended, sending back the modified data.`
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

app.listen(5000, () => {
  console.log('Server started on port: ' + 5000);
});
