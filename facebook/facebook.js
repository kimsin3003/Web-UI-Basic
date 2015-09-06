var newsfeed = document.getElementById("newsfeed");
newsfeed.addEventListener('click', function(event){
    var likeButton = event.target.closest('.likeButton');
    likeButton.style.backgroundImage = "url('./asset/like.png')";
    console.log(event.target.closest('button').backgroundImage);
});
for(i = 0; i < 3; i++){
	var newFeed = document.createElement('div');
	var iner = `<div><img width = "456px" height = "330px" src = \"./asset/${i+1}.jpg\"></div>
	<hr width = "455px" style = "opacity : 0.5"></hr>`;

    newFeed.innerHTML = iner;
	newFeed.classList.add('feed');
    var buttonsDiv = document.createElement('div');
    var likeButton = document.createElement('button');
    likeButton.className = "likeButton";
    var commentButton = document.createElement('button');
    commentButton.className = "commentButton";
    var shareButton = document.createElement('button');
    shareButton.className = "shareButton";
    newFeed.appendChild(likeButton);
    newFeed.appendChild(commentButton);
    newFeed.appendChild(shareButton);
	newsfeed.appendChild(newFeed);
    
}

window.addEventListener("scroll", function(){
	var body = document.body;
	var scrollToBottom = body.scrollHeight - body.scrollTop;
	
	if(scrollToBottom < window.innerHeight){
		var newDiv = document.createElement('div');
		var newHr = document.createElement('hr');
		newDiv.classList.add("feed");
		newDiv.appendChild(newHr);
		newsfeed.appendChild(newDiv);


	}

});
