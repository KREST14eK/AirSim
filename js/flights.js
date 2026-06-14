const userId = localStorage.getItem("userId");

function loadFlights() {
    db.ref("flights").on("value", snap => {
        let html = "";

        snap.forEach(f => {
            const flight = f.val();

            html += `
            <div class="card">
                ${flight.from} → ${flight.to}
                <br>
                Цена: $${flight.price}
                <br>
                Места: ${flight.seatsTaken}/${flight.seatsTotal}
                <br>
                <button onclick="buyTicket('${f.key}')">Купить</button>
            </div>`;
        });

        document.getElementById("flights").innerHTML = html;
    });
}

function buyTicket(flightId) {
    db.ref("users/" + userId).once("value", uSnap => {
        let user = uSnap.val();

        db.ref("flights/" + flightId).once("value", fSnap => {
            let f = fSnap.val();

            if (user.balance < f.price) {
                alert("Нет денег");
                return;
            }

            if (f.seatsTaken >= f.seatsTotal) {
                alert("Нет мест");
                return;
            }

            const ticketId = Date.now();

            db.ref("tickets/" + ticketId).set({
                userId,
                flightId,
                seatNumber: f.seatsTaken + 1,
                confirmed: false
            });

            user.balance -= f.price;
            f.seatsTaken++;

            db.ref("users/" + userId).update(user);
            db.ref("flights/" + flightId).update(f);
        });
    });
}

loadFlights();