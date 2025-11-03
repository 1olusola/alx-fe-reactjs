import { useParams, useNavigate } from 'react-router-dom'
import useRecipeStore from './recipeStore'
import EditRecipeForm from './EditRecipeForm'
import DeleteRecipeButton from './DeleteRecipeButton'

export default function RecipeDetails() {
  const { id } = useParams()
  const nav = useNavigate()
  const recipe = useRecipeStore((s) =>
    s.recipes.find((r) => r.id === Number(id))
  )

  if (!recipe) return <p>Recipe not found</p>

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton id={recipe.id} onDeleted={() => nav('/')} />
    </div>
  )
}
