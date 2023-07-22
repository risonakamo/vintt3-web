import {useState,useEffect,useRef} from "react";

import {getWatchStatus} from "apis/vintt3-api";

// update at this speed before receiving a state
const _initialUpdateInterval:number=1000;

// update at this speed once at least one watch has been received
const _updateInterval:number=8000; //ms

/** hook that returns state on the current watch information with polling */
export default function useCurrentWatch()
{
    // the most up to date watch information state
    const [currentWatch,setCurrentWatch]=useState<CurrentWatch|null>(null);
    // if failed to get a watch
    const [noConnection,setNoConnection]=useState<boolean>(false);

    // timer function triggering getting watch updates
    const watchInterval=useRef<number|null>(null);
    // the previous watch state
    const prevWatch=useRef<CurrentWatch|null>(null);
    // if watcher was redeployed at a higher speed
    const redeployedWatcher=useRef<boolean>(false);

    // deploy watcher at initial update speed. triggers only once
    useEffect(()=>{
        deployWatcher(_initialUpdateInterval);
    },[]);

    // watch for when current watch becomes not null to reploy the watcher. no longer triggers upon
    // reployment
    useEffect(()=>{
        // do nothing if already reployed
        if (redeployedWatcher.current)
        {
            return;
        }

        // if prev watch was null, and current is not, got the first state. re-deploy the watcher
        // at a slower speed
        if (prevWatch.current==null && currentWatch!=null)
        {
            console.log("deploying low speed watcher");
            deployWatcher(_updateInterval);
            redeployedWatcher.current=true;
            return;
        }

        prevWatch.current=currentWatch;
    },[currentWatch]);

    /** deploy the current watch setter at some refresh rate. clears out the previous interval if it
     *  exists */
    function deployWatcher(refresh:number):void
    {
        if (watchInterval.current!=null)
        {
            clearInterval(watchInterval.current);
        }

        watchInterval.current=window.setInterval(async ()=>{
            refreshWatch();
        },refresh);
    }

    /** get watch status and update states */
    async function refreshWatch():Promise<void>
    {
        const gotwatch:CurrentWatchResult=await getWatchStatus();

        if (gotwatch.status=="success" && gotwatch.watch)
        {
            setCurrentWatch(gotwatch.watch);
            setNoConnection(false);
        }

        else if (gotwatch.status=="nowatch")
        {
            setCurrentWatch(null);
            setNoConnection(false);
        }

        else
        {
            setNoConnection(true);
        }
    }

    return {
        currentWatch,
        noConnection,
        refreshWatch
    } as const;
}