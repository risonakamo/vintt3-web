/** get current watch information. null if there is no current watch */
export async function getWatchStatus():Promise<CurrentWatchResult>
{
    try
    {
        const gotWatch:CurrentWatch=await (await fetch("/get-watch",{
            method:"GET"
        })).json();

        if (!gotWatch.name)
        {
            return {
                status:"nowatch"
            };
        }

        return {
            status:"success",
            watch:gotWatch
        };
    }

    catch
    {
        return {
            status:"fail"
        };
    }
}

/** send request to change category */
export function changeWatchCategory(category:string):void
{
    const body:SetCategoryReq={
        category
    };

    fetch("/set-category",{
        method:"POST",
        body:JSON.stringify(body),
        headers:{
            "Content-type":"application/json"
        }
    });
}

/** request to open config */
export function openConfig():void
{
    fetch("/open-config",{
        method:"GET"
    });
}

/** request to open timefile */
export function openTimefile():void
{
    fetch("/open-timefile",{
        method:"GET"
    });
}

/** request to create new category. returns success text, or throws error text */
export async function newCategory(name:string):Promise<void>
{
    const body:NewCategoryReq={
        categoryName:name
    };

    const result:Response=await fetch("/new-category",{
        method:"POST",
        body:JSON.stringify(body),
        headers:{
            "Content-Type":"application/json"
        }
    });

    if (result.status!=200)
    {
        throw await result.text();
    }
}