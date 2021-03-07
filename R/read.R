library(RJSONIO)
tr = fromJSON("../Example/TabTrails2.json")

tr2 = lapply(tr, function(x) lapply(x, function(e) { if("timeStamp" %in% names(e)) e$timeStamp = structure(e$timeStamp/1000, class = c("POSIXct", "POSIXt")) ; e}))


tm = structure(sapply(tr2$events, `[[`, "timeStamp"), class = c("POSIXct", "POSIXt"))
ty = sapply(tr2$events, `[[`, "eventType")
chars = c("newWindow" = 2, "closeWindow" = 17, switchedTab = 8)

plot(tm, jitter(rep(1, length(tm)), .1), col = , pch = chars[ty])


