const accessKey = "NSK6lQtqXfNpvYUdSkijKmw3FMbwTnRNeQaL4WNcjAk";
const searchBar = document.getElementById("searchBar");
const searchBtn = document.querySelector(".searchBtn");
const products = document.querySelector(".products");
const showBtn = document.getElementById("showBtn");

let page = 1;
let inputSearchData = "";

async function fetchImageData() {
	const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputSearchData}&client_id=${accessKey}`;
	const response = await fetch(url);
	const data = await response.json();
	return data.results;
}

async function displayImages() {
	const results = await fetchImageData();

	if (page === 1) {
		products.innerHTML = ""; // Clear previous results only on the first page load
	}

	results.forEach((e) => {
		const div = document.createElement("div");
		div.classList.add("box");

		const image = document.createElement("img");
		image.src = e.urls.small;
		image.alt = e.alt_description;

		const p = document.createElement("p");
		p.textContent = e.alt_description;

		div.appendChild(image);
		div.appendChild(p);
		products.appendChild(div);
	});

	page++;
	if (page > 1) {
		showBtn.style.display = "block";
	}
}

searchBtn.addEventListener("click", () => {
	inputSearchData = searchBar.value.trim();
	if (inputSearchData === "") {
		alert("Please type an image keyword for search");
		return;
	}
	page = 1; // Reset page number for new search
	displayImages();
});

showBtn.addEventListener("click", () => {
	displayImages();
});

const buttons = document.querySelectorAll(".button");

buttons.forEach((btn) => {
	btn.addEventListener("click", () => {
		inputSearchData = btn.value;
		page = 1; // Reset page number for new search
		displayImages();
	});
});
