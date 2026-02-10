async function loadLobby(){

    const res = await fetch("/profile-data");
    if(!res.ok){
        window.location.href = "/";
        return;
    }

    const data = await res.json();

    document.getElementById("lobbyUsername").innerText = data.username;
    document.getElementById("gamesPlayed").innerText = data.games_played;
    document.getElementById("gamesWon").innerText = data.games_won;
    document.getElementById("totalScore").innerText = data.total_score;

    document.getElementById("lobbyAvatar").src =
        "avatars/" + (data.avatar || "default.png");
}

function playGame(){
    window.location.href = "/main";
}

function openProfile(){
    window.location.href = "/profile";
}

async function logout(){
    await fetch("/logout");
    window.location.href = "/";
}

loadLobby();
