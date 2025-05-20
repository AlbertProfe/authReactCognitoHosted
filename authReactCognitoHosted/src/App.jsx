import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";


function App() {
  const auth = useAuth();
  const navigate = useNavigate();

  const signOutRedirect = async () => {
    try {
      await auth.removeUser(); // Clear client-side state
      navigate("/"); // Show Welcome page immediately
      const clientId = "7kkicfmsl9b0ikcmjf0qos0nc8";
      const logoutUri = "http://localhost:5173/";
      const cognitoDomain =
        "https://eu-central-1jcmngqrxv.auth.eu-central-1.amazoncognito.com";
      // Trigger logout in background
      fetch(
        `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
          logoutUri
        )}`,
        {
          method: "GET",
          credentials: "include",
        }
      ).catch((error) => console.error("Background logout error:", error));
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/"); // Fallback to Welcome page
    }
  };

  if (auth.isLoading) {
    console.log("Auth is loading...");
    return <div>Loading...</div>;
  }

  if (auth.error) {
    console.log("Auth error:", auth.error);
    return <div>Encountering error... {auth.error.message}</div>;
  }

  console.log("Authenticated:", auth.isAuthenticated, "User:", auth.user);

  if (auth.isAuthenticated) {
    return (
      <div>
        <h1>Home</h1>
        <pre>Hello: {auth.user?.profile.email}</pre>
        <pre>ID Token: {auth.user?.id_token}</pre>
        <pre>Access Token: {auth.user?.access_token}</pre>
        <pre>Refresh Token: {auth.user?.refresh_token}</pre>
        <button onClick={signOutRedirect}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
    </div>
  );
}

export default App;
