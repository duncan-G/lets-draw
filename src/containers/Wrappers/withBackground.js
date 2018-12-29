
/**
 * Wrap a component in a div with a background
 * Allows for CSS transitions to only apply to the content
*/

import React from 'react';

const withBackground = WrapperWithBackground => WrappedComponent => {
  return props => {
    return (
      <WrapperWithBackground>
        <WrappedComponent {...props} />
      </WrapperWithBackground>
    );
  };
};

export default withBackground;
