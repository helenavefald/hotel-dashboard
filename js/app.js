let bookingData = [];
let lineData = [];
let productText = "";

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("buildBtn")
        .addEventListener("click", buildPortal);

});

async function buildPortal() {

    await readBooking();
    await readLineItems();
    await readProduct();

    buildDashboard();
    buildTodayPausemat();
    buildWeekPausemat();
    buildProductionList();
    buildForecast();

}

async function readBooking() {

    const file =
        document.getElementById("bookingFile").files[0];

    if (!file) return;

    bookingData =
        (await Papa.parse(file, {
            skipEmptyLines: true
        })).data;

}

async function readLineItems() {

    const file =
        document.getElementById("lineFile").files[0];

    if (!file) return;

    lineData =
        (await Papa.parse(file, {
            skipEmptyLines: true
        })).data;

}

async function readProduct() {

    const file =
        document.getElementById("productFile").files[0];

    if (!file) return;

    const buffer =
        await file.arrayBuffer();

    const workbook =
        XLSX.read(buffer, { type: "array" });

    productText = JSON.stringify(workbook);

}

function setCard(id, value) {

    const el =
        document.getElementById(id);

    if (el)
        el.innerText = value;

}

function buildDashboard() {

    /* Standardverdier til parsingen er ferdig */

    setCard("boende", 295);
    setCard("frokost", 156);
    setCard("lunsj", 98);
    setCard("middag", 103);

    let pausemat = 0;

    lineData.forEach(row => {

        const qty = parseInt(row[4]);

        if (!isNaN(qty))
            pausemat += qty;

    });

    setCard("pausemat", pausemat);

}

function buildTodayPausemat() {

    const container =
        document.getElementById("todayEvents");

    container.innerHTML = "";

    const bookings = {};

    lineData.forEach(row => {

        const booking = row[1];
        const product = row[2];
        const notes = row[3];
        const qty = row[4];
        const location = row[5];

        if (!booking) return;

        if (!bookings[booking]) {

            bookings[booking] = {
                booking,
                notes,
                location,
                products: []
            };

        }

        bookings[booking].products.push({
            product,
            qty
        });

    });

    Object.keys(bookings).forEach(key => {

        const b = bookings[key];

        const div =
            document.createElement("div");

        div.className = "event";

        let list = "";

        b.products.forEach(p => {

            list += `<li>${p.qty} × ${p.product}</li>`;

        });

        div.innerHTML = `

            <h3>${b.booking}</h3>

            <strong>Sted:</strong>
            ${b.location || "-"}

            <ul>
                ${list}
            </ul>

            <div class="notes">
                <strong>📋 Event Notes</strong><br><br>
                ${b.notes || "Ingen notater"}
            </div>

document.addEventListener("DOMContentLoaded", () => {

    const bookingFile =
        document.getElementById("bookingFile");

    const lineFile =
        document.getElementById("lineFile");

    const productFile =
        document.getElementById("productFile");

    const buildBtn =
        document.getElementById("buildBtn");

    let bookingData = null;
    let lineData = null;
    let productData = null;

    bookingFile?.addEventListener("change", e => {

        const file = e.target.files[0];

        Papa.parse(file, {

            header: false,

            complete: result => {

                bookingData = result.data;

                console.log(
                    "BookingSummary lastet:",
                    bookingData
                );

            }

        });

    });

    lineFile?.addEventListener("change", e => {

        const file = e.target.files[0];

        Papa.parse(file, {

            header: false,

            complete: result => {

                lineData = result.data;

                console.log(
                    "Line Items lastet:",
                    lineData
                );

            }

        });

    });

    productFile?.addEventListener("change", async e => {

        const file = e.target.files[0];

        const buffer =
            await file.arrayBuffer();

        const workbook =
            XLSX.read(buffer, {
                type: "array"
            });

        productData = workbook;

        console.log(
            "Product Report lastet:",
            workbook
        );

    });

    buildBtn?.addEventListener("click", () => {

        console.log("Dashboard oppdateres");

        console.log(bookingData);
        console.log(lineData);
        console.log(productData);

        alert(
            "Alle filer er lest inn. Neste steg er å fylle dashboardet."
        );

    });

});
