var tema="ligth";
if (localStorage.themeColor_preference != undefined){ tema = localStorage.themeColor_preference;}
document.getElementById("mainstyle").href="css/"+tema+".css";

if (tema === "ligth") {document.getElementById("dark/ligth_theme").innerHTML = "MODO NOCTURNO";	}
if (tema === "dark") {document.getElementById("dark/ligth_theme").innerHTML = "MODO DIURNO";}


function cambiar_claro_oscuro(){
	if (tema === "ligth") {
		document.getElementById("mainstyle").href="css/dark.css";
		tema="dark";
		document.getElementById("dark/ligth_theme").innerHTML = "MODO DIURNO";
		localStorage.themeColor_preference =tema;
	}
	else if (tema === "dark") {
		document.getElementById("mainstyle").href="css/ligth.css";
		tema="ligth";
		document.getElementById("dark/ligth_theme").innerHTML = "MODO NOCTURNO";
		localStorage.themeColor_preference =tema;
	}
} 

   
//variables
const $searchBox = document.querySelector("#search-section");
const $searchResultsSection = document.querySelector(".search_results");
const $myGifsSection = document.querySelector("#my-gifs-section");
const $searchs = document.querySelector("#search-section");
const SearchBar = document.querySelector("#search-bar");
const $favs = document.querySelector("#favos");
const $searcheds = document.getElementById("spaceal");
const searchtitle = document.getElementById("searchtitle");
const $trendtags = document.getElementById("trendtags");
const $misgifos = document.getElementById("my-gifs-section");
const $trends = document.getElementById("trends-section");
const $createGifSection = document.querySelector("#create-gif-section");
const searchbox = document.getElementById("boxSearch");
const h = document.getElementById("h");
const bod = document.getElementById("dd");
const Facebook = document.getElementById("link1");
const Twitter = document.getElementById("link2");
const Instagram = document.getElementById("link3");
const crearr = document.getElementById("normal");

var sliderOffset = 0;
var offsetS = 0;
var TrendingGIFOS = [];
var SearchedGIFOS = [];
var counts = 0;

const TagSection = document.querySelector(".tagss");
const TrendingTags = document.querySelector(".TTtrending_tags");
const MaxSection = document.querySelector(".maximiza");
const FavSection = document.querySelector(".favs");
const SearchSection = document.querySelector(".search_results");
const trendscont = document.querySelector(".trending_gifos_gifos_container");
const right = document.getElementById("right");
const left = document.getElementById("left");

//api
const APIkey = "IsM5eijjcbANAPbpPYBETvD240hI2Iwj";
const endpointSearch = "https://api.giphy.com/v1/gifs/search";
const endpointTrending = "https://api.giphy.com/v1/gifs/trending";
const endpointTrendingTags = "https://api.giphy.com/v1/trending/searches";



function miGifos(){
	showElements($trends);
	hideElements($trendtags, $searchs, $favs, $createGifSection, $searchResultsSection);
	$misgifos.style.display ="flex";
	
}
function favorito(){
	showElements($favs);
	hideElements($trendtags, $searchs, SearchSection, $myGifsSection,$searchResultsSection)
}
function change(){
	document.getElementById("mygifempty").style.display = "none";
	document.getElementById("out").style.display = "none";	
	localStorage.setItem('mygifempty', document.getElementById('bgcolor').style.display = "none");
	localStorage.setItem('out', document.getElementById('out').style.display = "none");	
}
const $subir = document.getElementById("upload-gif");
$subir.onclick = () => {
	document.getElementById("mygifempty").style.display = "none";
	document.getElementById("out").style.display = "none";
	localStorage.setItem('mygifempty', document.getElementById('bgcolor').style.display = "none");
	localStorage.setItem('out', document.getElementById('out').style.display = "none");
};

$(document).ready(function uno(){
	$("#link1").hover(function dos(){
		Facebook.src="assets/icon_facebook_hover.svg";
		}, function(){
			Facebook.src="assets/icon_facebook.svg";
		});
});
$(document).ready(function(){
	$("#link2").hover(function(){
		Twitter.src="assets/icon-twitter-hover.svg";
		}, function(){
			Twitter.src="assets/icon-twitter.svg";
		});
});
$(document).ready(function(){
	$("#link3").hover(function(){
		Instagram.src="assets/icon_instagram-hover.svg";
		}, function(){
			Instagram.src="assets/icon_instagram.svg";
		});
});
$(document).ready(function(){
	$("#normal").hover(function(){
		crearr.src="assets/CTA-crear-gifo-hover.svg";
		}, function(){
			crearr.src="assets/button-crear-gifo.svg" ;
		});
});

document.querySelector(".logo").addEventListener("click", () => {
	hideElements($favs, MaxSection, $misgifos, $createGifSection)
	showElements($searchs, TrendingTags, $trends)
});
document.querySelector("#logo1").addEventListener("click", () => {
	hideElements($favs, MaxSection, $misgifos, $createGifSection)
	showElements($searchs, TrendingTags, $trends)
});

let controller;

const events = {
	events: {},
	on: function(eventName, ...fn) {
		fn.forEach(inputFn => {
			this.events[eventName] = this.events[eventName] || [];
			this.events[eventName].push(inputFn);
		});
	},
	off: function(eventName, fn) {
		if (this.events[eventName]) {
			for (let i = 0; i < this.events[eventName].length; i++) {
				if (this.events[eventName][i] === fn) {
					this.events[eventName].splice(i, 1);
					break;
				}
			}
		}
	},
	emit: function(eventName, data) {
		if (this.events[eventName]) {
			this.events[eventName].forEach(function(fn) {
				fn(data);
			});
		}
	}
};
const navBar = (() => {
	const $btnMyGifs = document.querySelector("#btn-my-gifs");
	const $btnCreateGif = document.querySelector("#btn-create-gif");
	
	document.addEventListener("keydown", e => {
		if (e.key === "Escape") {
			events.emit("closeOpenedElements");
		}
	});

	$btnMyGifs.addEventListener("click", showMyGifsSection);
	$btnCreateGif.addEventListener("click", showCreateGifSection);
	
	function showMyGifsSection() {
		events.emit("myGifs");
	}
	function showCreateGifSection() {
		events.emit("createGif");
	}
})();

