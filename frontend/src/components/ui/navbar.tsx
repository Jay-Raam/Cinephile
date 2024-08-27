"use client";

import { AlignJustify, X } from "lucide-react";
import Link from "next/link";
import Dark from "../DarkMode";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-black text-white p-4 shadow-md">
      <div className="mx-auto flex justify-between items-center">
        <div className="logo">
          <Link href="/">
            <h1 className="text-3xl font-bold ml-0 lg:ml-10 uppercase">
              Cinephile
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-4 lg:hidden">
          <span
            className={`text-2xl cursor-pointer flex items-center gap-2}`}
            onClick={handleNavToggle}
          >
            {isOpen ? <X /> : <AlignJustify />}
          </span>
          <span className="dark-mode">
            <Dark />
          </span>
        </div>
        <div className="navlink hidden lg:block">
          <ul className="w-full text-white p-4 flex items-center justify-center gap-6">
            <li>
              <Link
                href="/fav"
                className="hover:text-gray-400 font-normal"
                onClick={handleNavToggle}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                className="hover:text-gray-400 font-normal"
                onClick={handleNavToggle}
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="hover:text-gray-400 font-normal"
                onClick={handleNavToggle}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="hover:text-gray-400 font-normal"
                onClick={handleNavToggle}
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="hover:text-gray-400 font-normal"
                onClick={handleNavToggle}
              >
                Login
              </Link>
            </li>
            <li>
              <Dark />
            </li>
          </ul>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-16 left-0 z-50 w-full bg-black text-white p-4 flex flex-col gap-5 justify-center items-center lg:hidden">
          <li>
            <Link
              href="/fav"
              className="hover:text-gray-400 font-normal"
              onClick={handleNavToggle}
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              href="/search"
              className="hover:text-gray-400 font-normal"
              onClick={handleNavToggle}
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="hover:text-gray-400 font-normal"
              onClick={handleNavToggle}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="hover:text-gray-400 font-normal"
              onClick={handleNavToggle}
            >
              Register
            </Link>
          </li>

          <li>
            <Link
              href="/login"
              className="hover:text-gray-400 font-normal"
              onClick={handleNavToggle}
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
