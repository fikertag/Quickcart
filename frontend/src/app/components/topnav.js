"use client";
import { useCatagoryContext } from "../context/catagoryContext";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import "boxicons";

const TopNav = () => {
  const { catagory } = useCatagoryContext();
  const user = true;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className=" border-b-2 p-4 text-gray-600 flex items-center justify-around gap-2 mb-6 ">
      {/* // logo */}
      <div className="flex gap-2 ">
        <Link href="/">
          <Image
            src="/Quick_Cart.png"
            alt="Description of the image"
            width={100}
            height={300}
            style={{
              width: "100%",
              height: "auto",
            }}
            priority={true}
          />
        </Link>

        {/* // catagory with drop doun */}
        <div className="flex  ">
          {/* ------------------------------ catagory with dropdoun -------------------- */}
          <button
            to={"/"}
            className=" relative mr-2 flex items-center link-design-1"
            onClick={toggleDropdown}
          >
            <box-icon name="menu"></box-icon>
            <div className="">
              <span className="ml-1 text-base"></span>
              {isOpen && (
                <div className="absolute left-0 top-12 w-64 text-start bg-white shadow-[0_0_5px_2px_rgba(0,0,0,0.1)] border px-2 rounded-xl ">
                  <div className=" relative">
                    <div className="absolute top-[-8px] left-8 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white border"></div>
                    <ul className="py-1 ">
                      {catagory.map((c) => (
                        <li
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          key={c._id}
                        >
                          {c.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* // catagory flex */}
      <div className=" hidden justify-center text-sm font-bold gap-5 py-1">
        {catagory &&
          catagory.map((c) => (
            <Link href="/" className=" link-design-1 " key={c._id}>
              {c.name}
            </Link>
          ))}
      </div>

      {/* // login log out */}
      <div className="flex items-center justify-between gap-2">
        {/* ----------------------------------------- login ---------------------------------- */}
        <div className="">
          {!user && (
            <Link href="/login" className="link-design-1">
              {" "}
              Sign in{" "}
            </Link>
          )}
          {user && (
            <div className="flex items-center gap-2 whitespace-nowrap">
              <Link href="/about/profile">{user.email}</Link>
              <button
                // onClick={handleClick}
                className="bg-primary rounded-full text-white px-4 py-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        {/* --------------------------------- cart and like icon -------------------------- */}
        <Link
          href="cart"
          className=" flex items-center justify-center h-8 w-8 hover:bg-sky-100 rounded-full"
        >
          <box-icon name="heart" size="25px"></box-icon>
        </Link>
      </div>
    </header>
  );
};

export default TopNav;
