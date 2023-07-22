import React,{useState,useEffect,useRef} from "react";
import _ from "lodash";
import cx,{Mapping} from "classnames";

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
  const [currentCategory,setCurrentCategory]=useState<string>("");
  const [newCategoryInputShowing,setNewCategoryInputShowing]=useState<boolean>(false);

  // ref to new cat input text box
  const newCatInputEl=useRef<HTMLInputElement>(null);
  // saving prev state for effect
  const prevCatInputShowing=useRef<boolean>(newCategoryInputShowing);


  // --- effect ---
  // sync current category state from props
  useEffect(()=>{
    setCurrentCategory(props.watchStatus.currentCategory);
  },[props.watchStatus.currentCategory]);

  // change document title on name change
  useEffect(()=>{
    document.title=`Vintt 4 - ${props.watchStatus.name}`;
  },[props.watchStatus.name]);

  // when the new cat input showing state changes, if it is now true, but it was previously
  // false (so not when it changes to false, or changes from true to true (which shouldnt happen)),
  // trigger focus on the cat input element
  useEffect(()=>{
    if (newCategoryInputShowing && !prevCatInputShowing.current)
    {
      newCatInputEl.current?.focus();
    }

    prevCatInputShowing.current=newCategoryInputShowing;
  },[newCategoryInputShowing]);



  // --- functions ---
  /** exit new category input mode, clearing the input and resetting the state */
  function clearNewCatMode():void
  {
    if (!newCatInputEl.current)
    {
      console.error("missing new cat input text box");
    }

    else
    {
      newCatInputEl.current.value="";
    }

    setNewCategoryInputShowing(false);
  }



  // --- HANDLERS ---
  function h_categoryClick(category:string):void
  {
    console.log("changing category:",category);
    changeWatchCategory(category);
    setCurrentCategory(category);
  }

  /** clicked on add new category button. change state so the new category input field
   *  is showing */
  function h_addNewCatClick():void
  {
    setNewCategoryInputShowing(true);
  }

  /** new category input box key event. on enter, perform submit actions */
  function h_newCatInputKey(e:React.KeyboardEvent):void
  {
    if (e.key=="Enter")
    {
      if (!newCatInputEl.current)
      {
        console.error("new cat input box is missing");
        return;
      }

      var newCatText:string|undefined=newCatInputEl.current.value.trim();

      // if user entered nothing, cancel add new category mode
      if (!newCatText)
      {
        console.warn("new cat text was empty, cancelling");
        clearNewCatMode();
        return;
      }

      console.log("submitting");

      console.log("if submit was successful");
      clearNewCatMode();
    }
  }




  // --- RENDER ---
  /** render the category list objects */
  function renderCategories():JSX.Element[]
  {
    return _.map(props.watchStatus.categoryTime,(time:number,category:string):JSX.Element=>{
      return <CategoryStatus category={category} time={time} key={category}
        selected={category==currentCategory} onClick={h_categoryClick}/>;
    });
  }

  // format time
  const currentTime:FormattedTime=toFormattedTime(props.watchStatus.currentTime);
  const totalTime:FormattedTime=toFormattedTime(props.watchStatus.totalTime);

  // classes
  const addCatButtonCx:Mapping={
    hidden:newCategoryInputShowing
  };

  const newCatInputCx:Mapping={
    hidden:!newCategoryInputShowing
  };

  return <div className="watch-status">
    <p className="title">{props.watchStatus.name}</p>
    <p>Current Session: <span className="highlighted">{currentTime.value}</span> {currentTime.units}</p>
    <p>Total Time: <span className="highlighted">{totalTime.value}</span> {totalTime.units}</p>
    <p>Categories:</p>

    <div className="categories">
      {renderCategories()}

      <div className={cx("new-cat-container",newCatInputCx)}>
        <span>+</span>&nbsp;
        <input type="text" className="add-cat-input" placeholder="new category..."
          ref={newCatInputEl} onKeyDown={h_newCatInputKey}/>
      </div>

      <p className={cx("add-category",addCatButtonCx)} onClick={h_addNewCatClick}>+ Add Category</p>
    </div>
  </div>;
}