import useRecipeStore from './recipeStore'

export default function SearchBar() {
  const setTerm = useRecipeStore((s) => s.setSearchTerm)

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      onChange={(e) => setTerm(e.target.value)}
    />
  )
}
