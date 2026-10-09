const input = document.getElementById("password");
const bar = document.getElementById("bar");
const label = document.getElementById("label");
const show = document.getElementById("show");

const commonPasswords = ["password", "123456", "qwerty", "letmein", "admin", "password123"];

// Each rule is a function: give it a password, get true or false
const rules = {
    length: pw => pw.length >= 12,
    upper: pw => /[A-Z]/.test(pw),
    lower: pw => /[a-z]/.test(pw),
    number: pw => /[0-9]/.test(pw),
    symbol: pw => /[^A-Za-z0-9]/.test(pw),
};

const levels = [
    { text: "Very weak", color: "#e53935" },
    { text: "Very weak", color: "#e53935" },
    { text: "Weak", color: "#fb8c00" },
    { text: "Okay", color: "#fdd835" },
    { text: "Strong", color: "#7cb342" },
    { text: "Very strong", color: "#2e7d32" },
];

input.addEventListener("input", () => {
    const pw = input.value;
    let score = 0;

    for (const id in rules) {
        const passed = rules[id](pw);
        document.getElementById(id).classList.toggle("pass", passed);
        if (passed) score++;
    }

    // A common password is weak no matter what rules it passes
    if (commonPasswords.includes(pw.toLowerCase())) score = 0;

    if (pw === "") {
        bar.style.width = "0";
        label.textContent = "Enter a password";
        return;
    }

    bar.style.width = (score / 5) * 100 + "%";
    bar.style.background = levels[score].color;
    label.textContent = levels[score].text;
});

show.addEventListener("change", () => {
    input.type = show.checked ? "text" : "password";
});

