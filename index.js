// window.onload = () => {
//     game.init();
// };
window.onload = function () {
    document.getElementById("start-button").onclick = function () {
        document.querySelector(".intro").style.display = "none";
        document.querySelector(".game").style.display = "flex"
        game.init();
    }
}