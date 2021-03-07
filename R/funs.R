
getValue =
function(x, v)
{
    if(v %in% names(x) && length(x[[v]]))
        if(is.character(x[[v]]))
            paste(x[[v]], collapse = ", ")
        else
            x[[v]]
    else
        NA             
}

mkTabDf =
function(x, vars = c("frameId", "parentFrameId", "tabId", "timeStamp", "transitionQualifiers", 
                        "transitionType", "type", "url", "windowId"))
{

    tmp = lapply(vars, function(v)
                         sapply(x, getValue, v))
    names(tmp) = vars
df = as.data.frame(tmp, stringsAsFactors = FALSE)
    names(df) = vars
#    df$timeStamp = mkTimeStamp(df$timeStamp)
    df
}

mkDf =
function(js)
{
    i = grepl("^t[0-9]+$", names(js))
    tmp = lapply(js[ i ], mkTabDf)
    ans = do.call(rbind, tmp)
    ans$tab = rep(names(js)[i], sapply(tmp, nrow))
    ans$timeStamp = mkTimeStamp(ans$timeStamp)
    class(ans) = c("TabTrailsDF", class(ans))


    ev = mkTabDf(js$events, c("tabId", "previousTabId", "windowId", "eventType", "timeStamp", 
                                "id", "focused", "top", "left", "width", "height", "incognito", 
                                  "type", "state", "alwaysOnTop", "title"))
    ev$timeStamp = mkTimeStamp(ev$timeStamp)
    class(ev) = c("BrowserEvents", class(ev))
    
    structure(list(tabs = ans, browserEvents = ev), class = "TabTrailInfo")
}

mkTimeStamp =
function(x)
   structure(x/1000, class = c("POSIXct", "POSIXt"))



plot.TabTrailInfo =
function(x, ...)
{


}
