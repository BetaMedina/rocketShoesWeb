import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Route from './routes';
import GlobalStyle from './Global/style';
import Header from './Component/Heder/index';
import './Config/reactotronConfig';
import history from './Services/history';
import store from './Store/index';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Route />
      </Router>
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </Provider>
  );
}

export default App;
