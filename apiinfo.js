function displayInfo() {
  var title = localStorage.getItem('title');
  var iconUrl = localStorage.getItem('iconUrl');
  var date = localStorage.getItem('date');
  var text = localStorage.getItem('text');
  document.getElementById("booktitle").innerHTML = title;

  document.getElementById("icon").src = iconUrl;
  document.getElementById("icon").height = 145;
  document.getElementById("icon").width = 100;
  var result = document.getElementById("information");

  document.getElementById("date").innerHTML = date;
  document.getElementById("desc").innerHTML = text;
}

function goBack() {
    window.history.back();
}
