function register() {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    const id = Date.now();

    db.ref("users/" + id).set({
        login,
        password,
        balance: 1000,
        warnings: 0
    });

    alert("Создан аккаунт");
}

function loginUser() {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    db.ref("users").once("value", snap => {
        snap.forEach(user => {
            if (
                user.val().login === login &&
                user.val().password === password
            ) {
                localStorage.setItem("userId", user.key);
                window.location = "main.html";
            }
        });
    });
}

function loginAdmin() {
    const code16 = document.getElementById("code16").value;
    const code3 = document.getElementById("code3").value;

    if (code16 === "2200700589419083" && code3 === "831") {
        localStorage.setItem("admin", true);
        window.location = "admin.html";
    } else {
        alert("Неверный код");
    }
}