const searchSection = (() => {
	var SearchedGIFOS = [];
	const $searchBar = document.querySelector("#search-bar");
	const $searchButton = document.querySelector("#search-button");
	const $searchSuggestions = document.querySelector("#search-suggestions");
	const $searchTags = document.querySelector("#search-tags");


	events.on("pageLoad", mount, () => $searchBar.focus(), removeScrollListener);
	events.on("gotoHome", mount, hideSearchResults, () => $searchBar.focus(), removeScrollListener);
	events.on("closeOpenedElements", hideSearchSuggestions);
	events.on("searchBarInputChanged", searchBarInputChanged);
	events.on("myGifs", removeScrollListener);
	events.on("createGif", removeScrollListener);
	events.on("searchStarted", hideSearchSuggestions);
	
	$searchBar.addEventListener("input", e => {
		events.emit("searchBarInputChanged", e.target.value);
	});


	$searchButton.addEventListener("click", () => { searchStart() });
	SearchBar.addEventListener("keypress", (input) => {
		if (input.charCode === 13) {
			searchStart()
		}
	});
	function searchStart() {
		if (SearchBar.value != "") {
		  $searcheds.scrollIntoView()
		  counts = 0;
		  offsetS = 0;
		  $searcheds.innerHTML = "";
		  SearchedGIFOS = [];
		  searchDisable();
		  SearchSection.classList.remove("hidden");
		  search(SearchBar.value);
		}
	  }

	  async function search(input) {
		await fetch(endpointSearch + "?api_key=" + APIkey + "&q=" + input + "&limit=" + 12 + "&offset="+ (offsetS + 1) + "&rating=g")
		.then(response => { return (response.json()) })
			.then(json => {
				console.log(json);
				console.log(input)
				forSearch(json.data, input);
			})
			.catch(err => console.log(err))
		}

	  function forSearch(array, input) {
		for (let i = 0; i < array.length; i++) {
		  let newgifo = new GIFO(
			i + offsetS,
			array[i].username,
			array[i].title,
			array[i].images.original.url
		  );
		  SearchedGIFOS.push(newgifo);
		}
		renderS(SearchedGIFOS, input);
	  }
	  function stripHtmlTags (elemento) {
		return elemento.textContent||elemento.innerText;
	  }
	  
	  function renderS(array, input) {
		console.log(input)
		if (offsetS == 0) {
		  $searcheds.innerHTML = " ";
		  SearchedGIFOS = [];
		  searchtitle.innerHTML = input;
		}
		const ivm = document.querySelector(".search_results");
	  
		if (array.length == 0) {
		  empty = document.createElement("div");
		  empty.classList.add("nule");
		  empty.style = "display:flex; flex-flow: column;";
		  empty.innerHTML = `<img src="assets/icon-busqueda-sin-resultado.svg"> <h3 id="notfound">Intenta con otra búsqueda.</h3>`;
		  ivm.appendChild(empty);
		}
		//RENDER
		for (let i = 0; i < array.length; i++) {
		  div = document.createElement("div");
		  div.classList.add("gifo");
		  div.innerHTML = `<img src="${array[i].url}" alt="GIFO" class="GIFO TrendingGifo">
		  <!--OVERLAY-->
		  <div class="gifoHover sizes2 hidden">
			  <div class="gifo_buttonbar">
				  <img src="assets/icon-fav.svg" class="fav" alt="Botón favorito">
				  <img src="assets/icon-download.svg" class="download" alt="Botón descargar">
				  <img src="assets/icon-max-normal.svg" class="maximize" alt="Botón maximizar">
			  </div>
			  <p class="gifo_user">${array[i].author}</p>
			  <p class="gifo_title">${array[i].title}</p>`;
		  $searcheds.appendChild(div);
		  hovers(div);
		  boton(div);
		}
		counts++;
	  
		if (counts < 3) {
		  if (array.length > 11) {
			seeMore();
		  }
		} else if (array.length - (offsetS - 12) > 11) {
		  seeMore();
		}

		function seeMore() {
		  let button = document.createElement("button");
		  button.classList.add("seeMore");
		  button.innerHTML = "VER MÁS";
	  

		  button.addEventListener("click", () => {
			document.querySelector(".seeMore").remove();
			offsetS = offsetS + 12;
			search(SearchBar.value);
		  });
		  SearchSection.append(button);
		}
	  }


	function mount() {
		showElements($searchBox);
	}
	
	function hideSearchSuggestions() {
		hideElements($searchSuggestions);
	}
	function hideSearchResults() {
		hideElements($searchResultsSection, $searchTags);
	}
	function searchBarInputChanged(inputValue) {
		controller ? controller.abort() : null;
		if (inputValue !== "") {
			$searchButton.disabled = false;
			handleSearchSuggestionSearch(8, inputValue);
		} else {
			$searchButton.disabled = true;
			hideSearchSuggestions();
		}
	}
	
	function removeScrollListener() {
		events.emit("removeScrollListener", { section: "search" });
	}
	async function handleSearchSuggestionSearch(limit, keywords) {
		controller = new AbortController();
		const signal = controller.signal;
		const processedKeywords = processSearchValues(keywords);
		const url = `https://api.giphy.com/v1/gifs/search?q=${processedKeywords}&api_key=${APIkey}&limit=${limit}`;

		const searchResults = await fetchURL(url, { signal });
		if (searchResults.data) {
			$searchSuggestions.innerHTML = "";
			showElements($searchSuggestions);
			searchResults.data.length
				? searchResults.data.forEach(searchTitle => {
						searchTitle.title && searchTitle.title !== " "
							? $searchSuggestions.append(newElement("searchTitle", searchTitle))
							: null;
				  })
				: hideElements($searchSuggestions);

			const $searchSuggestionsButtons = document.querySelectorAll(".btn--search-suggestion");

			$searchSuggestionsButtons.forEach(element => {
				element.onclick = () => {
					SearchBar.value = stripHtmlTags(element);
					hideElements($searchSuggestions);

					searchStart();
				};
			});
		}
	}
	
})();



