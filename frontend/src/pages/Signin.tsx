import { useMutation } from "@apollo/client";
import { useState } from "react";
import { SIGNIN } from "../api/user";
import { useNavigate } from "react-router-dom";
import { WHOAMI } from "../api/user";
import classes from "../pages/SignForms.module.css";

export const SigninPage = () => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("secretMdp2025@");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [doSignin, { loading }] = useMutation(SIGNIN, {
    refetchQueries: [WHOAMI],
  });

  async function submitForm() {
    try {
      const { data } = await doSignin({
        variables: {
          email,
          password,
        },
      });
      if (data.signin) {
        console.log(data.signin);
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e);
      setError(e.message);
    }
  }

  return (
    <div className={classes.formContainer}>
      <p className={classes.headText}>Connexion</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        <label htmlFor="email"> Email * </label>
        <input
          className={classes.textField}
          required
          type="email"
          value={email}
          placeholder="Entrer votre email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password"> Mot de passe * </label>
        <input
          className={classes.textField}
          type="password"
          required
          value={password}
          placeholder="Entrez votre mot de passe"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={classes.button}>Me connecter</button>
        {loading && <span>Loading...</span>}
      </form>
    </div>
  );
};
