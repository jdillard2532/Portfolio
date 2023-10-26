const overlay = document.querySelectorAll(".overlay");
const imageContainer = document.querySelectorAll(".imgContainer");
const formInfo = document.querySelector("#formInfo");
const nameInput = document.querySelector("#name");
const email = document.querySelector("#email");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const textareaMessage = document.getElementById("message");
const profilePic = document.querySelector(".profilePic");

let windonWidth = window.innerWidth;
searchWidth(windonWidth);

window.alert = function (message, timeout) {
  const alert = document.createElement("div");
  const alertButton = document.createElement("button");

  alert.classList.add("alert");
  alertButton.innerText = "OK";
  alertButton.classList.add("alertButton");
  alert.innerText = message;
  alert.appendChild(alertButton);
  alertButton.addEventListener("click", () => {
    nameInput.value = "";
    email.value = "";
    textareaMessage.value = "";
    alert.remove();
  });
  document.body.appendChild(alert);
};

window.addEventListener("resize", (e) => {
  let width = window.innerWidth;
  searchWidth(width);
});

window.addEventListener("load", () => {
  formInfo.addEventListener("submit", (e) => {
    emailError.innerText = "";
    nameError.innerText = "";
    let nameErrorMessage = [];
    let emailErrorMessage = [];
    if (nameInput.value === "" || nameInput.value == null) {
      nameErrorMessage.push("Please Enter Your Name");
    } else if (email.value === "" || email.value == null) {
      emailErrorMessage.push("Please Enter Email");
    }

    if (nameErrorMessage.length > 0) {
      e.preventDefault();
      nameError.innerText = nameErrorMessage;
    } else if ((emailErrorMessage = [])) {
      e.preventDefault();
      checkEmail(e);
      // emailError.innerText = emailErrorMessage;
    }
  });
});

email.value = "";
nameInput.value = "";
textareaMessage.value = "";

imageContainer.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    searchOverlay(item);
  });

  item.addEventListener("mouseleave", () => {
    removeOverlay(item);
  });
});

function searchOverlay(item) {
  item.classList.add("active");

  for (let i = 0; i < overlay.length; i++) {
    if (imageContainer[i].classList.contains("active")) {
      overlay[i].style.display = "block";
    } else {
      overlay[i].style.display = "none";
    }
  }
}

function removeOverlay(item) {
  for (let i = 0; i < overlay.length; i++) {
    imageContainer[i].classList.remove("active");
    overlay[i].style.display = "none";
  }
}

function searchWidth(width) {
  if (width <= 992 && width >= 768) {
    profilePic.src = "assets/images/image-profile-tablet.webp";
  } else if (width < 768) {
    profilePic.src = "assets/images/image-profile-mobile.webp";
  } else if (width > 992) {
    profilePic.src = "assets/images/image-profile-desktop.webp";
  }
}

function checkEmail(e) {
  let emailText = email.value;
  let error = [];
  if (emailText.includes("@") == false || emailText.includes(".") == false) {
    e.preventDefault();
    error.push("Sorry, invalid format here");
    emailError.innerText = error;
  } else {
    infoSubmit(e);
  }
}

function infoSubmit(e) {
  e.preventDefault();
  const data = new FormData(formInfo);
  const action = e.target.action;
  fetch(action, {
    method: "POST",
    body: data,
  }).then(() => {
    alert("Thank you for your message");
  });
}
