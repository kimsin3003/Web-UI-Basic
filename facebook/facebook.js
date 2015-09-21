var newsfeed = document.getElementById("newsfeed");

//피드 포커싱.
var focusing = {
    childNum : 0,
    focusFunc : function() {
        document.getElementById('search').addEventListener('keyup', function(event) {
            event.stopPropagation();
        });
        window.addEventListener('keyup', function () {
            if(event.keyCode === 74){
                //debugger;
                if(newsfeed.childNodes.length > focusing.childNum + 2)
                    window.scrollTo(0, newsfeed.childNodes[this.childNum+=2].offsetTop);
            }

            else if(event.keyCode === 75){
                if(this.childNum - 2 >= 0)
                    window.scrollTo(0, newsfeed.childNodes[this.childNum-=2].offsetTop);
            }
        }.bind(this));
    }
}

//데이터 업데이트.
var update = {
    page : 1,
    jsonFile : function() {
        return './JSON/page'+this.page+'.json';
    },
    loadData : function(){
        
        if(this.page > 5)
            return false;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', this.jsonFile(), true);
        var curFile = this.jsonFile(this.page);
        
        xmlHttp.addEventListener('readystatechange', function() {
           
            if (xmlHttp.readyState === 4){
                var dataList = JSON.parse(xmlHttp.responseText);
                for(var i = 0; i < dataList.length; i++){
                    makeFeed(dataList[i]);
                }
            }
        });
        this.page++;
        
        xmlHttp.send();
        return true;
    }
};  

//포커싱 set.
focusing.focusFunc();

//초기 화면

update.loadData();

//스크롤 시
window.addEventListener("scroll", function(){
	var scrollToBottom = document.body.scrollHeight - document.body.scrollTop - window.innerHeight;
	if(scrollToBottom < window.innerHeight){
       if(!update.loadData())
           console.log("no more data");
	}

});

// alt + s 누르면 검색창에 focus
document.addEventListener('keyup', function (event) {
    
    if(event.keyCode === 83){
        if(event.altKey){
            document.getElementById('search').focus();
        }
    }
});

//좋아요 버튼 활성화.
newsfeed.addEventListener('click', function(event){
    if(event.target.className != "likeButton")
        return;
    var likeButton = event.target.closest('.likeButton');
    if(!likeButton.firstChild.checked){
        likeButton.style.backgroundImage = "url('./asset/like.png')";
        likeButton.getElementsByTagName("input")[0].checked = true;
        console.log(likeButton.parentNode);
        likeButton.parentNode.getElementsByClassName("like-count")[0].innerHTML++;
    }
    else{
        likeButton.style.backgroundImage = "url('./asset/unlike.png')";
        likeButton.getElementsByTagName("input")[0].checked = false;
        likeButton.parentNode.getElementsByClassName("like-count")[0].innerHTML--;
    }
});

function makeFeed(data){
        console.log(data);
		var newFeed = document.createElement('div');
        var random = Math.floor(Math.random()*10) + 1;
        var iner = `<div class = "writer">${data.writer}</div><div><img width = "456px" height = "330px" src =${data.content}></div>
        <hr width = "455px" style = "opacity : 0.5"></hr>`;

        newFeed.innerHTML = iner;
        newFeed.classList.add('feed');
        var buttonsDiv = document.createElement('div');
        var likeButton = document.createElement('button');
        likeButton.className = "likeButton";
        
        var likeToggle = document.createElement('input');
        likeToggle.type = 'radio';
        likeToggle.className = 'likeToggle';
        likeToggle.checked = data["my-like"];
        likeButton.appendChild(likeToggle);
        if(likeToggle.checked)
            likeButton.style.backgroundImage = "url('./asset/like.png')";
        else
            likeButton.style.backgroundImage = "url('./asset/unlike.png')";
        
        
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
     
        var likeText = document.createElement('span');
        likeText.style.fontSize = "12px";
        likeText.innerHTML = "좋아요 ";
    
        var likeCount = document.createElement('span');
        likeCount.style.fontSize = "12px";
        likeCount.innerHTML = data["like-count"];
        likeCount.className = "like-count";
       
        var commentText = document.createElement('span');
        commentText.style.fontSize = "12px";
        commentText.innerHTML = "댓글 ";
    
        var commentCount = document.createElement('span');
        commentCount.style.fontSize = "12px";
        commentCount.innerHTML = data["comment-count"];
        commentCount.className = "comment-count";
        
        var shareText = document.createElement('span');
        shareText.style.fontSize = "12px";
        shareText.innerHTML = "공유 ";
    
        var shareCount = document.createElement('span');
        shareCount.style.fontSize = "12px";
        shareCount.innerHTML = data["share-count"];
        shareCount.className = "share-count";
        
        newFeed.appendChild(likeText);
        newFeed.appendChild(likeCount);
        newFeed.appendChild(commentText);
        newFeed.appendChild(commentCount); 
        newFeed.appendChild(shareText);   
        newFeed.appendChild(shareCount);
    
}
