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

  let typingTimer;
  const doneTypingInterval = 500;

  const handleInputChange = (event) => {
    setCocktailSearchValue(event.target.value);
  };

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

  const cocktailRoute = () => {
    navigate(`/cocktail/${cocktail.id}`);
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
