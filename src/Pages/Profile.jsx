import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const profileUser = localStorage.getItem('user');
  if (!profileUser) localStorage.setItem('user', JSON.stringify({ email: '' }));
  const { email } = JSON.parse(localStorage.getItem('user'));
  const limparStore = () => {
    history.push('/');
    localStorage.clear();
  };
  return (
    <div>
      Profile
      <Header />
      <div>
        <p data-testid="profile-email">{email}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ limparStore }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
export default Profile;