const trendingSection = (() => {
	const $trendsSection = document.querySelector("#trends-section");
	
	events.on("searchStarted", unmount);
	function unmount() {
		hideElements($trendsSection, );
		events.emit("removeScrollListener", { section: "trending" });
	}
	
})();

const createGifsSection = (() => {
	let newGifId = "";
	let videoRecorder;
	let gifRecorder;
	let gifSrc;
	

	const $stage1 = document.querySelector("#stage1");
	const $stage2 = document.querySelector("#stage2");
	const $stage4 = document.querySelector("#stage4");
	const $endProcess = document.querySelectorAll(".close-window");
	const $createGifContinue = document.querySelector("#create-gif-continue");
	const $startRecording = document.querySelector("#start-recording");
	const $stopRecording = document.querySelector("#stop-recording");
	const $redoRecording = document.querySelector("#redo-recording");
	const $uploadRecording = document.querySelectorAll(".gif-upload");
	const $copyGifLink = document.querySelector("#copy-link");
	const $downloadGif = document.querySelector("#download-gif");
	const $inputPreview = document.querySelector("#video-box");;
	const timer = document.querySelector("#timer");
	
	
	
	const Stopwatch = (elem, options) => {
		let timer = elem,
			offset,
			clock,
			interval;

		options = options || {};
		options.delay = options.delay || 1;

		reset();

		function start() {
			if (!interval) {
				offset = Date.now();
				interval = setInterval(update, options.delay);
			}
		}
		function stop() {
			if (interval) {
				clearInterval(interval);
				interval = null;
			}
			return clock;
		}
		function reset() {
			clock = 0;
			render();
		}
		function update() {
			clock += delta();
			render();
		}
		function delta() {
			let now = Date.now(),
				d = now - offset;
			offset = now;
			return d;
		}
		function msToTime(duration) {
			let milliseconds = parseInt((duration % 1000) / 10),
				seconds = Math.floor((duration / 1000) % 60),
				minutes = Math.floor((duration / (1000 * 60)) % 60),
				hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

			hours = hours < 10 ? "0" + hours : hours;
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;

			return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
		}
		function render() {
			timer.innerHTML = msToTime(clock);
		}
		// Exposed Functions
		return {
			start: start,
			stop: stop,
			reset: reset
		};
	};
	
	const myStopwatch = Stopwatch(timer, { delay: 10 });

	events.on("createGif", mount);
	events.on("gotoHome", unmount);
	events.on("searchStarted", unmount);
	events.on("loadingBarCompleted", () => (playing = false));

	// Bind events
	$createGifContinue.onclick = async () => {
		hideElements($stage1);
		showElements($stage2, $startRecording);
		document.getElementById("video").style.display = "none";
		try {
			await initiateWebcam(); 
		} catch (e) {
			window.alert("No se pudo iniciar la camara");
			$startRecording.disabled = true;
		}
		finally {
			document.getElementById("video").style.display = "block";
			document.getElementById("space").style.display = "none";
			document.getElementById("video-caja").style.border = "1pt solid #572EE5";
			document.getElementById("video-caja").style.padding = "3rem 8rem 3rem 8rem";
			document.getElementById("start-recording").style.display = "block";
			document.getElementById("barrs").style.display = "block";
			document.getElementById("create-numbers2").style.display = "flex";
		}
	};
	$startRecording.onclick = () => {
		document.getElementById("stop-recording").style.display = "block";
		var $d = document.querySelector("#space");
		hideElements($startRecording, $stage4);
		
		document.getElementById("timer").style.display = "block";
		setTimeout(() => {
			showElements($stopRecording);
		}, 850);
		startRecording();
		myStopwatch.reset();
		myStopwatch.start();
	};
	$stopRecording.onclick = () => {
		hideElements($stopRecording);
		showElements($stage4);
		document.getElementById("timer").style.display = "none";
		document.getElementById("redo-recording").style.display = "block";
		stopRecording();
		
	};
	$redoRecording.onclick = async () => {
		setTimeout(() => {
			showElements($stopRecording, $inputPreview);
		}, 850);
		hideElements($stage4, $timerLoadingBar);
		await initiateWebcam();
		await startRecording();
		myStopwatch.reset();
		myStopwatch.start();
		myLoadingBar.pause();
	};
	$uploadRecording.forEach(uploadSubmission => {
		uploadSubmission.onclick = async () => {
			document.getElementById("upload-gif").style.display = "none";
			document.getElementById("create-numbers2").style.display = "none";
			document.getElementById("create-numbers3").style.display = "flex";
			document.getElementById("redo-recording").style.display = "none";
			document.getElementById("box-oculta").style.display = "flex";

			var elem = document.getElementById("colour");
			elem.classList.add('colour');
	
			try {
				const newGif = await uploadCreatedGif();
				if ((await newGif.meta.status) === 200) {
					newGifId = await newGif.data.id;
					document.getElementById("box-oculta").style.display = "none";
					document.getElementById("box-oculta2").style.display = "flex";
					document.getElementById("box-oculta3").style.display = "flex";

					saveGifToLocalStorage(await newGifId);
					await uploadLoadingBar.reset();
					await events.emit("myGifsChanged");
				} else {
					uploadLoadingBar.reset();
				}
				
			} catch (e) {}
		};
	});
	
	$endProcess.forEach(element => {
		element.addEventListener("click", () => {
			unmount();
			events.emit("createGifEnded");
		});
	});
	$copyGifLink.onclick = () => {
		copyCreatedGifLink();
	};
	$downloadGif.onclick = () => {
		downloadCreatedGif();
	};
	const crear = document.getElementById("btn-create-gif");
	crear.onclick = () => {
		document.getElementById("my-gifs-section").style.display = "none";
	};

	function mount() {
		hideElements($stage2, $stage4, $misgifos, $trendtags, $trends, $favs, $searchs, $searchResultsSection, MaxSection);
		showElements($createGifSection, $stage1);
	}
	function unmount() {
		hideElements($createGifSection, $stage1, $stage2, $stage4);
	}

	async function saveGifToLocalStorage(gif) {
		const response = await fetchURL(`https://api.giphy.com/v1/gifs/${gif}?api_key=${APIkey}`);
		const data = response.data;
		const gifID = data.id;
		const stringifiedData = JSON.stringify(data);
		localStorage.setItem(`gif-${gifID}`, stringifiedData);
	}
	function copyCreatedGifLink() {
		const tempElement = document.createElement("textarea");
		tempElement.value = `https://giphy.com/gifs/${newGifId}`;
		tempElement.setAttribute("readonly", "");
		tempElement.style = 'display: "none"';
		document.body.appendChild(tempElement);
		tempElement.select();
		document.execCommand("copy");
		console.log("Copied data to clipboard!");
		document.body.removeChild(tempElement);
	}
	async function downloadCreatedGif() {
		const downloadUrl = `https://media.giphy.com/media/${newGifId}/giphy.gif`;
		const fetchedGif = fetch(downloadUrl);
		const blobGif = (await fetchedGif).blob();
		const urlGif = URL.createObjectURL(await blobGif);
		const saveImg = document.createElement("a");
		saveImg.href = urlGif;
		saveImg.download = "downloaded-guifo.gif";
		saveImg.style = 'display: "none"';
		document.body.appendChild(saveImg);
		saveImg.click();
		document.body.removeChild(saveImg);
	}
	async function initiateWebcam() {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: {
				height: { max: 480 }
			},
			function(localMediaStream) {
				document.getElementById("space").style.display="none"	
			},
			function(err) {
				console.log("Ocurrio el siguiente error: " + err);
			}
		});
		
		$inputPreview.srcObject = stream;
		await $inputPreview.play();
	}
	async function startRecording() {
		const stream = $inputPreview.srcObject;
		videoRecorder = new RecordRTCPromisesHandler(stream, {
			type: "video",
			mimeType: "video/webm; codecs=vp8",
			disableLogs: true,
			videoBitsPerSecond: 128000,
			frameRate: 30,
			quality: 10,
			width: 480,
			hidden: 240
		});
		gifRecorder = new RecordRTCPromisesHandler(stream, {
			disableLogs: true,
			type: "gif",
			frameRate: 1,
			quality: 10,
			width: 360,
			hidden: 240
		});
		await videoRecorder.startRecording();
		await gifRecorder.startRecording();
		videoRecorder.stream = stream;
	}
	async function stopRecording() {
		await videoRecorder.stopRecording();
		await gifRecorder.stopRecording();
		const videoBlob = await videoRecorder.getBlob();
		const gifBlob = await gifRecorder.getBlob();

		videoRecorder.stream.getTracks().forEach(t => t.stop());
		
		await videoRecorder.reset();
		await videoRecorder.destroy();
		await gifRecorder.reset();
		await gifRecorder.destroy();

		gifSrc = await gifBlob;
		gifRecorder = null;
		videoRecorder = null;
	}
	async function uploadCreatedGif() {
		console.log("*Upload started*");
		const formData = new FormData();
		formData.append("file", gifSrc, "myGif.gif");
		
		const params = {
			method: "POST",
			body: formData,
			json: true
		};
		const data = await fetchURL(`https://upload.giphy.com/v1/gifs?api_key=${APIkey}`, params);
		console.log(await data);
		console.log("*Upload ended*");
		return await data;
	}
})();


