import React from "react";
import _ from "lodash";

import {changeWatchCategory} from "apis/vintt3-api";

import {toFormattedTime} from "lib/timeformat";

import CategoryStatus from "components/category-status/category-status";

import "./watch-status.less";

interface WatchStatusProps
{
  watchStatus:CurrentWatch
}

export default function WatchStatus(props:WatchStatusProps):JSX.Element
{
  // --- HANDLERS ---
  function h_categoryClick(category:string):void
  {
    console.log("changing category:",category);
    changeWatchCategory(category);
  }

  // --- RENDER ---
  function renderCategories():JSX.Element[]
  {
    return _.map(props.watchStatus.categoryTime,(time:number,category:string):JSX.Element=>{
      return <CategoryStatus category={category} time={time} key={category}
        selected={category==props.watchStatus.currentCategory} onClick={h_categoryClick}/>;
    });
  }

  const currentTime:FormattedTime=toFormattedTime(props.watchStatus.currentTime);
  const totalTime:FormattedTime=toFormattedTime(props.watchStatus.totalTime);

  return <div className="watch-status">
    <p className="title">{props.watchStatus.name}</p>
    <p>Current Session: <span className="highlighted">{currentTime.value}</span> {currentTime.units}</p>
    <p>Total Time: <span className="highlighted">{totalTime.value}</span> {totalTime.units}</p>
    <p>Categories:</p>

    <div className="categories">
      {renderCategories()}

      <p className="add-category">+ Add Category</p>
    </div>
  </div>;
}