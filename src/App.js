import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
// import Table from './views/theme/colors/Table'
import EditUser from './views/theme/colors/EditUser'
import ActivationEmails from './views/theme/typography/ActivetionEmails'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Table = React.lazy(() => import('./views/theme/colors/Table'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route path="/checking/edit/:id" name="Edit User">
              <EditUser />
            </Route>
            <Route path="/checking/admin/:pageNumber" name="Table">
              <Table />
            </Route>
            <Route path="/user/activate/:activetion_token" name="Activation" exact>
              <ActivationEmails />
            </Route>
            <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    )
  }
}

export default App
