import { Auth, I18n } from "aws-amplify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";

function Navbar() {
  const [isConnected, setUser] = useState(false);
  const [isMenuOpen, openMenu] = useState(false);
  useEffect(() => {
    const fetchUserStatus = async () => {
      const isConnected = await ionViewCanEnter();
      setUser(isConnected);
    };
    fetchUserStatus();
  }, []);

  async function ionViewCanEnter() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user;
    } catch {
      return false;
    }
  }

  return (
    <nav
      id="header"
      className="fixed w-full z-10 pin-t bg-white border-b border-grey-light"
    >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-4">
        <div className="pl-4 flex items-center gap-2">
          <img src={logo} alt="logo" className="h-8 w-8" />
          <a
            className="text-black text-base no-underline hover:no-underline font-extrabold text-xl"
            href="/"
          >
            Devenir DevOps
          </a>
        </div>
        <div className="block lg:hidden pr-4">
          <button
            id="nav-toggle"
            onClick={() => openMenu(!isMenuOpen)}
            className="flex items-center px-3 py-2 border rounded text-grey border-grey-dark hover:text-black hover:border-purple appearance-none focus:outline-none"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={
            "w-full flex-grow lg:flex  lg:content-center lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 z-20" +
            (isMenuOpen ? " block" : " hidden")
          }
          id="nav-content"
        >
          <div className="flex-1 w-full mx-auto max-w-sm content-center py-4 lg:py-0"></div>
          <ul className="list-reset lg:flex justify-end items-center">
            {isConnected && (
              <li className="mr-3 py-2 lg:py-0">
                <button
                  className="inline-block text-grey-dark no-underline hover:text-black hover:underline py-2 px-4 border shadow rounded bg-pink-100"
                  onClick={() => Auth.signOut()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                </button>
              </li>
            )}
            {!isConnected && (
              <li className="mr-3 py-2 lg:py-0 align-middle">
                <Link
                  className="inline-block flex gap-4 items-center text-grey-dark no-underline hover:text-black hover:underline py-2 px-4 border shadow rounded bg-pink-100 align-middle justify-center"
                  to="/authenticated/"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 inline-block align-middle"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <span className="text-sm inline-block">{I18n.get("Sign In")}</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
