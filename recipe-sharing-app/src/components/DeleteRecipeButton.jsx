import useRecipeStore from './recipeStore'

export default function DeleteRecipeButton({ id, onDeleted }) {
  const del = useRecipeStore((s) => s.deleteRecipe)

  const handle = () => {
    del(id)
    onDeleted?.()
  }

  return (
    <button onClick={handle} style={{ marginTop: 8 }}>
      Delete Recipe
    </button>
  )
}
