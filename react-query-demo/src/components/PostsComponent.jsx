import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchPosts = async () => {
const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
return data;
};
export default function PostsComponent() {
const { data, error, isLoading, refetch } = useQuery({
queryKey: ["posts"],
queryFn: fetchPosts,
staleTime: 1000 * 60 * 5   // 5 min cache
});
if (isLoading) return <p>;
if (error)     return <p>;
return (
<>
<button onClick={() => refetch()}>Refetch Posts
<ul><li key={post.id}>
))}

</>
);
}
