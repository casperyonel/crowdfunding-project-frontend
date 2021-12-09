import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Menu } from 'semantic-ui-react';
import e from 'express';
import NotFound from './components/NotFound'
import Home from './components/Home';
import Campaign from './components/Campaign';

function App() {
  
  navigateToHome(e) {
    e.preventDefault()
    history.push('/')
  }

  return (
     <Router history={history}>
       <Container>
         <Menu secondary>
           <Menu.Item 
           name='home'
           onClick={this.navigateToHome}
           />
         </Menu>

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/campaigns/:address" element={<Campaign />} />
          <Route element={<NotFound />} />
        </Routes>

       </Container>
     </Router>
  );


}

export default App;
