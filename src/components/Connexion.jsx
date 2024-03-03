import SignImage from "../assets/R.jpeg";
import { useState } from "react";
// import { useHistory } from "react-router-dom";

const Connexion = () => {
  const [codeSecret, setCodeSecret] = useState("");
//   const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    if (codeSecret === "votre_code_secret") {
    //   history.push("/admin");
    } else {
      console.error("Code secret incorrect");
    }
  };

  return (
    <div className="max-w-[360px] rounded-xl m-auto px-4 bg-gradient-green-yellow z-30 py-[4rem] pb-20 xs:px-5">
      <div className="flex flex-wrap justify-between w-full">
        <div className="">
          <h3 className="text-3xl font-bold xs:text-[1.7rem]">Connexion</h3>
          <p className="text-[15px] font-medium mt-2 text-dark/70">
            Accéder à votre
            <br />
            AtounAfrica
          </p>
        </div>

        <div className="z-0">
          <img
            className="w-full h-full max-w-[150px] translate-y-8"
            src={SignImage}
            alt="Connexion"
          />
        </div>
      </div>

      <div className="w-full mt-4">
        <form className="z-10" action="" method="post">
          <span className="absolute top-1/2 left-3 text-[17px] -translate-y-1/2">
            🔐
          </span>

          <input
            className="pl-6 w-full"
            type="password"
            placeholder="Code secret"
            value={codeSecret}
            onChange={(e) => setCodeSecret(e.target.value)}
            required
          />

          <div className="bg-red px-3 py-2 flex items-center justify-center relative bg-primary text-dark rounded-[8px] mt-3 mb-2 text-center cursor-pointer">
            <button
              type="submit"
              className="text-center font-semibold align-middle w-full text-light"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Connexion;
