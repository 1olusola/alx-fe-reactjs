import { Routes, Route, Link } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'

export default function App() {
  return (
    <>
      <nav style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <Link to="/">All Recipes</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/recommendations">For You</Link>
      </nav>

      <AddRecipeForm />
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/favorites" element={<FavoritesList />} />
        <Route path="/recommendations" element={<RecommendationsList />} />
      </Routes>
    </>
  )
}
