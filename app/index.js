import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './router';

render (
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./router', () => {
    const NewRoot = require('./router').default;
    render (
      <AppContainer>
        <NewRoot />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
