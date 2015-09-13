document.addEventListener('keyup', function(event){
    //console.log(keyCode + altkey);
    if(event.keyCode === 83){
        if(event.altKey){
            document.getElementById('search').focus();
        }

    }

})


var newsfeed = document.getElementById("newsfeed");
newsfeed.addEventListener('click', function(event){
    var likeButton = event.target.closest('.likeButton');
    if(!likeButton.firstChild.checked){
        likeButton.style.backgroundImage = "url('./asset/like.png')";
        likeButton.getElementsByTagName("input")[0].checked = true;
        console.log(likeButton.parentNode);
        likeButton.parentNode.getElementsByClassName("likeCount")[0].innerHTML = "1";
    }
    else{
        likeButton.style.backgroundImage = "url('./asset/unlike.png')";
        likeButton.getElementsByTagName("input")[0].checked = false;
        likeButton.parentNode.getElementsByClassName("likeCount")[0].innerHTML = "0";
    }
        
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
    var likeToggle = document.createElement('input');
    likeToggle.type = 'raio';
    likeToggle.className = 'likeToggle';
    likeButton.appendChild(likeToggle);
    var commentButton = document.createElement('button');
    commentButton.className = "commentButton";
    var shareButton = document.createElement('button');
    shareButton.className = "shareButton";
    newFeed.appendChild(likeButton);
    newFeed.appendChild(commentButton);
    newFeed.appendChild(shareButton);
	newsfeed.appendChild(newFeed);
    var newHr = document.createElement('hr');
    newHr.style.marginTop = "-3px";
    newHr.style.opacity = "0.5";
    newFeed.appendChild(newHr);
    var num = document.createElement('span');
    num.style.fontSize = "12px";
    num.innerHTML = "0";
    num.className = "likeCount";
    var text = document.createElement('span');
    text.style.fontSize = "12px";
    text.innerHTML = "명이 좋아합니다";
    newFeed.appendChild(num);
    newFeed.appendChild(text);
    
}

window.addEventListener("scroll", function(){
	var scrollToBottom = document.body.scrollHeight - document.body.scrollTop - window.innerHeight;
	if(scrollToBottom < window.innerHeight){
        console.log("adfs");
		var newFeed = document.createElement('div');
        var random = Math.floor(Math.random()*10) + 1;
        var iner = `<div><img width = "456px" height = "330px" src = \"./asset/${random}.jpg\"></div>
        <hr width = "455px" style = "opacity : 0.5"></hr>`;

        newFeed.innerHTML = iner;
        newFeed.classList.add('feed');
        var buttonsDiv = document.createElement('div');
        var likeButton = document.createElement('button');
        likeButton.className = "likeButton";
        var likeToggle = document.createElement('input');
        likeToggle.type = 'raio';
        likeToggle.className = 'likeToggle';
        likeButton.appendChild(likeToggle);
        var commentButton = document.createElement('button');
        commentButton.className = "commentButton";
        var shareButton = document.createElement('button');
        shareButton.className = "shareButton";
        newFeed.appendChild(likeButton);
        newFeed.appendChild(commentButton);
        newFeed.appendChild(shareButton);
        newsfeed.appendChild(newFeed);
        var newHr = document.createElement('hr');
        newHr.style.marginTop = "-3px";
        newHr.style.opacity = "0.5";
        newFeed.appendChild(newHr);
        var num = document.createElement('span');
        num.style.fontSize = "12px";
        num.innerHTML = "0";
        num.className = "likeCount";
        var text = document.createElement('span');
        text.style.fontSize = "12px";
        text.innerHTML = "명이 좋아합니다";
        newFeed.appendChild(num);
        newFeed.appendChild(text);
    

	}

});
