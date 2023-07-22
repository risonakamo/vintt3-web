type CategoriesTimes=Record<string,number>
type CurrentWatchResultStatus="success"|"nowatch"|"fail"

/** from rust */
interface CurrentWatch
{
    name: string

    currentTime: number
    currentCategory: string

    totalTime: number

    categoryTime: CategoriesTimes
}

/** wrapper of current watch.
 *  - success: there is a current watch and successfully got it
 *  - nowatch: successfully got a result from the watcher, but there is nothing being
 *    watched yet
 *  - fail: failed to get a result from watcher */
interface CurrentWatchResult
{
    status:CurrentWatchResultStatus
    watch?:CurrentWatch
}

interface SetCategoryReq
{
    category:string
}

interface NewCategoryReq
{
    categoryName:string
}