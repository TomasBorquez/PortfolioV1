import './App.css';
import Nav from '../components/Nav/Nav.jsx'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path='/' element={<Nav />}>
          {/* <Route exact path='/' element={<About/>}/> */}
        </Route>

        {/* <Route exact path='/works'>
        </Route> */}
      </Routes>
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