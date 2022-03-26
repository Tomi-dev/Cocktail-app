import { useParams } from 'react-router-dom';

function Cocktail() {
  const { id } = useParams();

  return <h1>Cocktail id {id}</h1>;
}

export default Cocktail;
