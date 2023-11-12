console.log("tut 57");
// settimeout allows us to rum function once after interval of time
// clear interval allows us to rum function repeatedly after interval of time
function greet(name: string, byeText: string) {
  console.log("Hello " + name + " " + byeText);
}
// const timeOut = setTimeout(greet, 3000, "Devam", "Have a Good day!");
// console.log(timeOut);
// clearTimeout(timeOut);
// clearInterval

// setInterval
// setInterval(greet, 1000 , "Devam", "Have a good day!");
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
