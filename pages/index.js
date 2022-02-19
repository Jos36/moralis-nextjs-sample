import { useState } from "react";
import { useMoralis } from "react-moralis";

export default function Home() {
  const {
    isAuthenticated,
    isAuthenticating,
    authenticate,
    user,
    logout,
    setUserData,
  } = useMoralis();
  console.log(isAuthenticated);
  const [inputValue, setInputValue] = useState("");
  if (!isAuthenticated) {
    return (
      <div>
        <button
          onClick={() => authenticate({ type: "sol" })}
          disabled={isAuthenticating}
        >
          Login
        </button>
        {isAuthenticating ? <p>waiting for auth</p> : ""}
      </div>
    );
  }

  return (
    <div>
      <p>welcome {user.getUsername()}</p>
      <p>phantom wallet: {user.get("solAddress")}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(inputValue);
          if (inputValue.trim() !== "") {
            setUserData({ username: inputValue });
          }
        }}
      >
        <input
          placeholder="username"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button>Change my username please</button>
      </form>

      <button onClick={logout}>logout</button>
    </div>
  );
}
