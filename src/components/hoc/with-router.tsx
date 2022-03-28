import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Component } from 'react';

const withRouter = () => (Wrapped: Component) => {
  return (props: any) => {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        // @ts-ignore
        <Wrapped {...props} router={{ location, navigate, params }}/>
      );
  }
}

export default withRouter;