const myGifsSection = (() => {

	let myGifs = {};

	const $gifsGrid = document.querySelector("#my-gifs-grid");
	let $removeGifButtons = document.querySelectorAll("#my-gifs-grid .gif-simple__header__close-btn");


	events.on("myGifs", mount);
	events.on("createGif", mount);
	events.on("myGifsChanged", render);
	events.on("createGifEnded", render);
	events.on("searchStarted", unmount);
	events.on("gotoHome", unmount);
	events.on("newPopupDeleteGifOk", deleteGif);
	events.on("deleteGif", deleteGif);

	function mount() {
		showElements($misgifos, $gifsGrid);
		render();
	}
	function unmount() {
		hideElements($misgifos, $gifsGrid, $trendtags);
	}
	
	function render() {
		$gifsGrid.innerHTML = "";
		myGifs = getGifItemsFromLS();
		isNotEmpty(myGifs) && loadMyGifs(myGifs);
		parseDeleteButtons();
		downloadButtons()
		maxxButtons()
		
		events.emit("imagesToLazyLoad");
	}
	function getGifItemsFromLS() {
		const myGifs = {};
		Object.keys(localStorage).forEach(element => {
			element.startsWith("gif-") ? (myGifs[element] = localStorage.getItem(element)) : null;
		});
		return myGifs;
	}
	function loadMyGifs(myGifs) {
		for (let myGifKey in myGifs) {
			const parsedGifData = JSON.parse(myGifs[myGifKey]);
			let aspectRatio = "";
			parsedGifData.images["480w_still"].width / parsedGifData.images["480w_still"].height >= 1.5
				? (aspectRatio = "item-double")
				: null;
			$gifsGrid.append(newElement("myGif", parsedGifData, aspectRatio));
		}
	}

	async function downloadGifos(ids) {
		const downloadUrl = `https://media.giphy.com/media/${ids}/giphy.gif`;
		const fetchedGif = fetch(downloadUrl);
		const blobGif = (await fetchedGif).blob();
		const urlGif = URL.createObjectURL(await blobGif);
		const saveImg = document.createElement("a");
		saveImg.href = urlGif;
		saveImg.download = "downloaded-guifo.gif";
		saveImg.style = 'display: "none"';
		document.body.appendChild(saveImg);
		saveImg.click();
		document.body.removeChild(saveImg);
	}
	
	function downloadButtons() {
		$downloadGifButtons = document.querySelectorAll("#my-gifs-grid .download");
		$downloadGifButtons.forEach(downloadGifButton => {
			const localGifElementURL = downloadGifButton
				.closest(".gif-simple")
				.querySelector("img")
				.getAttribute("data-src");
			const localStorageGifID = localGifElementURL.split("/")[4];

			downloadGifButton.addEventListener("click", () => {
				downloadGifos(localStorageGifID);
			});
		});
	}
	const bigger = document.getElementById("bigs");
	const big = document.getElementById("max11");

	

	function maxxButtons() {
		$maxGifButtons = document.querySelectorAll("#my-gifs-grid #maxx");
		$maxGifButtons.forEach(maxGifButton => {
			const max1 = maxGifButton.closest(".gif-simple");

			maxGifButton.addEventListener("click", () => {
				maximus(max1);
			});
		});
	}

	function maximus(selected) {
		let top = selected.querySelector("titlemine");
		let url = selected.querySelector("#struct").src;
		let title = "sin titulo";
		console.log("Max: " + title);
		bigger.querySelector(".step").append = top;
		bigger.querySelector(".gifo").src = url;
		bigger.classList.remove("hidden");
		FavSection.classList.add("hidden");
		window.scrollTo(0, 0);
		
		let options = bigger.querySelectorAll(".info img");
		let closem = document.getElementById("closeup");
		
		
		closem.onclick = () => {
			hideElements(bigger);
		};


		options[0].addEventListener("click", () => {
			console.log("Fav")
			favItem = new FAVGIFO(FavArray.length, top, title, url);
			options[0].src = "assets/icon-fav-active.svg";
		})
		options[0].addEventListener("mouseover", () => {
			options[0].src = "assets/icon-fav-hover.svg";
		});
		options[0].addEventListener("mouseout", () => {
			options[0].src = "assets/icon-fav.svg";
		});
		options[1].addEventListener("click", () => {
			downloadGifo(bigger.querySelector(".gifo").src)
		});
		options[1].addEventListener("mouseover", () => {
			options[1].src = "assets/icon-download-hover.svg";
		});
		options[1].addEventListener("mouseout", () => {
			options[1].src = "assets/icon-download.svg";
		});
	}

	function parseDeleteButtons() {
		$removeGifButtons = document.querySelectorAll("#my-gifs-grid .delete");
		$removeGifButtons.forEach(removeGifButton => {
			const localGifElementURL = removeGifButton
				.closest(".gif-simple")
				.querySelector("img")
				.getAttribute("data-src");
			const localStorageGifID = localGifElementURL.split("/")[4];

			removeGifButton.addEventListener("click", () => {
				deleteGif(localStorageGifID);
			});
		});
	}newElement
	function deleteGif(gifToDelete) {
		localStorage.removeItem(`gif-${gifToDelete}`);
		events.emit("myGifsChanged");
	}
})();


