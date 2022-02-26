import {useState,useEffect} from "react";

import {getWatchStatus} from "apis/vintt3-api";

const _updateInterval:number=8000; //ms

/** hook that returns state on the current watch information with polling */
export default function useCurrentWatch()
{
    const [currentWatch,setCurrentWatch]=useState<CurrentWatch|null>(null);

    // update current watch at some interval
    useEffect(()=>{
        setInterval(async ()=>{
            setCurrentWatch(await getWatchStatus());
        },_updateInterval);
    },[]);

    return currentWatch;
}