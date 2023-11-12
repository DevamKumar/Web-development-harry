"use strict";
console.log("tut 57");
function greet(name, byeText) {
    console.log("Hello " + name + " " + byeText);
}
function displayTime() {
    const time = new Date();
    console.log(time);
    const timeElement = document.getElementById("time");
    if (timeElement) {
        const time = new Date();
        timeElement.innerHTML = time.toLocaleString();
    }
}
setInterval(displayTime, 1000);
displayTime();
//# sourceMappingURL=tut58.js.map