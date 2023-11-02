const btn = document.getElementById("btn");
const para = document.getElementById("para");
let span = document.getElementById("content");
const button = document.getElementById("btn");

function toggleHide() {
    if (para) {
        if (para.style.display === 'none' || para.style.display === '') {
            para.style.display = 'block';
            if (span) {
                span.innerHTML = 'Click to Hide';
            }
            if (button) {
                button.innerHTML = 'Hide';
            }
        } else {
            para.style.display = 'none';
            if (span) {
                span.innerHTML = 'Click to Show';
            }
            if (button) {
                button.innerHTML = 'Show';
            }
        }
    } else {
        console.log("Element 'para' doesn't exist");
    }
}
toggleHide();

































// function data(): any {
//   if (span) {
//     span.innerHTML = para?.style.display !== 'none' ? "Click to Show" : "Click to Hide";
//   }
// }
// data();

// function toggleHide() {
//   if (para) {
//     para.style.display !== "none" ? para.style.display = "none" : para.style.display = "block";
//   } else {
//     console.log("Element 'para' doesn't exist");
//   }
// }

// // function updateButtonText() {
// //   if (span) {
// //     span.innerHTML = para?.style.display !== "block" ? "Click to Show" : "Click to Hide";
// //   }
// // }
// function updateButtonText() {
//   if () {
    
//   }
// }

// updateButtonText();