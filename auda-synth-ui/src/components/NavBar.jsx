import React from "react";
import SettingsIcon from "./SettingsIcon";
import { routes } from "../constants/routes";
import ModalResetAC from "../parts/ModalResetAC";
import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";

function NavBar({ balance, setBalance }) {
  const [resetAccountModal, setResetAccountModal] = useState(false);
  const user = useAuth();

  function handleResetAC() {
    console.log("reset ac");
    setResetAccountModal(true);
  }
  return (
    <header className="bg-navBackground h-20 px-4 header z-10 shadow-elevation1 fixed  items-center bottom-0 inset-x-0 sm:static lg:gap-12">
      <div className="flex flex-1 h-full overflow-x-auto no-scrollbar ">
        <img
          alt="logo"
          className="mt-2 p-2 w-120 h-full sm:w-142 sm:h-16"
          src="https://audasynth.com/wp-content/uploads/elementor/thumbs/uniti-no-bg-1-e1707838232505-qkvqwfiu0e5zyl2n9p0oxhn2sjxob96p8gzrl3aq5e.png"
        />

        <div className="flex flex-1 overflow-x-auto no-scrollbar">
          <nav
            aria-label="Main"
            data-orientation="horizontal"
            dir="ltr"
            className="relative z-10 flex-1 items-center justify-normal hidden lg:flex text-base nav-list no-scrollbar overflow-y-auto"
          >
            <div className="flex">
              <ul className="px-3 flex flex-1 list-none justify-left items-stretch space-x-2 gap-6 text-white">
                {routes.map(({ name, path }) => (
                  <li key={name} className="relative overflow-visible">
                    <a
                      href={path}
                      className="py-4 px-4 lg:py-0 lg:px-0 text-highLight hover:bg-interactive-interactiveBgHover text-t-secondary font-medium lg:gap-1 md:bg-transparent hover:lg:bg-transparent lg:whitespace-nowrap h-full flex items-center whitespace-nowrap gap-1"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="flex items-center gap-6">
            {/* <button ><LanguageIcon></LanguageIcon></button> */}
            <button onClick={handleResetAC}>
              <SettingsIcon></SettingsIcon>
            </button>
            {/* <Button variant="brand" customStyles="rounded-full" size="md">Connect Wallet</Button> */}
          </div>
        </div>
      </div>
      {resetAccountModal && user && (
        <ModalResetAC
          resetAccountModal={resetAccountModal}
          setResetAccountModal={setResetAccountModal}
          balance={balance}
          setBalance={setBalance}
        ></ModalResetAC>
      )}
    </header>
  );
}

export default NavBar;
