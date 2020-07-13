/*****************************
        background.js

variables:
  -defaultFilters -This is a list that contains the websites to block


functions:
  callback() - this function will return true


Last Modified: 6/24/2020
*****************************/






var defaultFilters = [
"*://*.instagram.com/*",
"*://*.facebook.com/*",
"*://*.snapchat.com/*",
]




var callback = function(details) {
    return { cancel: true }
};

//This will listen for every request and before the page loads it will block it
chrome.webRequest.onBeforeRequest.addListener(
        callback, { urls: defaultFilters },["blocking"] );
