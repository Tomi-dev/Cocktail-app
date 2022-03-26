import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout/Layout';
import Home from './Pages/Home/Home';
import Cocktail from './Pages/Cocktail/Cocktail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/cocktail" element={<Home />} />
          <Route path="cocktail/:id" element={<Cocktail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
