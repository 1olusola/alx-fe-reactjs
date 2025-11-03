import { Link } from 'react-router-dom'
import useRecipeStore from '../store/recipeStore'
import SearchBar from './SearchBar'

export default function RecipeList() {
  const recipes = useRecipeStore((s) =>
    s.searchTerm ? s.filteredRecipes : s.recipes
  )

  return (
    <>
      <SearchBar />
      <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        {recipes.map((r) => (
          <Link
            to={`/recipe/${r.id}`}
            key={r.id}
            style={{ border: '1px solid #ccc', padding: 8, display: 'block' }}
          >
            <h3>{r.title}</h3>
            <p>{r.description}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
