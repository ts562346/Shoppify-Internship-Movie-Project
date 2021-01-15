$(document).ready(() => {

	$('#searchForm').on('submit', (e) => {
		let searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});

	$('#searchForm2').on('submit', (e) => {
		let searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});
});


function getMovies(searchText) {
	
	axios.get('http://www.omdbapi.com/?apikey=aa927e6a&s='+searchText).then((response) => {
		
		let movies = response.data.Search;
		let output = '';
		$.each(movies, (index, movie) => {
			let title= movie.Title;
			output+= ` 
			<div class="col-md-3">
				<div class="well text-center">
					<img src=  "${movie.Poster}">
					<h5>${movie.Title}  (${movie.Year})</h5>
					<a id="demo" onclick="movieNominated('${movie.imdbID}')" class="btn btn-primary">Nominate</a>
				</div>
			</div>
			`;
		});
		$('#movies').html(output);
	})
	.catch((err) => {
		console.log(err);
	});
}
	


var dateArray = [];
var tittleArray = [];
var posterArray = [];

var array = [];

function movieNominated(id) {
	axios.get('http://www.omdbapi.com/?apikey=aa927e6a&i='+id).then((response) => {	
	let y= response.data.Year
	
	let t=response.data.Title
	let p=response.data.Poster

	if (!array.includes(id)) {
		array.push(id);
		dateArray.push(y);
		tittleArray.push(t);
		posterArray.push(p);
		print.call();

	} else {
		alert("The movie is already nominated")
	}

	})
	.catch((err) => {
		console.log(err);
	});
}


function print (){
	var output = ' '; 
	var i = 0;
	if (array.length > 5){
		alert("You have aleady nominated 5 movies")
	}
	else if (array.length != 0) {
		for  (i = 0; i < array.length; i++){
			var a = posterArray[i];
			
				output+= ` 
				<div class="col-md-3">
					<div class="well text-center">
						<img src="${a}">
						<h5>${tittleArray[i]}  (${(dateArray[i])})</h5>
						<a id="demo" onclick="remove(${i})" class="btn btn-primary">Remove</a>
					</div>
				</div>
				`;
				$('#movie').html(output);
		} 
	} else {
		// print after div "nominated list is empty"
						output+= ` 
				<div class="col-md-3">
					<div class="well text-center">
						
	
					</div>
				</div>
				`;
				$('#movie').html(output);
	}
}

var nominated = []
function remove (id) {
	delete array[id];
	delete tittleArray[id];
	delete posterArray[id];
	delete dateArray[id];

	posterArray = posterArray.filter(function( element ) {
   return element !== undefined;
});
		tittleArray = tittleArray.filter(function( element ) {
   return element !== undefined;
});
			array = array.filter(function( element ) {
   return element !== undefined;
});
		dateArray = dateArray.filter(function( element ) {
   return element !== undefined;
});

	print.call(); 
}

function show_image(src) {
    var img = document.createElement("img");
    img.src = src;
    document.body.appendChild(img);
}

// for modal

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

