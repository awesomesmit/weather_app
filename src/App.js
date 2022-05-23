import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Country from './Country';
import Weather from './Weather'
const App = () => {
  return (
    //  <Country />  
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Country />} />
        <Route exact path="/Weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
