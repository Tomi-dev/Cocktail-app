import axios from 'axios';
import { useEffect, useState } from 'react';

import styles from './Home.module.css';
import Card from '../../Components/Card/Card';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

function Home() {
  const [cocktail, setCocktail] = useState({});
  const [cocktailSearchValue, setCocktailSearchValue] = useState('');

  const handleInputChange = (event) => {
    setCocktailSearchValue(event.target.value);
  };

  const handleButtonClick = () => {
    getRandomCocktail();
  };

  const getRandomCocktail = () => {
    return axios
      .get('/api/cocktail')
      .then((res) => setCocktail(res.data))
      .catch((err) => {
        // Something happened in setting up the request that triggered an Error
        throw new Error(`Error: ${err.message}`);
      });
  };

  useEffect(() => {
    getRandomCocktail();
  }, []);

  return (
    <section>
      <h1>Your Cocktail App</h1>
      <div className={styles['form-control-container']}>
        <Input
          type="text"
          label="Search for Cocktails"
          name="cocktail_name"
          id="cocktail_name"
          value={cocktailSearchValue}
          onChange={handleInputChange}
        />
        <Button label="Get random cocktail" onClick={handleButtonClick} />
      </div>

      <Card externalClass={styles['cocktail-preview-card-home']}>
        <div className={styles['cocktail-preview']}>
          <h2>{cocktail.name}</h2>
          <img src={cocktail.preview} alt={`${cocktail.name} preview`} />
        </div>
      </Card>
    </section>
  );
}

export default Home;