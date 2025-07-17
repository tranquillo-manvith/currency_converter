import { JSX } from "react";
import Link from "next/link";

export default function Navbar(): JSX.Element {
  return (
    <>
      <div className="flex justify-center items-center text-2xl py-[32px]">
        Project Small - 3: Currency Converter
      </div>
      <div>
        <ul>
          <li className="flex gap-[32px] px-[64px]">
            <Link className="hover:text-[#858585]" href={"/"}>
              Home
            </Link>
            <Link className="hover:text-[#858585]" href={"/"}>
              Other Projects
            </Link>
            <Link className="hover:text-[#858585]" href={"/"}>
              Details
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
