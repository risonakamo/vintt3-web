import React from "react";

import {toFormattedTime} from "lib/timeformat";

import "./watch-status.less";

interface WatchStatusProps
{
  watchStatus:CurrentWatch
}

export default function WatchStatus(props:WatchStatusProps):JSX.Element
{
  const currentTime:FormattedTime=toFormattedTime(props.watchStatus.currentTime);
  const totalTime:FormattedTime=toFormattedTime(props.watchStatus.totalTime);

  return <div className="watch-status">
    <p className="title">{props.watchStatus.name}</p>
    <p>Current Session: <span className="highlighted">{currentTime.value}</span> {currentTime.units}</p>
    <p>Total Time: <span className="highlighted">{totalTime.value}</span> {totalTime.units}</p>
    <p>Categories:</p>

    <div className="categories">
      <p className="category unselected">
        <span className="selection-arrow">&gt;</span> None
      </p>

      <p className="category unselected">
        <span className="selection-arrow">&gt;</span> Category1: <span className="highlighted">12</span> minutes
      </p>

      <p className="category unselected">
        <span className="selection-arrow">&gt;</span> Category2
      </p>

      <p className="category selected">
        <span className="highlighted">&gt;</span> Category3: <span className="selection-arrow">45</span> minutes
      </p>

      <p className="add-category">+ Add Category</p>
    </div>
  </div>;
}