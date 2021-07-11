import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService'


const PrivateRoute = ({component: Component, path: Path, ...rest }) => {
    return (
        <Route
            path={Path}
            render={() => AuthenticationService.validateToken() ? <Component {...rest} /> : <Redirect push to={"/login"} />}
        />
    )
}

/*
const PrivateRoute = ({ component: Component, path: Path, ...rest }) => {

    const [auth, setAuth] = useState();
    const _isMounted = useRef(true);

    useEffect( () => {

      const validationFunction = async () => {
          return await AuthenticationService.validateToken();
      };

      validationFunction().then( response => {
          console.log("OVO JE RESPONSEEEE " + response);
          setAuth(response)
        }
          ).catch( error => setAuth(false)).then(setIsTokenValidated(true));
      }, [auth])
      
    
    return (
        <div>
            { isTokenValidated && <PrivateRouteChild path={Path} component={Component} auth={auth} />}
        </div>
        

    );
}
*/

export default PrivateRoute;