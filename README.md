# TabTrails

The History in a Web browser gives information about what sites you visited.
It doesn't show the path connecting the URLs as we visit them, i.e., history trails.
This extension allows us to collect the data about the sequence of URLs we visit in each tab within
each window.

+ Within a tab, collects navigation between pages
    including identifying how we got to the current page via 
   + clicking on link
   + typing a URL into the location bar
   + via the back or forward button
   
+ Collects tab creation and closure
+ Collects window creation and closure


We can 
+ start, resume and stop the collection
+ clear the previously collected data
+ export the data in JSON format.
+ store the results across sessions


We currently don't summarize, visualize or analyze the results in the browser.
Instead, we leave that to separate code in R.


The JSON we get is a dictionary.
Each element is an array.
There is one element named "events" which is a time-ordered sequence of the window and tab open, closing and switching events.

Each  other element corresponds to a tab and contains the sequence of pages visited.






https://chrome.google.com/webstore/detail/browsing-graph/mablbgnomenhcddjdmecpkppllklolch?hl=en
https://www.diva-portal.org/smash/get/diva2%3A833178%2FFULLTEXT01.pdf&usg=AOvVaw23lEMA9owGq0H_Gqtd7D7T
