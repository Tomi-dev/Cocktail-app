import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './Home.module.css';
import Card from '../../Components/Card/Card';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

function Home() {
  const [cocktail, setCocktail] = useState({});
  const [cocktailSearchValue, setCocktailSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  // Setting up a timer to guess if the user still typing, its an estimated time just to avoid unnecessary requests
  let typingTimer;
  const doneTypingInterval = 500;

  const handleInputChange = (event) => {
    setCocktailSearchValue(event.target.value);
  };

  // Clearing and setting the typing timer.
  const handleKeyUp = () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      getRandomCocktail(cocktailSearchValue);
    }, doneTypingInterval);
  };

  const handleKeyDown = () => {
    clearTimeout(typingTimer);
  };

  const handleButtonClick = () => {
    getRandomCocktail();
  };

  // General function to avoid code repeating and to set the url based on the user entered seach value.
  // If we got search value.
  // Note: we dont use the search value from the state, because we have a button click event which calls this function as well
  // We got a basic loading too, just to avoid request spamming
  const getRandomCocktail = (searchValue) => {
    if (loading) {
      return;
    }

    const url = searchValue
      ? `/api/cocktail-by-name/${searchValue}`
      : '/api/cocktail';

    setLoading(true);

    axios
      .get(url)
      .then((res) => {
        setCocktail(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        throw new Error(`Error: ${err.message}`);
      });
  };

  // Navigation to the cocktail's details page
  const cocktailRoute = () => {
    navigate(`/cocktail/${cocktail.id}`);
  };

  // Getting a random cocktail when the component gets mounted
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
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        />
        <Button label="Get random cocktail" onClick={handleButtonClick} />
      </div>

      {Object.keys(cocktail).length > 0 && (
        <Card
          externalClass={styles['cocktail-preview-card-home']}
          onClick={cocktailRoute}
        >
          <div className={styles['cocktail-preview']}>
            <h2>{cocktail.name}</h2>
            <img src={cocktail.preview} alt={`${cocktail.name} preview`} />
          </div>
        </Card>
      )}
    </section>
  );
}

export default Home;
