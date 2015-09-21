var twits = document.getElementById("twits");

//마우스 올리면 text 칸 커짐.
document.getElementById("twit-to-write-content").addEventListener('focus', function(event){
    var textbox = event.target;
    textbox.style.height = "100px";
    
});

//마우스 내리면 text 칸 작아짐.
document.getElementById("twit-to-write-content").addEventListener('focusout', function(event){
    var textbox = event.target;
    if(textbox.value.length == 0)
        textbox.style.height = "30px";
    
});

//입력들어오면 send버튼 변화
document.addEventListener('keydown', function(event){
    if(document.activeElement.id == "twit-to-write-content"){
        var content = document.getElementById("twit-to-write-content");
        document.getElementById("num-of-letter").innerHTML = content.value.length;
        if(content.value.length > 0){
            document.getElementById("send-button").firstChild.className = "fa fa-paper-plane";
        }
    }
});

//send버튼 누르면 전송
document.getElementById("send-button").addEventListener('click', function(event){
    var sendButton;
    if(event.target.id == "send-button")
        sendButton = event.target;
    else
        sendButton = event.target.parentNode;
    
    if(sendButton.firstChild.className == "fa fa-paper-plane-o"){
        sendButton.firstChild.className = "fa fa-paper-plane";
        
    }
    else{
        var twitContent = document.getElementById("twit-to-write-content").value;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('POST', 'http://api.taegon.kim/posts', true);
        xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlHttp.send(`content=${twitContent}&username=${"KimTaeWoo"}"`);
        document.getElementById("twit-to-write-content").value = "";
        document.getElementById("twit-to-write-content").style.height = "30px";
        document.getElementById("num-of-letter").innerHTML = 0;
        sendButton.firstChild.className = "fa fa-paper-plane-o";
    }
    
    return true;
});


//favorite 버튼 처리
twits.addEventListener('click', function(event){
    
    var favoriteButton;
    if(event.target.className == "favoriteButton")
        favoriteButton = event.target;
    else if(event.target.className == "fa fa-star-o"){
        favoriteButton = event.target.parentNode;
    }
    else if(event.target.className == "fa fa-star"){
        favoriteButton = event.target.parentNode;
    }
    else
        return;
    
    
    if(favoriteButton.firstChild.className == "fa fa-star-o"){
        
        favoriteButton.firstChild.className = "fa fa-star";
        favoriteButton.parentElement.getElementsByClassName("favoriteNum")[0].innerHTML++;
        
        var favoriteNum = favoriteButton.parentElement.getElementsByClassName("favoriteNum")[0].innerHTML;
        var postId = event.target.closest(".twit").getElementsByClassName("userId")[0].innerHTML;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('POST', `http://api.taegon.kim/posts/${postId}/favorite`, true);
        xmlHttp.send();
    }
    else{
        console.log(favoriteButton);
        favoriteButton.firstChild.className = "fa fa-star-o";
        favoriteButton.parentElement.getElementsByClassName("favoriteNum")[0].innerHTML--;
        
        var favoriteNum = favoriteButton.parentElement.getElementsByClassName("favoriteNum")[0].innerHTML;
        var postId = event.target.closest(".twit").getElementsByClassName("userId")[0].innerHTML;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('DELETE', `http://api.taegon.kim/posts/${postId}/favorite`, true);
        xmlHttp.send();
    }
    
    
});


//마우스 올리면 트윗 카드 색변화
document.getElementById("twits").addEventListener('mouseover', function(event){
    if(event.target.className == "twit") 
        event.target.style.backgroundColor = "skyblue";
});

//마우스 내리면 트윗 카드 색변화
document.getElementById("twits").addEventListener('mouseout', function(event){
    if(event.target.className == "twit") 
        event.target.style.backgroundColor = "white";
});




//데이터 업데이트.
var update = {
    page : 1,
    jsonFile : function() {
        return 'http://api.taegon.kim/posts/page/' + this.page;
    },
    loadData : function(){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', this.jsonFile(), true);
        xmlHttp.addEventListener('readystatechange', function() {
            if (xmlHttp.readyState === 4){
                console.log(JSON.parse(xmlHttp.responseText)["posts"]);
                var dataList = JSON.parse(xmlHttp.responseText)["posts"];
                for(var i = 0; i < dataList.length; i++){
                    makeTwit(dataList[i]);
                }
            }
        });
        this.page++;
        
        xmlHttp.send();
        return true;
    }
}; 

function makeTwit(data){
    var newTwit = document.createElement('div');
    newTwit.className = "twit";
    
    var profileImg = document.createElement('div');
    var Img = document.createElement('img');
    Img.className = "profileImg";
    Img.src = "./asset/profile-img.png";
    profileImg.appendChild(Img);
    profileImg.classList.add("content-col");
    
    var contentBox = document.createElement('div');
    contentBox.classList.add("content-col");
    contentBox.classList.add("contentBox");
    
    var userName = document.createElement('span');
    userName.className = "userName";
    userName.innerHTML = data.username;
    var userId = document.createElement('span');
    userId.className = "userId";
    userId.innerHTML = data.id;
    var content = document.createElement('div');
    content.innerHTML = data.content;
    
    contentBox.appendChild(userName);
    contentBox.appendChild(userId);
    contentBox.appendChild(content);
    
    
    var commentButton = document.createElement('span');
    var commentIcon = document.createElement('i');
    commentIcon.className = "fa fa-comment";
    commentButton.appendChild(commentIcon);
    commentButton.className = "commentButton";
    
    var retweetButton = document.createElement('span');
    var retweetIcon = document.createElement('i');
    retweetIcon.className = "fa fa-retweet";
    retweetButton.appendChild(retweetIcon);
    retweetButton.className = "retweetButton";
    
    var favoriteButton = document.createElement('span');
    var favoriteIcon = document.createElement('i');
    favoriteIcon.className = "fa fa-star-o";
    favoriteButton.appendChild(favoriteIcon);
    favoriteButton.className = "favoriteButton";
    
    var favoriteNum = document.createElement('span');
    favoriteNum.className = "favoriteNum";
    favoriteNum.innerHTML = data.favorite;
    
    contentBox.appendChild(commentButton);
    contentBox.appendChild(retweetButton);
    contentBox.appendChild(favoriteButton);
    contentBox.appendChild(favoriteNum);
    
    newTwit.appendChild(profileImg);
    newTwit.appendChild(contentBox);
    
    twits.appendChild(newTwit);
}

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


