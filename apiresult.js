function searchTweets(){
	var keyword =localStorage.getItem('skey');
	$.getJSON("http://thunderx.cise.ufl.edu:8080/api/s/".concat(keyword) , showResults);
}

function showResults(response){
  var results = response.results;
  var rows = results.map(function(item){
    return createRow(item.id, item.title, item.image, item.date, item.text);
  });

	document.getElementById("apiList").innerHTML = "<input id='backbutton' type='submit' value='Back' onclick='goBack()'/><br/><br/><table id='resultsTable'></table>";

  rows.forEach(function(row){
    document.getElementById("resultsTable").appendChild(row);
  });

  document.getElementById("apiList").style.display = "block";
}

function createRow(id, user, iconUrl, tweet, desc){
  var tweetRow = document.createElement("tr");
  var iconCell = document.createElement("td");
	iconCell.setAttribute("class", "icon");
  var icon = document.createElement("img");
  icon.src = iconUrl;
  icon.setAttribute("alt", user);
  icon.setAttribute("height", 48);
  icon.setAttribute("width", 48);
  iconCell.appendChild(icon);
  tweetRow.appendChild(iconCell);

	var link = document.createElement("button");
	link.setAttribute("id","infobutton")
	var clickText = "showInfo(\"" + user + "\",\"" + iconUrl + "\",\"" + tweet + "\",\"" + desc +"\")";
	link.setAttribute("onclick", clickText);
	link.appendChild(document.createTextNode(user + ": " + tweet));
	var tweetCell = document.createElement("td");
	tweetCell.setAttribute("class", "tweet");
	tweetCell.appendChild(link);
  tweetRow.appendChild(tweetCell);

	var favCell = document.createElement("td");
	var form = document.createElement("form");
	form.setAttribute("name","form")

	var readID = "read" + id;
	var readButton = document.createElement("input");
	readButton.setAttribute("type","button");
	readButton.setAttribute("id",readID);
	var callFunc = "changeReadState(" + id + ")";
	readButton.setAttribute("onclick",callFunc);

	var read = isRead(id);
	if (read==1) {
		readButton.setAttribute("value","Mark as Unread");
		readButton.setAttribute("style","background-color:#E6F27D");
	}
	else {
		readButton.setAttribute("value","Mark as Read");
		readButton.setAttribute("style","background-color:#FBFDE5");
	}

	var wishID = "wish" + id;
	var wishlistButton = document.createElement("input");
	wishlistButton.setAttribute("type","button");
	wishlistButton.setAttribute("id",wishID);
	callFunc = "changeWishList(" + id + ")";
	wishlistButton.setAttribute("onclick",callFunc);

	var wish = isWishList(id);
	if (wish==1) {
		wishlistButton.setAttribute("value","Remove from wishlist");
		wishlistButton.setAttribute("style","background-color:#E6F27D");
	}
	else {
		wishlistButton.setAttribute("value","Add to wishlist");
		wishlistButton.setAttribute("style","background-color:#FBFDE5");
	}



  form.appendChild(readButton);
	form.appendChild(wishlistButton);

	favCell.appendChild(form);
	tweetRow.appendChild(favCell);
  return tweetRow;
}

//----------------------------------------------------

function goBack() {
    window.history.back();
}

function showInfo(title, iconUrl, date, text) {
	localStorage.setItem('title', title);
	localStorage.setItem('iconUrl', iconUrl);
	localStorage.setItem('date', date);
	localStorage.setItem('text', text);
	window.location.href="information.html";
}

//-----------------------------------------------------

function isWishList(id) {
	var v = "wish" + id;
	return localStorage.getItem(v);
}

function addToWishList(id) {
	var v = "wish" + id;
	localStorage.setItem(v,1);
}

function removeFromWishList(id) {
	var v = "wish" + id;
	localStorage.setItem(v,0);
}

function changeWishList(id) {
	if (isWishList(id) == 1) {
		removeFromWishList(id);
		updateButtonText(id, 0, "wish");
	}
		else {
				addToWishList(id);
				updateButtonText(id, 1 ,"wish");
		}
}

//----------------------------------------------------------

function isRead(id) {
	var v = "read" + id;
	return localStorage.getItem(v);
}

function addToRead(id) {
	var v = "read" + id;
	localStorage.setItem(v,1);
}

function removeFromRead(id) {
	var v = "read" + id;
	localStorage.setItem(v,0);
}

function changeReadState(id) {
	if (isRead(id) == 1) {
		removeFromRead(id);
		updateButtonText(id, 0, "read");
	}
		else {
				addToRead(id);
				updateButtonText(id, 1, "read");
		}
}

//----------------------------------------------------------

function updateButtonText(id, state, type) {
	var v = type + id;
	if (type == "wish") {
	if (state == 0) {
		document.getElementById(v).value = "Add to Wishlist";
		document.getElementById(v).style.backgroundColor = "#FBFDE5";
	}
	else {
		document.getElementById(v).value = "Remove from Wishlist";
		document.getElementById(v).style.backgroundColor = "#E6F27D";
	}
 }

	if (type == "read") {
	if (state == 0) {
		document.getElementById(v).value = "Mark as Read";
		document.getElementById(v).style.backgroundColor = "#FBFDE5";
	}
	else {
		document.getElementById(v).value = "Mark as Unread";
		document.getElementById(v).style.backgroundColor = "#E6F27D";
	}
}
}
