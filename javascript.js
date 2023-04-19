

let cacheKey;
const movieContainer = document.getElementById("movie-container");

function search() {
  
  const searchTerm = document.getElementById('search-input').value;
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "#000000";
  

  const url = `https://api.themoviedb.org/3/search/movie?api_key=172d732e666c6978e4d8c01575de9fe5&query=${searchTerm}`;
  cacheKey = searchTerm.toLowerCase();

  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    // return the cached data
    let serchedmovie = (JSON.parse(cachedData));
    renderMovieCards(serchedmovie.results);

  } else {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          localStorage.setItem(cacheKey, JSON.stringify(data));
          renderMovieCards(data.results);

        }
        
        else {
          

          showError();
          
        }

      })
      .catch(error => console.error(error));
  }
}

function renderMovieCards(results) {
  
  

  // making movie cards
  movieContainer.innerHTML = "";
  for (let i = 0; i < 15; i++){
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card", "movie-card-fixed-size");
    
    const posterImg = document.createElement("img");
    posterImg.src = `https://image.tmdb.org/t/p/w500${results[i].poster_path}`;
    posterImg.alt = `${results[i].original_title} Poster`;
    var movieInfoinCard = document.createElement("div");
    movieInfoinCard.classList.add("movie-info-in-card");
    const title = document.createElement("h3");
    title.textContent = results[i].original_title;
    
    
    movieCard.appendChild(posterImg);
    movieInfoinCard.appendChild(title);
    movieCard.appendChild(movieInfoinCard);
    movieCard.addEventListener('click', () => {
      showMovieDetails(results[i]);
    });
    movieContainer.appendChild(movieCard);
  }

  
}


// making movie cards
function showMovieDetails(movieData) {
  const detailBox = document.createElement('div');
  detailBox.classList.add('movie-detail-box');
  const posterImg = document.createElement('img');
  posterImg.classList.add("image-styling");
  posterImg.src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
  posterImg.alt = `${movieData.original_title} Poster`;
  const movieInfo = document.createElement('div');
  movieInfo.classList.add('movie-info');
  const title = document.createElement('h3');
  title.textContent = movieData.original_title;
  const releaseDate = document.createElement('p');
  releaseDate.textContent = "Release Date: " + movieData.release_date;
  const ratings = document.createElement('p');
  ratings.textContent = "Popularity: " + movieData.popularity;
  const overview = document.createElement('p');
  overview.textContent = movieData.overview;
  const closeBtn = document.createElement('button');
  closeBtn.classList.add('close-button');
  closeBtn.textContent = 'Close';
  closeBtn.addEventListener('click', () => {
    detailBox.remove();
  });
  

  movieInfo.appendChild(posterImg);
  movieInfo.appendChild(title);
  movieInfo.appendChild(releaseDate);
  movieInfo.appendChild(ratings);
  movieInfo.appendChild(overview);  
  movieInfo.appendChild(closeBtn);
  detailBox.appendChild(movieInfo);
  document.body.appendChild(detailBox);
}


// making Error 
function showError() {
  const errorbackground = document.createElement('div');
  errorbackground.classList.add('errorbackground');
  const errorBox = document.createElement('div');
  errorBox.classList.add('error-box');
  const Error = document.createElement('p');
  Error.textContent = "We are sorry, we are unable to get this movie :(";
  const closeBtn = document.createElement('button');
  closeBtn.classList.add('close-button');
  closeBtn.textContent = 'Close';
  closeBtn.addEventListener('click', () => {
    errorbackground.remove();
  });

  errorBox.appendChild(Error);
  errorBox.appendChild(closeBtn);
  errorbackground.appendChild(errorBox);

  document.body.appendChild(errorbackground);


}