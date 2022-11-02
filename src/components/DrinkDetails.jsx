import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import myContext from '../context/myContext';

export default function DrinkDetails() {
//   const { apiMealsDetails, setApiMealsDetails } = useContext(myContext);
  const { setApiRecipeDetails } = useContext(myContext);
  const paramsUrl = useParams();
  console.log(paramsUrl.id);

  useEffect(() => {
    const setApi = async () => {
      const responseApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${paramsUrl.id}`);
      console.log(responseApi);
      const { drinks } = await responseApi.json();
      setApiRecipeDetails(drinks[0]);
    };
    setApi();
  }, [paramsUrl.id, setApiRecipeDetails]);

  return (
    <div>DrinkDetails</div>

  );
}
