import React from "react";

const Home = ({check}) => {

  return (
    <div>
      {check && <h1>i am authorized</h1>}
    </div>
  );
}
 
export default Home;