import logo from './logo.svg';
import './App.css';
import { Router } from 'react-router';
import { Menu } from 'semantic-ui-react';
import e from 'express';

function App() {
  return (
     <Router history={history}>
       <Container>
         <Menu secondary>
           <Menu.Item 
           name='home'
           onClick={this.navigateToHome}
           />
         </Menu>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/campaigns/:address" component={Campaign} />
          <Route component={NotFound} />
        </Switch>

       </Container>
     </Router>
  );

  navigateToHome(e) {
    e.preventDefault()
    history.pushState('/')
  }
}

export default App;