$( "#search-bar" ).keydown(function() {
	var intro = document.getElementById('box-form');
	var bixs = document.getElementById('search-button');
	intro.style.borderWidth = "1pt";
	intro.style.borderRadius = "27px";
	document.getElementById("search-bar").style.border="none";
	searchbox.style.flexDirection = "row-reverse";
	bixs.style.right = "0";
	bixs.style.marginLeft = "15px";
});





events.emit("pageLoad");
events.on("imagesToLazyLoad", lazyLoadImages);


//Functions
async function fetchURL(url, params = null) {
	try {
		const fetchData = await fetch(url, params);
		const response = await fetchData.json();
		return response;
	} catch (error) {
		if (error.name !== "AbortError") {
			console.log("Error al obtener resultados");
		}
		return error;
	}
}
function newElement(type, element = "", ratio = "") {
	element.title === "" ? (element.title = "&emsp;") : null;
	element.author === "" ? (element.author = "&emsp;") : null;
	const $container = document.createElement("div");
	switch (type) {
		case "myGif":
			document.getElementById("out").style.display = "none";
			let titleToArray2 = element.title.split(" ");
			let titleArrayToTags2 = "";
			titleToArray2.forEach(word => {
				titleArrayToTags2 += `#${word} `;
			});
			$container.innerHTML = `<div class="gif-simple">
				<a href="${element.bitly_url}" target="_blank" id="max11">
					<img id="struct"
						src="" 
						data-src="${element.images.original.url}"
						data-srcset="${element.images.original.url}"
						alt="${element.title}" 
						class="lazy gif-simple__content__img loading-animation" 
					/>
				</a>
				<div class="gif-simple__header">
                <img src="assets/icon-trash-normal.svg" class="delete" id="eliminate" alt="Botón borrar">
                <img src="assets/icon-download.svg" class="download" id="descarga" alt="Botón descargar">
                <img src="assets/icon-max-normal.svg" class="maximiz" alt="Botón maximizar" id="maxx">
			</div>
			<div id="titlemine">
			  Anonimo
			  <p>Sin titulo</p>
			  
			</div>
		</div>`;
			return $container.firstChild;
		case "searchTitle":
			$container.innerHTML = `<button class="search-element btn btn--search-suggestion">
			<img src="assets/icon-search.svg" alt="Búsqueda" id="glass">
			<img src="assets/icon-search-modo-noct.svg" alt="Búsqueda" id="glass2">
		<span class="btn__text-container">${element.title}</span>
		</button>`
			return $container.firstChild;
		case "tag":
			$container.innerHTML = `<button type="button" class="btn btn--tag search-tag"><span class="btn__text-container">${element.title}</span></button>`;
			return $container.firstChild;
		case "separator":
			$container.innerHTML = `<div class="separator"></div>`;
			return $container.firstChild;
	}
}
function hideElements(...elements) {
	elements.forEach(element => {
		element.classList.add("hidden");
	});
}
function showElements(...elements) {
	elements.forEach(element => {
		element.classList.remove("hidden");
	});
}
function processSearchValues(inputValues) {
	return inputValues.split(" ").join("+");
}
function isNotEmpty(obj) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) return true;
	}
	return false;
}
function lazyLoadImages() {
	let lazyImages = [].slice.call(document.querySelectorAll(".lazy"));
	if (
		"IntersectionObserver" in window &&
		"IntersectionObserverEntry" in window &&
		"intersectionRatio" in window.IntersectionObserverEntry.prototype
	) {
		var lazyImageObserver = new IntersectionObserver(entries => {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					let lazyImage = entry.target;
					lazyImage.src = lazyImage.dataset.src;
					lazyImage.srcset = lazyImage.dataset.srcset;
					lazyImage.classList.remove("lazy");
					lazyImageObserver.unobserve(lazyImage);
				}
			});
		});

		lazyImages.forEach(lazyImage => {
			lazyImageObserver.observe(lazyImage);
		});
	}
}


