document.addEventListener("DOMContentLoaded", () => {

    const editableElements = document.querySelectorAll(
        "h1,h2,h3,h4,p,li,strong,label,.footer-pill,.dashboard-pill,.staff-name,.role-header,.quick-title"
    );

    editableElements.forEach(element => {
        element.contentEditable = true;
    });

});

async function saveCopy() {

    try {

        const cssResponse = await fetch("style.css");
        const css = await cssResponse.text();

        const jsResponse = await fetch("script.js");
        const js = await jsResponse.text();

        let html = document.documentElement.outerHTML;

        html = html.replace(
            '<link rel="stylesheet" href="style.css">',
            `<style>\n${css}\n</style>`
        );

        html = html.replace(
            '<script src="script.js"></script>',
            `<script>\n${js}\n<\/script>`
        );

        const blob = new Blob(
            [html],
            { type: "text/html" }
        );

        const a = document.createElement("a");

        const date = new Date();

        const filename =
            "SpectrumDashboard_" +
            date.getFullYear() + "-" +
            String(date.getMonth() + 1).padStart(2, "0") + "-" +
            String(date.getDate()).padStart(2, "0") +
            ".html";

        a.href = URL.createObjectURL(blob);
        a.download = filename;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    } catch (error) {

        alert(
            "Could not create portable file. Make sure index.html, style.css and script.js are all in the same folder."
        );

        console.error(error);
    }
}function exportPDF() {

    const element = document.querySelector(".page");

    if (!element) {
        alert("Could not find .page element");
        return;
    }

    if (typeof html2pdf === "undefined") {
        alert("html2pdf library not loaded");
        return;
    }

    const opt = {
        margin: 0,
        filename: "Spectrum-Youth-Club.pdf",
        image: {
            type: "jpeg",
            quality: 1
        },
        html2canvas: {
            scale: 2,
            backgroundColor: "#12002e"
        },
        jsPDF: {
            unit: "px",
            format: [1200, element.scrollHeight]
        }
    };

    html2pdf()
        .set(opt)
        .from(element)
        .save();
}