const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", function (event) {
    const query = input.value.trim();

    // Prevent empty searches
    if (query === "") {
        event.preventDefault();

        errorMessage.textContent = "Please enter something to search.";
        input.focus();

        return;
    }

    // Clear error message
    errorMessage.textContent = "";
});

