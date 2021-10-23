window.addEventListener("load", function () {
  let username = localStorage.getItem("dhusername");

  document.getElementById("username").innerText = username;
});
