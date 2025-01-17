import { useMutation } from "@apollo/client";
import { useState } from "react";
import { SIGNUP } from "../api/user";
import { Link } from "react-router-dom";
import classes from "../pages/SignForms.module.css";

export const SignupPage = () => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("secretMdp2025@");
  const [error, setError] = useState("");

  const [doSignup, { loading, data }] = useMutation(SIGNUP);

  async function submitForm() {
    try {
      await doSignup({
        variables: {
          data: {
            email,
            password,
          },
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.message.includes("duplicate key")) {
        console.error(e);
        setError("Cette adresse email est déjà utilisée");
      } else if (e.message.includes("isStrongPassword")) {
        setError("Votre mot de passe n'est pas assez fort");
      } else if (e.message.includes("email")) {
        setError("Rensegniez une adresse email correcte");
      }
    }
  }

  if (data) {
    return (
      <div>
        <p>Votre inscription est réussie !!</p>
        <p>
          Veuillez vous connecter <Link to={"/signin"}>ici</Link>
        </p>
      </div>
    );
  }

  return (
    <div className={classes.formContainer}>
      <p className={classes.headText}>Inscription</p>
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
        <button className={classes.button}>Créer mon compte</button>
        {loading && <span>Loading...</span>}
      </form>
    </div>
  );
};
