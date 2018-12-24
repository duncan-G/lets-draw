import React from 'react';
import { CSSTransition } from 'react-transition-group';

import "./transitionStyle.css";

const withTransition = WrappedComponent => {
  const duration = 600;

  return class transition extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        in: false
      };
    }

    componentDidMount() {
      this.setState({ in: true });
    }

    render() {
      return (
        <CSSTransition
          in={this.state.in}
          timeout={duration}
          classNames="component"
          unmountOnExit
        >
          <WrappedComponent {...this.props} />
        </CSSTransition>
      );
    }
  };
};

export default withTransition;
