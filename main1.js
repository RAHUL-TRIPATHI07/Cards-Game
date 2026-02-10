const skipBtn = document.getElementById("skipBtn");
const video = document.querySelector(".myVideo");
const overlay = document.querySelector(".overlay");
const Login = document.getElementById("login");
const signup1 = document.getElementById("signup1");
const signup2 = document.getElementById("signup2");
const signup3 = document.getElementById("signup3");
const changeToSingUp1 = document.getElementById("changeToSingUp1");
const changeToSingUp2 = document.getElementById("changeToSingUp2");
const changeToSingUp3 = document.getElementById("changeToSingUp3");
const changeToLogin = document.getElementById("changeToLogin");
const loginBtn = document.getElementById("loginBtn");
const signupBtn1 = document.getElementById("signupBtn1");
const singupBtn2 = document.getElementById("singupBtn2");
const singupBtn3 = document.getElementById("singupBtn3");


setTimeout(() => {skipBtn.style.display = "block";},2000);

skipBtn.addEventListener("click", () => {
    video.muted = true;
    //video.pause();
    overlay.style.display = "block";
    skipBtn.style.display = "none";
    setTimeout(() => {
        overlay.style.top = "0";
        Login.style.display = "block";

    }, 5000);
    
});


changeToSingUp1.addEventListener("click", () => {
    angle = -90;
    signup1.style.display = "block";
    signup3.style.display = "none";
    document.getElementById("userInput").style.transform =
    `rotateY(${angle}deg)`;
});

changeToSingUp2.addEventListener("click", () => {
    angle = -180;
    signup2.style.display = "block";
    Login.style.display = "none";
    document.getElementById("userInput").style.transform =
    `rotateY(${angle}deg)`;
});
changeToSingUp3.addEventListener("click", () => {
    angle = -270;
    signup1.style.display = "none";
    signup3.style.display = "block";
    document.getElementById("userInput").style.transform =
    `rotateY(${angle}deg)`;
});
changeToLogin.addEventListener("click", () => {
    angle = -360; 
    signup2.style.display = "none";
    Login.style.display = "block";
    document.getElementById("userInput").style.transform =
    `rotateY(${angle}deg)`;
});

loginBtn.addEventListener("click", async () => {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    });

    let data;

    try {
        data = await res.json();
    } catch {
        alert("Server returned invalid response");
        return;
    }


    if (res.ok) {
        window.location.href = "/lobby";   // 👈 redirect to main.html
    } else {
        alert(data.error);
    }


});

singupBtn3.addEventListener("click", async () => {

    const username = document.getElementById("s1_name").value;
    const age = document.getElementById("s1_age").value;

    const email = document.getElementById("s2_email").value;
    const phone = document.getElementById("s2_phone").value;

    const password = document.getElementById("s3_pass").value;
    const confirm = document.getElementById("s3_confirm").value;

    if(password !== confirm){
        alert("Passwords do not match");
        return;
    }

    const res = await fetch("/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username,
            age,
            email,
            phone,
            password
        })
    });

    const data = await res.json();

    if(res.ok){
        alert("Signup Success");
        window.location.href = "/avatar";
    } else {
        alert(data.error);
    }

});




