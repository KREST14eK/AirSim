function createFlight() {
    const id = Date.now();

    db.ref("flights/" + id).set({
        from: from.value,
        to: to.value,
        price: Number(price.value),
        duration: duration.value,
        seatsTotal: Number(seats.value),
        seatsTaken: 0,
        passengersConfirmed: [],
        status: "created"
    });
}

function loadAdminFlights() {
    db.ref("flights").on("value", snap => {
        let html = "";

        snap.forEach(f => {
            const flight = f.val();

            html += `
            <div class="card">
                ${flight.from} → ${flight.to}
                <br>
                Статус: ${flight.status}
                <br>
                <button onclick="nextStatus('${f.key}', '${flight.status}')">
                    Следующий статус
                </button>
                <button onclick="checkPassengers('${f.key}')">
                    Проверить пассажиров
                </button>
            </div>`;
        });

        document.getElementById("adminFlights").innerHTML = html;
    });
}

function nextStatus(id, status) {
    const flow = ["created","boarding","departed","cruise","arrived"];
    const next = flow[flow.indexOf(status) + 1];

    if (!next) return;

    db.ref("flights/" + id).update({ status: next });

    if (next === "departed") {
        applyPenalties(id);
    }
}

function applyPenalties(flightId) {
    db.ref("tickets").once("value", snap => {
        snap.forEach(t => {
            const ticket = t.val();

            if (ticket.flightId === flightId && !ticket.confirmed) {

                db.ref("users/" + ticket.userId).once("value", uSnap => {
                    let user = uSnap.val();
                    user.warnings++;

                    if (user.warnings >= 3) {
                        db.ref("users/" + ticket.userId).remove();
                    } else {
                        db.ref("users/" + ticket.userId).update(user);
                    }
                });

                db.ref("tickets/" + t.key).remove();
            }
        });
    });
}

loadAdminFlights();