import React from "react";
import Navbar from "../Navbar";
import Banner from "../Banner";
import Details from "../Details";

function Home() {
  return (
    <div className="min-h-[100dvh] bg-transparent safe-bottom">
      <Navbar />
      <Banner />
      <Details />
    </div>
  );
}

export default Home;