async function downloadGifo(url, title) {
	let blob = await fetch(url).then(img => img.blob());
	invokeSaveAsDialog(blob, title + ".gif");
}

taguea();
trending();

async function taguea() {
    await fetch(endpointTrendingTags + "?api_key=" + APIkey)
        .then(response => { return (response.json()) })
        .then(json => {
            console.log(json);
            trendingTags(json.data);
        })
        .catch(err => console.log(err))
    }

async function trending() {
    await fetch(endpointTrending + "?api_key=" + APIkey + "&limit=" + 9 + "&rating=g")
        .then(response => { return (response.json()) })
        .then(json => {
            console.log(json);
            forGeneration(json.data);
            forTrends(0);
        })
        .catch(err => console.log(err))
}

async function search(input) {
    await fetch(endpointSearch + "?api_key=" + APIkey + "&q=" + input + "&limit=" + 12 + "&offset="+ (offsetS + 1) + "&rating=g")
    .then(response => { return (response.json()) })
        .then(json => {
            console.log(json);
            console.log(input)
            image(json.data, input);
        })
        .catch(err => console.log(err))
}

function hovers(selected) {
	selected.addEventListener("mouseover", () => {
	  selected.querySelector(".gifoHover").classList.remove("hidden");
	});
	selected.addEventListener("mouseout", () => {
	  selected.querySelector(".gifoHover").classList.add("hidden");
	});
	if (window.matchMedia("(max-width: 1000px)").matches) {
	  selected.addEventListener("click", () => {
		maximiza(selected);
	  });
	}
}

function boton(selected) {
	let options = selected.querySelectorAll(".gifo_buttonbar img");
	options[0].addEventListener("click", () => {
	  console.log("Fav" + selected.querySelector(".gifo_title").innerHTML)
	  favItem = new FAVGIFO(FavArray.length, selected.querySelector(".gifo_title").innerHTML, selected.querySelector(".gifo_user").innerHTML, selected.querySelector("img").src);
	  options[0].src = "assets/icon-fav-active.svg";
	})
  
	options[1].addEventListener("click", () => {
	  downloadGifo(selected.querySelector("img").src, selected.querySelector(".gifo_title").innerHTML)
	});

	options[2].addEventListener("click", () => {
	  maximiza(selected);
	});
	options[1].addEventListener("click", () => {
	  console.log(selected);
	});
  
	options[0].addEventListener("mouseover", () => {
	  options[0].src = "assets/icon-fav-hover.svg";
	});
	options[0].addEventListener("mouseout", () => {
	  options[0].src = "assets/icon-fav.svg";
	});

	options[1].addEventListener("mouseover", () => {
	  options[1].src = "assets/icon-download-hover.svg";
	});
	options[1].addEventListener("mouseout", () => {
	  options[1].src = "assets/icon-download.svg";
	});

	options[2].addEventListener("mouseover", () => {
	  options[2].src = "assets/icon-max-hover.svg";
	});
	options[2].addEventListener("mouseout", () => {
	  options[2].src = "assets/icon-max-normal.svg";
	});
}
  
