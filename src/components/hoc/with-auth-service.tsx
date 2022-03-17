import { AuthServiceConsumer } from '../context/auth.service.context';
import { Component } from 'react';

const withAuthService = () => (Wrapped: Component) => {
  return (props: any) => {
    return (
      <AuthServiceConsumer>
        {
          (authService) => {
            // @ts-ignore
            return (<Wrapped {...props} authService={authService}/>);
          }
        }
      </AuthServiceConsumer>
    );
  }
};

export default withAuthService;
