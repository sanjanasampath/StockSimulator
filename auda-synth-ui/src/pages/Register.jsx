import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/TextBox";
import Button from "../components/Button";
import { useAuth } from "../providers/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

function Register() {
  const { register, loading } = useAuth();
  const [errorUserNameMessage, setErrorUserNameMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  function handleUsernameValidation(username) {
    if (username.length === 0) {
      setErrorUserNameMessage("Username cannot be empty");
    } else if (username.length < 4 || username.length > 15) {
      setErrorUserNameMessage(
        "Username should be in between 4 - 15 characters"
      );
    } else setErrorUserNameMessage("");
  }

  function handleEmailValidation(email) {
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter valid Email!");
    } else setErrorMessage("");
  }

  function handleShowPassword() {
    setShowPassword((prevCheck) => !prevCheck);
  }

  function handleShowConfirmPassword() {
    setShowConfirmPassword((prevCheck) => !prevCheck);
  }

  function handlePasswordValidation(passwordValue) {
    if (passwordValue.length <= 5 || passwordValue.length > 12) {
      setErrorMessage("Password should contain 6 to 12 characters");
    } else {
      setPassword(passwordValue);
      setErrorMessage("");
    }
  }

  function handleConfirmPasswordValidation(confirmPasswordValue) {
    if (confirmPasswordValue !== password) {
      setErrorMessage("Passwords did not match");
    } else {
      setErrorMessage("");
    }
  }

  async function onRegister(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const acceptTerms = formData.get("acceptTerms");
    if (errorUserNameMessage || errorMessage) {
      // setErrorMessage('Cannot proceed with errors. Please try again!');
      // return;
    }
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage("Fields cannot be empty!");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords did not match!");
      return;
    }
    if (!acceptTerms) {
      setErrorMessage("Please accept the terms and conditions!");
      return;
    }

    try {
      const registerResp = await register(username, email, password);
      console.log(registerResp);
      if (registerResp.status === "fail") {
        setErrorMessage(
          `${registerResp.message} \n Please try with unique name combination!`
        );
      } else if (registerResp._id) {
        setErrorMessage(false);
        setSuccessMessage(true);
        form.reset();
      }
    } catch (error) {
      console.log("Registration failed:", error);
      setErrorMessage(
        "Registration failed, Please refresh the page and try again!"
      );
    }
  }

  return (
    <div className="bg-background min-w-screen min-h-screen flex flex-col items-center justify-center align-middle p-4">
      <div className="max-w-md w-full mx-auto relative z-50 ">
        <div className="text-center mb-8">
          <a href="/register">
            <img
              src="https://audasynth.com/wp-content/uploads/elementor/thumbs/uniti-no-bg-1-e1707838232505-qkvqwfiu0e5zyl2n9p0oxhn2sjxob96p8gzrl3aq5e.png"
              alt="company logo"
              className="w-48 inline-block"
            />
          </a>
        </div>
        <div className="bg-navBackground shadow rounded-md p-6">
          <div className="">
            <h3 className="p-4 text-brand text-xl text-center font-extrabold">
              Create an account
            </h3>
          </div>
          <form onSubmit={onRegister} className="w-full">
            {successMessage && (
              <div className="p-4 text-center text-green-600 whitespace-pre-line">
                Account created successfully, please{" "}
                <Link to="/Login" className="underline">
                  Login
                </Link>
              </div>
            )}
            {(errorMessage || errorUserNameMessage) && (
              <div className="p-4 text-center text-red-500 whitespace-pre-line">
                {errorMessage}
                {errorUserNameMessage}
              </div>
            )}
            <div className="space-y-6">
              <div>
                <div className="bg-textboxBackground rounded relative flex items-center">
                  <Input
                    name="username"
                    placeholder="Username"
                    onChange={(e) => handleUsernameValidation(e.target.value)}
                    autoComplete="given-name"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#FFF"
                    className="w-4 h-4 absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
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
                    name="email"
                    placeholder="Email"
                    type="email"
                    onBlur={(e) => handleEmailValidation(e.target.value)}
                    autoComplete="email"
                    required
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#FFF"
                    className="w-4 h-4 absolute right-4"
                    viewBox="0 0 682.667 682.667"
                  >
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path
                          d="M0 512h512V0H0Z"
                          data-original="#000000"
                        ></path>
                      </clipPath>
                    </defs>
                    <g
                      clipPath="url(#a)"
                      transform="matrix(1.33 0 0 -1.33 0 682.667)"
                    >
                      <path
                        fill="none"
                        strokeMiterlimit="10"
                        strokeWidth="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div className="bg-textboxBackground rounded relative flex items-center">
                  <Input
                    name="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => handlePasswordValidation(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#FFF"
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
              <div>
                <div className="bg-textboxBackground rounded relative flex items-center">
                  <Input
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={(e) =>
                      handleConfirmPasswordValidation(e.target.value)
                    }
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#FFF"
                    className="w-4 h-4 absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                    onClick={handleShowConfirmPassword}
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-1 px-6 mb-2">
                <Input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  value="accept"
                />
                <label
                  htmlFor="acceptTerms"
                  className="ml-3 block text-sm text-brand"
                >
                  I accept the{" "}
                  <a
                    href="/register"
                    className="text-brand font-semibold underline hover:text-brandHover ml-1"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <div className="flex !mt-10 items-center">
              <Button customStyles="rounded-md w-full">
                {loading ? <LoadingSpinner /> : "Create Account"}
              </Button>
            </div>
            <p className="text-sm mt-6 text-center text-brand">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-brand font-semibold underline hover:text-brandHover ml-1"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