function maximiza(selected) {
	let username = selected.querySelector(".gifo_user").innerHTML;
	let title = selected.querySelector(".gifo_title").innerHTML;
	let url = selected.querySelector("img").src;
	console.log("Maximizando GIFO: " + title);
	MaxSection.querySelector(".title").innerHTML = title;
	MaxSection.querySelector(".username").innerHTML = username;
	MaxSection.querySelector(".gifo").src = url;
	MaxSection.classList.remove("hidden");
	FavSection.classList.add("hidden");
	window.scrollTo(0, 0);
	//!BUTTONS
	let options = MaxSection.querySelectorAll(".info img");
	//fav
	options[0].addEventListener("click", () => {
	  console.log("Favoriteando GIFO: " + selected.querySelector(".gifo_title").innerHTML)
	  favItem = new FAVGIFO(FavArray.length, username, title, url);
	  options[0].src = "assets/icon-fav-active.svg";
	})
	options[0].addEventListener("mouseover", () => {
	  options[0].src = "assets/icon-fav-hover.svg";
	});
	options[0].addEventListener("mouseout", () => {
	  options[0].src = "assets/icon-fav.svg";
	});
	//download 
	options[1].addEventListener("click", () => {
	  downloadGifo(MaxSection.querySelector(".gifo").src, MaxSection.querySelector(".title").innerHTML)
	});
	options[1].addEventListener("mouseover", () => {
	  options[1].src = "assets/icon-download-hover.svg";
	});
	options[1].addEventListener("mouseout", () => {
	  options[1].src = "assets/icon-download.svg";
	});
}
  

function searchStart() {
	if (SearchBar.value != "") {
	  $searcheds.scrollIntoView()
	  counts = 0;
	  offsetS = 0;
	  $searcheds.innerHTML = "";
	  SearchedGIFOS = [];
	  searchDisable();
	  SearchSection.classList.remove("hidden");
	  search(SearchBar.value);
	}
}
  
function image(array, input) {
	for (let i = 0; i < array.length; i++) {
	  let newgifo = new GIFO(
		i + offsetS,
		array[i].username,
		array[i].title,
		array[i].images.original.url
	  );
	  SearchedGIFOS.push(newgifo);
	}
	renderS(SearchedGIFOS, input);
}
  

function renderS(array, input) {
	console.log(input)
	if (offsetS == 0) {
	  $searcheds.innerHTML = " ";
	  SearchedGIFOS = [];
	  searchtitle.innerHTML = input;
	}
	if (array.length == 0) {
	  empty = document.createElement("div");
	  empty.style = "display:flex; flex-flow: column;";
	  empty.innerHTML = `<img src="assets/icon-busqueda-sin-resultado.svg"> <h3 class="noresult">Intenta con otra búsqueda.</h3>`;
	  SearchSection.appendChild(ouch);
	}

	for (let i = 0; i < array.length; i++) {
	  div = document.createElement("div");
	  div.classList.add("gifo");
	  div.innerHTML = `<img src="${array[i].url}" alt="GIFO" class="GIFO TrendingGifo">
	  <div class="gifoHover hidden">
		  <div class="gifo_buttonbar">
			  <img src="assets/icon-fav.svg" class="fav" alt="Botón favorito">
			  <img src="assets/icon-download.svg" class="download" alt="Botón descargar">
			  <img src="assets/icon-max-normal.svg" class="maximize" alt="Botón maximizar">
		  </div>
		  <p class="gifo_user">${array[i].author}</p>
		  <p class="gifo_title">${array[i].title}</p>`;
	  $searcheds.appendChild(div);
	  hovers(div);
	  boton(div);
	}
	counts++;
  
	if (counts < 3) {
	  if (array.length > 11) {
		seeMore();
	  }
	} else if (array.length - (offsetS - 12) > 11) {
	  seeMore();
	}
  
	function seeMore() {
	  let button = document.createElement("button");
	  button.classList.add("seeMore");
	  button.innerHTML = "VER MÁS";
  
	  button.addEventListener("click", () => {
		document.querySelector(".seeMore").remove();
		offsetS = offsetS + 12;
		search(SearchBar.value);
	  });
	  SearchSection.append(button);
	}
}

function tagssense() {
  for (let i = 0; i < 5; i++) {
    TrendingTags.querySelectorAll(".trending_tag")[i].addEventListener("click", () => {
      SearchBar.value = TrendingTags.querySelectorAll(".trending_tag")[i].innerHTML;
      searchStart();
    })
  }
}

right.addEventListener("click", () => {
  if (sliderOffset < 6) {
    sliderOffset = sliderOffset + 3;
  } else {
    sliderOffset = 0;
  }
  forTrends(sliderOffset)
});

right.addEventListener("mouseover", () => {
  right.src = "assets/button-slider-right-hover.svg"
});

right.addEventListener("mouseout", () => {
  if (tema === "ligth") {
    right.src = "assets/Button-Slider-right.svg"
  } else if (tema === "dark") {
    right.src = "assets/button-slider-right-md-noct.svg";
  }
});

left.addEventListener("click", () => {
  if (sliderOffset > 0) {
    sliderOffset = sliderOffset - 3;
  } else {
    sliderOffset = 6;
  }
  forTrends(sliderOffset)
});

left.addEventListener("mouseover", () => {
  left.src = "assets/button-slider-left-hover.svg"
});

left.addEventListener("mouseout", () => {
  if (tema === "ligth") {
    left.src = "assets/button-slider-left.svg"
  } else if (tema === "dark")  {
    left.src = "assets/button-slider-left-md-noct.svg";
  }
});


function GIFO(index, author, title, url) {
  this.index = index;
  this.author = author;
  if (this.author == "") {
    this.author = "Anónimo";
  }
  this.title = title;
  if (this.title == "") {
    this.title = "Sin título";
  }
  this.url = url;
  return this;
}

function FAVGIFO(index, author, title, url) {
    this.index = index;
	this.author = author;
	if (this.author == "") {
        this.author = "Anónimo";
    }
    this.title = title;
    if (this.title == "") {
        this.title = "Sin título";
    }
    this.url = url;
    console.log(this)
    favSelected(this);
    return this;
}

