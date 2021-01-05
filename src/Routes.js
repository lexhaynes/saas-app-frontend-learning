import {
    Route, 
    Switch
  } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './accountUI/Login';
import Register from './accountUI/Register';
import AccountActivation from './accountUI/AccountActivation';
import ResendActivationLink from './accountUI/ResendActivationLink';
import ResetPasswordLink from './accountUI/ResetPasswordLink';
import ResetPassword from './accountUI/ResetPassword';

const routesData = [
  {
    path: "/register",
    component: Register,
    title: "Register",
  },
  {
    path: "/login",
    component: Login,
    title: "Login",
  },
  {
    path: "/account/activate",
    component: AccountActivation,
    title: "Activate Account",
  },
  {
    path: "/account/resend-activation-link",
    component: ResendActivationLink,
    title: "Re-send Activation Link",
  },
  {
    path: "/account/reset-password-link",
    component: ResetPasswordLink,
    title: "Email Reset Password Link",
  },
  {
    path: "/account/reset-password",
    component: ResetPassword,
    title: "Reset Password",
  },
  {
    path: "/",
    component: HomePage,
    title: "Home",
  },
];

const Routes = () => {
    return (
        <Switch>
        {
          routesData.map( (routeObj, i) => {
            return <Route key={"route-"+i} path={routeObj.path} component={routeObj.component} />
          })
        }
      </Switch>
    )
}

export default Routes;
export { routesData };