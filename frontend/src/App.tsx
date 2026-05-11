import axios from "axios"
import { useGoogleLogin } from '@react-oauth/google'

function App() {

  const login = useGoogleLogin({

    flow: "auth-code",

    onSuccess: async (codeResponse) => {

      try {
        const resp = await axios.post("http://localhost:5000/api/auth/google", {
          credential: codeResponse.code
        });
      } catch (error) {
        console.log(`Error logging user -> ${error}`);
      }
    },

    onError: () => {
      console.log("Google login failed");
    }
  });

  return (
    <>
      <div style={{height: "100vh", width: "100%", display: "flex", justifyContent: "center"}}>
        <p style={{
          width: "200px",
          height: "20px",
          backgroundColor: "white",
          border: "1.5px solid black",
          paddingRight: "20px",
          paddingLeft: "20px",
          textAlign: "center",
          paddingTop: "10px",
          paddingBlock: "10px",
        }} onClick={login}>
          Continue with google
        </p>
      </div>
    </>
  )
}

export default App
