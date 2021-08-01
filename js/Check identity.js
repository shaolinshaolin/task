var back = document.getElementById("back"),
    close = document.getElementById("close"),
    container = document.getElementById("container"),
    playerNum = document.getElementById("playerNum"),
    identityKing = document.getElementById("identityKing"),
    identityPlyaer = document.getElementById("identityPlayer"),
    pass = document.getElementById("pass");

//获取玩家页面传来的参数，并转换成数组；
var players = sessionStorage.getItem("player").split(",");

//给顶部两个按钮设置点击事件
back.addEventListener("click", function () {
    window.history.back(-1);
}, false);

close.addEventListener("click", function () {
    if (confirm("是否结束本轮游戏")) {
        window.location.href = "type of play.html";
        sessionStorage.clear();
    }
}, false);

//给传递按钮添加事件
var i = 1;
pass.addEventListener("click", clickCounter, false);

function clickCounter() {
    if (pass.clickcount) {
        pass.clickcount = Number(pass.clickcount) + 1;
    } else {
        pass.clickcount = 1;
    }
    var num = pass.clickcount;
    if (num < players.length * 2) {
        if (num % 2 == 1) {
            changeContent();
            pass.textContent = "隐藏并传递给" + (i + 1) + "号";
            if (playerNum.textContent == players.length) {
                pass.textContent = "法官查看";
            }
        } else if (num % 2 == 0) {
            playerNum.textContent = ++i;
            returnContent();
            pass.textContent = "查看" + i + "号身份";
        }
    } else if (num == (players.length * 2)) {
        window.location.href = "judge.html";
    }

    function changeContent() {
        var playersText = document.createElement("p");
        playersText.textContent = players[(i - 1)];
        playersText.className = "identity-text";
        container.appendChild(playersText);
        identityKing.style.display = "none";
        identityPlyaer.style.display = "block";
    }

    function returnContent() {
        container.removeChild(container.lastChild);
        identityPlyaer.style.display = "none";
        identityKing.style.display = "block";
    }
}