import React from "react";

function Card({ item }) {
  // console.log(item);
  return (
    <>
      <div className="mt-4 my-3 p-3  dark:bg-slate-800 dark:text-blue">
        <div className="card bg-base-100  shadow-xl w-full dark:bg-slate-800 dark:text-blue   ">
          <figure>
            <img
              className="min-h-92 w-full object-cover m-5"
              src={item.Image}
              alt="bag"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.title}
              <div className="badge bg-green-700 text-amber-50 ml-2">NEW</div>
            </h2>
            <div className="card-actions justify-between py-3">
              <div className="badge badge-outline mx-3">₹{item.price}</div>
              <div className="badge text-white badge-outline bg-green-700 hover:bg-green-800 hover:text-amber-50">
                Buy Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
