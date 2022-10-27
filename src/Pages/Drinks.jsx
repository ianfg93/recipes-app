import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import myContext from '../context/myContext';

function Drinks() {
  const { ingredientApi } = useContext(myContext);

  return (
    <div>
      <Header />
      <SearchBar />
      <h1> Drinks </h1>
      <div>
        {
          ingredientApi.length === 1 && (
            <Redirect to={ `/drinks/${ingredientApi[0].idDrink}` } />
          )
        }
      </div>

      <Footer />
    </div>
  );
}

export default Drinks;
