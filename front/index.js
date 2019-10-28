import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Main from './src/Main';
import store from './redux/store';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <Main />
      <ReduxToastr
        timeOut={8000}
        newestOnTop={false}
        preventDuplicates
        position="top-center"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
