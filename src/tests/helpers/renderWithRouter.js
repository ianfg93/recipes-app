import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

export function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}
export function renderWithRouter(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}
export function renderWithRedux(component, options = {}) {
  const {
    initialState = {},
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
  } = options;
  return {
    ...render(withRedux(component, store)),
    store,
  };
}
export function renderWithRouterAndRedux(component, options = {}) {
  const {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = options;
  return {
    ...renderWithRedux(withRouter(component, history), options),
    history,
  };
}
