import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import myContext from '../context/myContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

function Meals() {
  const { ingredientApi } = useContext(myContext);

  return (
    <div>
      <Header />
      <SearchBar />
      <h1> Tela de receitas </h1>
      <div>
        {
          ingredientApi.length === 1 && (
            <Redirect to={ `/meals/${ingredientApi[0].idMeal}` } />
          )
        }
      </div>
      <Footer />
    </div>
  );
}

export default Meals;
