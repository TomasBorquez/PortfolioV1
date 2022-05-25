import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from '../components/Nav/Nav.jsx'
import About from '../components/About/About.jsx'
import './App.css';
function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={
              <Fragment>
                <Nav />
                <About />
              </Fragment>
            }>
        </Route>

        <Route path='/works' element={<Nav />}>
          
        </Route>

      </Routes>
      {/* <a target="_blank" rel="noreferrer" href="https://icons8.com/icon/v551nqGeHhGn/github">GitHub</a> icon by <a target="_blank" rel="noreferrer" href="https://icons8.com">Icons8</a> */}
    </div>
  );
}

export default App;

// {/* <nav className="navbar navbar-dark bg-dark">
// <Link to='/about'>
//   <span>About</span>
// </Link>
//   <SearchBar
//     onSearch={onSearch}
//   />
// </nav> */}