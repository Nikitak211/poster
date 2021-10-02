const textarea = document.getElementById("posted-post");

textarea.addEventListener("input", function (e) {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});