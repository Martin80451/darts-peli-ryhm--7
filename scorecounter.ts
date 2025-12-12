function addToScore(e: Event): void {
    console.log(e);
    console.log("test");
    e.preventDefault();
}

const form = document.getElementById("newScoreInput");
form?.addEventListener("submit", addToScore);