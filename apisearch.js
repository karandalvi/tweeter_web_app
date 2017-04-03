function storeAndRedirect() {
	var box = document.getElementById("keywordTextbox").value;
	localStorage.setItem('skey', box);
	window.location.href = "searchResult.html";
}
