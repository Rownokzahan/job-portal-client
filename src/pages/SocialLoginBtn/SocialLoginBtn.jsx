import { useContext } from "react";
import "./SocialLoginBtn.css";
import { AuthContext } from "../../provider/AuthProvider";


const SocialLoginBtn = () => {

  const { googleLogin } = useContext(AuthContext);

  const handleGoogleLogin = () => {
    googleLogin();
  }

  return (
    <div className=" social-button-container w-50 mt-3">
      <button className="border-0" onClick={handleGoogleLogin}>
        <img
          className=" social-button"
          src="https://i.ibb.co/gSTHXZJ/google-btn.png"
          alt=""
        />
      </button>
      <div className="">
        <img
          className=" social-button"
          src="https://i.ibb.co/g9f4P0S/github-btn.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default SocialLoginBtn;
