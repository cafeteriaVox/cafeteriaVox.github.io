import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FullScrenPage from './fullScrenPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/fullScreen' element={<FullScrenPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
