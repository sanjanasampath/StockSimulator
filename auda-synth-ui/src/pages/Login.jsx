import { useState } from "react";
import Input from "../components/TextBox";
import Button from "../components/Button";
import { useAuth } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword((prevCheck) => !prevCheck);
  }

  async function onLogin(evt) {
    evt.preventDefault();
    // form
    const form = evt.target;
    const formData = new FormData(form);
    const userName = formData.get("username");
    const password = formData.get("password");
    if (!userName) setErrorMessage("UserName cannot be empty!");
    else if (!password) setErrorMessage("Password cannot be empty!");
    else {
      const user = await login(userName, password);
      console.log("login:", user);
      if (user && user.id) {
        navigate("/dashboard");
      } else {
        console.log("user not logged in");
        setErrorMessage(`Username or Password Incorrect.\n Please try again!`);
      }
    }
  }

  return (
    <div className="bg-background min-w-screen min-h-screen flex flex-col items-center justify-center align-middle">
      <div className="max-w-md md:max-w-7xl">
        <a href="/login">
          <img
            src="https://audasynth.com/wp-content/uploads/elementor/thumbs/uniti-no-bg-1-e1707838232505-qkvqwfiu0e5zyl2n9p0oxhn2sjxob96p8gzrl3aq5e.png"
            alt="logo"
            className="w-52 mb-8 mx-auto block"
          />
        </a>

        <div className="p-8 rounded bg-navBackground shadow">
          <h2 className="p-4 text-brand text-center text-2xl font-bold">
            Sign in
          </h2>
          <form className="mt-4 space-y-4" method="post" onSubmit={onLogin}>
            {errorMessage && (
              <div className="p-2 text-center text-red-500 whitespace-pre-line">
                {errorMessage}
              </div>
            )}
            <div>
              <div className="bg-textboxBackground rounded relative flex items-center">
                <Input name="username" placeholder="Username" type="text" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>
            <div>
              <div className="bg-textboxBackground rounded relative flex items-center">
                <Input
                  name="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4 cursor-pointer"
                  viewBox="0 0 128 128"
                  onClick={handleShowPassword}
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4">
              <div className="text-sm">
                <a
                  href="#"
                  className="text-brand underline hover:text-brandHover font-semibold"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="flex !mt-8 w-80 align-middle justify-center">
              <Button customStyles="rounded-md w-full">
                {loading ? <LoadingSpinner /> : "Sign in"}
              </Button>
            </div>
            <p className="text-brand text-sm !mt-8 text-center">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-brand underline hover:text-brandHover ml-1 whitespace-nowrap font-semibold"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
