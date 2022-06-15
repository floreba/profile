var coll = document.getElementsByClassName("collapsible");
var i;
console.log(coll)

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", () =>  {
    console.log("Test");
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
console.log(coll + "2")
