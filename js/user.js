const userId = localStorage.getItem("userId");

function loadUser() {
    db.ref("users/" + userId).on("value", snap => {
        const u = snap.val();

        document.getElementById("balance").innerText =
            "Баланс: $" + u.balance;

        document.getElementById("warnings").innerText =
            "Warnings: " + u.warnings;
    });
}

function goFlights() {
    window.location = "flights.html";
}

function logout() {
    localStorage.clear();
    window.location = "index.html";
}

function loadTickets() {
    db.ref("tickets").once("value", snap => {
        let html = "";

        snap.forEach(t => {
            const ticket = t.val();

            if (ticket.userId === userId) {
                html += `
                <div class="card">
                    Рейс: ${ticket.flightId}
                    <br>
                    Место: ${ticket.seatNumber}
                    <br>
                    <button onclick="cancelTicket('${t.key}')">Отмена</button>
                </div>`;
            }
        });

        document.getElementById("tickets").innerHTML = html;
    });
}

function cancelTicket(id) {
    db.ref("tickets/" + id).once("value", snap => {
        const t = snap.val();

        db.ref("users/" + userId).once("value", uSnap => {
            let user = uSnap.val();
            user.balance += 100;

            db.ref("users/" + userId).update(user);
            db.ref("tickets/" + id).remove();
        });
    });
}

loadUser();