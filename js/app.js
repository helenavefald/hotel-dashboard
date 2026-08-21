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