var FavArray = [];
function retrieveFavs() {
    if (localStorage.hasOwnProperty("FAVGIFOS")) {
        FavArray = JSON.parse(localStorage.getItem("FAVGIFOS"))
    } 
}

retrieveFavs();

function favSelected(item) {
    FavArray.push(item);
    localStorage.setItem("FAVGIFOS", JSON.stringify(FavArray));
    renderFavourites();
}

function renderFavourites() {
    FavSection.innerHTML = `<img src="assets/icon-favoritos.svg" alt="Favoritos"> 
    <h4>Favoritos</h4>`;
    document.querySelector(".logo").addEventListener("click", () => {
        MaxSection.classList.add("hidden");
        TagSection.classList.remove("hidden");
        FavSection.classList.add("hidden");
    });
    if (FavArray.length == 0) {
        div = document.createElement("div");
        div.style = "display:flex; flex-direction: column; align-items: center; margin-top: 4rem"
        div.innerHTML = `<img src="assets/icon-fav-sin-contenido.svg" alt="Sin gifos">
    <p class="empty1">¡Guarda tu primer GIFO en Favoritos 
    para que se muestre aquí!</p>`;
        FavSection.appendChild(div);
    } else {
        let container = document.createElement("div");
        container.classList.add("container");
        FavSection.appendChild(container);
        for (let i = 0; i < FavArray.length; i++) {
            let bloque = document.createElement("div")
            bloque.classList.add("gifo");
            bloque.innerHTML = `<img src="${FavArray[i].url}" alt="${FavArray[i].title}">
        <div class="gifoHover sizes3 hidden">
            <div class="gifo_buttonbar">
                <img src="assets/icon-trash-normal.svg" class="delete" alt="Botón borrar">
                <img src="assets/icon-download.svg" class="download" alt="Botón descargar">
                <img src="assets/icon-max-normal.svg" class="maximize" alt="Botón maximizar">
            </div>
            <p class="gifo_user">${FavArray[i].author}</p>
            <p class="gifo_title">${FavArray[i].title}</p>
        </div>`;
            container.appendChild(bloque);
            bloque.addEventListener("mouseover", () => {
                bloque.querySelector(".gifoHover").classList.remove("hidden");
            });
            bloque.addEventListener("mouseout", () => {
                bloque.querySelector(".gifoHover").classList.add("hidden");
            });
            let buttons = bloque.querySelectorAll(".gifo_buttonbar img");
            if (window.matchMedia("(max-width: 1000px)").matches) {
                bloque.addEventListener("click", () => {
                    maximiza(bloque);
                });
            }
           
            buttons[0].addEventListener("click", () => {
                console.log("eliminando: " + bloque.querySelector(".gifo_title").innerHTML)
                FavArray.splice(i, 1);
                localStorage.setItem("FAVGIFOS", JSON.stringify(FavArray));
                renderFavourites();
            })
            buttons[1].addEventListener("click", () => {
                downloadGifo(FavArray[i].url, FavArray[i].title);
            });

            buttons[2].addEventListener("click", () => {
                maximiza(bloque);
            });


            buttons[0].addEventListener("mouseover", () => {
                buttons[0].src = "assets/icon-trash-hover.svg";
            });
            buttons[0].addEventListener("mouseout", () => {
                buttons[0].src = "assets/icon-trash-normal.svg";
            });
            
            buttons[1].addEventListener("mouseover", () => {
                buttons[1].src = "assets/icon-download-hover.svg";
            });
            buttons[1].addEventListener("mouseout", () => {
                buttons[1].src = "assets/icon-download.svg";
            });
            
            buttons[2].addEventListener("mouseover", () => {
                buttons[2].src = "assets/icon-max-hover.svg";
            });
            buttons[2].addEventListener("mouseout", () => {
                buttons[2].src = "assets/icon-max-normal.svg";
            });

        }
    }
}
renderFavourites();

MaxSection.querySelector(".closeup").addEventListener("click", () => {
    MaxSection.classList.add("hidden");
    TagSection.classList.remove("hidden");
    $favs.classList.add("hidden");
});
  
  
//trends
function trendingTags(array) {
    TrendingTags.innerHTML = "";
    for (let i = 0; i < 5; i++) {
      let tag = document.createElement("span");
      tag.classList.add("trending_tag");
      tag.innerHTML = array[i];
      TrendingTags.appendChild(tag);
    }
    tagssense();
}
  
function forGeneration(array) {
    for (let i = 0; i < 9; i++) {
      TrendingGIFOS[i] = new GIFO(
        i,
        array[i].username,
        array[i].title,
        array[i].images.original.url
      );
	}
}

function forTrends(offset) {
    trendscont.innerHTML = "";
    for (let i = offset; i < offset + 3; i++) {
      trendo = document.createElement("div");
      trendo.classList.add("gifo");
      trendo.innerHTML = `<img src="${TrendingGIFOS[i].url}" alt="${TrendingGIFOS[i].title}">
          <div class="gifoHover hidden sizes">
              <div class="gifo_buttonbar">
                  <img src="assets/icon-fav.svg" class="fav" alt="Botón favorito">
                  <img src="assets/icon-download.svg" class="download" alt="Botón descargar">
                  <img src="assets/icon-max-normal.svg" class="maximize" alt="Botón maximizar">
              </div>
              <p class="gifo_user">${TrendingGIFOS[i].author}</p>
              <p class="gifo_title">${TrendingGIFOS[i].title}</p>
          </div>`;
      trendscont.appendChild(trendo);
      hovers(trendo);
      boton(trendo);
    }
}
  
function searchDisable() {
    document.querySelector(".titletrend").classList.remove("hidden");
	document.querySelector(".TTtrending_tags").classList.remove("hidden");
}