import React from "react";
import ReactDOM from "react-dom";

import "./index.less";

function IndexMain():JSX.Element
{
  return <>
    {/* <p className="watching">watching...</p> */}
    <div className="watch-status">
      <p className="title">星の乙女と六華の姉妹</p>
      <p>Current Session: <span className="highlighted">0</span> minutes</p>
      <p>Total Time: <span className="highlighted">3.3</span> hours</p>
      <p>Categories:</p>
      <p className="category unselected">None</p>
      <p className="category unselected">Category1: <span className="highlighted">12</span> minutes</p>
      <p className="category unselected">Category2</p>
      <p className="category selected">
        <span className="highlighted">&gt;</span> Category3: <span className="highlighted">45</span> minutes
      </p>
      <p className="add-category">+ Add Category</p>
    </div>
  </>;
}

function main()
{
  ReactDOM.render(<IndexMain/>,document.querySelector(".main"));
}

window.onload=main;