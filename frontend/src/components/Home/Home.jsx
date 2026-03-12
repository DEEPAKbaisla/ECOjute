// import React from "react";
// import Navbar from "../Navbar";
// import Banner from "../Banner";
// import Details from "../Details";

// function Home() {
//   return (
//     <div className="min-h-[100dvh] bg-transparent safe-bottom">
//       <Navbar />
//       <Banner />
//       <Details />
//     </div>
//   );
// }

// export default Home;

import React, { lazy, Suspense } from "react";
import Navbar from "../Navbar";
import Banner from "../Banner";

// ✅ Details is below the fold — lazy load it
const Details = lazy(() => import("../Details"));

function Home() {
  return (
    <div className="min-h-[100dvh] bg-transparent safe-bottom">
      <Navbar />
      <Banner />
      <Suspense fallback={<div className="min-h-[400px] bg-gray-50" />}>
        <Details />
      </Suspense>
    </div>
  );
}

export default Home;
