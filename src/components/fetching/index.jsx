import React from 'react';
import PropTypes from 'prop-types';

export const FetchingState = React.createContext(false);

export const FetchingStateProvider = ({
  children,
  fetching,
}) => (
  <FetchingState.Provider value={{ fetching }}>
    {children}
  </FetchingState.Provider>
);

FetchingStateProvider.propTypes = {
  fetching: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
};
