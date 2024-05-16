import React from "react";
import { Navbar } from "./components/navbar";
import "../../public/styles/global.css";
import SearchBox from "./components/searchbox";

export default function Home() {
  return (<div>
    <Navbar/>
    <SearchBox/>
  </div>
  );
}
