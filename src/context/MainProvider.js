import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const MainContext = createContext();

function MainProvider({ children }) {
  const { Provider } = MainContext;
  const [mode, setMode] = React.useState(localStorage.getItem('mode') || 'light');

  const handleChangeMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    localStorage.setItem('mode', newMode);
    setMode(newMode);
  };

  return <Provider value={{ mode, onChangeMode: handleChangeMode }}>{children}</Provider>;
}

MainProvider.propTypes = {
  children: PropTypes.node,
};

export default MainProvider;
