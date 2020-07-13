/**************************************************
                    Script.js
variables:
  - links     -Cache the links the user has visited
  - blockList -Cache the links that are not allowed

Functions:
  setInterval() -Check if user is attempting to access a
                youtube video (every 3 Seconds ). If the URL has not been seen by the
                user then it will make a GET request to the Python server
                when the python server responds then it will recive an
                allowCode : 2
                blockCode : 1


Last Modified: 7/1/2020
******************************************************/

// Cache Lists
var links =[]
var blockList = []




/*******************************
Description:
  This first part runs only once.
  It gets the current link
  and it checks the link with the
  AI, if the AI responds with a 1
  then block the site if it responds
  with a 2 then allow the site


*******************************/
try {
  const Http = new XMLHttpRequest();
  //send to the server/URL
  var u = window.location.href;
  var newU = u.replace(/[/]/g,"|");
  const url='http://127.0.0.1:5000/'+newU;
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange = (e) => {
  //console.log(Http.responseText);
  //if the server responds 1 (Block code)
  if(Http.responseText == 1){
      //FUTURE BLOCK WEBSITE
      document.body.innerHTML = '<h1>BLOCKED</h1>';
  }
  }
}catch(err)
{
  console.log("NOT CONNECTED TO PYTHON SERVER")
}



setInterval(function(){
  if (!links.includes(document.URL))
  {
    links.push(document.URL);
    const Http = new XMLHttpRequest();
    //send to the server/URL
    var u = document.URL;

    // if the user is currently watching a youtube video then this will run
    try
    {
        //Gets the video ID
        var newU = u.match('https:\/\/www\.youtube\.com\/watch[?](.*)')[1];
        //sends the video id with the YT code which will tell the python server
        //to run the youtube blocker instead of the AI
        const url='http://127.0.0.1:5000/YT'+newU;
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = (e) => {
        //console.log(Http.responseText);
        //if the server responds 1 (Block code) then add it to the blockList and then set the video placeholder to be empty
        if(Http.responseText == 1){
            window.location.href = "http://www.youtube.com/";
            //add the link to the block list
            blockList.push(u);
        }

        }
    }catch(err)
    {
      console.log("NOT WATCHING YOUTUBE");
    }

  }else
  {
    if(blockList.includes(document.URL))
    {
      window.location.href = "http://www.youtube.com/";
    }
  }



}, 3000); // 3 Seconds
