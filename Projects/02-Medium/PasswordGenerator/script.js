const result = document.getElementById("result");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const message = document.getElementById("message");

const sets = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    number: "0123456789",
    symbol: "!@#$%^&*()-_=+[]{};:,.?",
};

// Returns a secure random integer from 0 to max-1
function randomInt(max) {
    const limit = Math.floor(2 ** 32 / max) * max;
    const buffer = new Uint32Array(1);
    do {
        crypto.getRandomValues(buffer);
    } while (buffer[0] >= limit); // reject values that would cause bias
    return buffer[0] % max;
}

// Fisher-Yates shuffle using secure randomness
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = randomInt(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generate() {
    message.textContent = "";
    const length = Number(lengthSlider.value);

    // Collect the character sets the user ticked
    const chosen = Object.keys(sets).filter(id => document.getElementById(id).checked);

    if (chosen.length === 0) {
        message.textContent = "Select at least one character type.";
        return;
    }

    const allChars = chosen.map(id => sets[id]).join("");
    const password = [];

    // Guarantee at least one character from each chosen type
    for (const id of chosen) {
        password.push(sets[id][randomInt(sets[id].length)]);
    }

    // Fill the rest from the full pool
    while (password.length < length) {
        password.push(allChars[randomInt(allChars.length)]);
    }

    result.value = shuffle(password).join("");
}

document.getElementById("generate").addEventListener("click", generate);

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

document.getElementById("copy").addEventListener("click", async () => {
    if (!result.value) return;
    try {
        await navigator.clipboard.writeText(result.value);
        message.style.color = "green";
        message.textContent = "Copied!";
    } catch {
        message.style.color = "#c62828";
        message.textContent = "Copy failed. Select the text and copy manually.";
    }
});

