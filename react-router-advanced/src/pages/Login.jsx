export default function Login() {
const handle = () => { localStorage.setItem("fakeToken", "1"); window.location = "/profile"; };
return <button onClick={handle}>;
}
