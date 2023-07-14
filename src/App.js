import './App.css';
import DisplayRecipes from './displayRecipes';
import Recipe from './Recipe';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div style={{ maxWidth: "1200px", margin: 'auto' }}>
      <Routes>
        <Route path="/" element={<DisplayRecipes />} />
        <Route path="/:recipe" element={<Recipe />} />
      </Routes>
    </div>
  );
}

export default App;
