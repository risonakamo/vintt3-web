import React from "react";

import "./watch-status.less";

interface WatchStatusProps
{

}

export default function WatchStatus(props:WatchStatusProps):JSX.Element
{
  return <div className="watch-status">
    <p className="title">星の乙女と六華の姉妹</p>
    <p>Current Session: <span className="highlighted">0</span> minutes</p>
    <p>Total Time: <span className="highlighted">3.3</span> hours</p>
    <p>Categories:</p>

    <div className="categories">
      <p className="category unselected">None</p>
      <p className="category unselected">Category1: <span className="highlighted">12</span> minutes</p>
      <p className="category unselected">Category2</p>
      <p className="category selected">
        <span className="highlighted">&gt;</span> Category3: <span className="highlighted">45</span> minutes
      </p>
      <p className="add-category">+ Add Category</p>
    </div>
  </div>;
}