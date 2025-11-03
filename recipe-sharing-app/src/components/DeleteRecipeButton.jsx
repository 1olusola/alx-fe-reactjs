import { useNavigate } from 'react-router-dom'
import useRecipeStore from './recipeStore'

export default function DeleteRecipeButton({ id, onDeleted }) {
  const del = useRecipeStore((s) => s.deleteRecipe)
  const navigate = useNavigate()

  const handle = () => {
    del(id)
    if (onDeleted) onDeleted()
    else navigate('/')
  }

  return (
    <button onClick={handle} style={{ marginTop: 8 }}>
      Delete Recipe
    </button>
  )
}
