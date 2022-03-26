import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './Cocktail.module.css';
import Card from '../../Components/Card/Card';
import Button from '../../Components/Button/Button';

function Cocktail() {
  const [cocktail, setCocktail] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const goBack = () => {
    navigate('/');
  };

  // Getting the cocktail's details when the component gets mounted
  useEffect(() => {
    axios
      .get(`/api/cocktail/${id}`)
      .then((res) => {
        setCocktail(res.data);
      })
      .catch((err) => {
        throw new Error(`Error: ${err.message}`);
      });
  }, [id]);

  return (
    <section className={styles['cocktail-details']}>
      {cocktail && (
        <>
          <h1>{cocktail.name}</h1>
          <Card>
            <div className={styles['cocktail-preview']}>
              <img src={cocktail.preview} alt={`${cocktail.name} preview`} />
              <div className={styles['cocktail-ingredients']}>
                <h2>Ingredients: </h2>
                <p>
                  {/* Mapping the modifed data just to print the "ingredients" with comma separation */}
                  {cocktail.ingredients.map((item, i) => {
                    let ingredient = item.ingredient;
                    let measure = item.measure ? ` (${item.measure})` : '';

                    return i !== cocktail.ingredients.length - 1
                      ? `${ingredient} ${measure}, `
                      : `${ingredient} ${measure} `;
                  })}
                </p>
                <h2>Instructions: </h2>
                <p>{cocktail.instructions}</p>
              </div>
            </div>
          </Card>
          <Button label="Go back" onClick={goBack} />
        </>
      )}
    </section>
  );
}

export default Cocktail;
