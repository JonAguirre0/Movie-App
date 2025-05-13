//The site displays the trending movies since isTV is set to false as default,

//below is used so that it displays the first page of trending movies when the site first loads, isTV is false so that is displays movies not tv shows
let page = 1
let isTV = false
let isTopRated = false

//the api url for the next button
const NEXT_API_URL = `https://api.themoviedb.org/3/trending/movie/week?&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${page}`
const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c'
//below is the trending this week api url
const API_URL = `https://api.themoviedb.org/3/trending/movie/week?&api_key=${API_KEY}`
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`
const SEARCH_TV_API = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=`
//below is the random api url
const RANDOM_API_URL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&api_key=${API_KEY}`
// const TV_API = `https://api.themoviedb.org/3/discover/tv?include_adult=false&api_key=${API_KEY}`
const TV_API = `https://api.themoviedb.org/3/trending/tv/week?&api_key=${API_KEY}`

// Testing below
const upcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${page}`
const topratedMovies = `https://api.themoviedb.org/3/movie/top_rated?&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${page}`
const people = `https://api.themoviedb.org/3/person/${page}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

//Main Title on top of page
const title = document.getElementById('title')

//Buttons
const randomBtn = document.getElementById('randomBtn')
const randomTV = document.getElementById('randomTV')
const next = document.getElementById('next')
const prev = document.getElementById('prev')
const tv = document.getElementById('TV')
const movie = document.getElementById('Movie')
const logo = document.getElementById('logo')

const counter = document.getElementById('counter')


//Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    main.innerHTML = ''
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
    counter.innerHTML = `${page}`
}

function showMovies(movies) {
    //main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview, release_date } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
            <img src="${poster_path ? IMG_PATH + poster_path : 'https://media.istockphoto.com/id/1472933890/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=Rdn-lecwAj8ciQEccm0Ep2RX50FCuUJOaEM8qQjiLL0='}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                <span class="date">${release_date}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview} ${release_date}
            </div>  
        `
        main.appendChild(movieEl)
    })
}

//gets the TV Shows
async function getTvPage(url) {
    main.innerHTML = ''
    const res = await fetch(url)
    const data = await res.json()
    showTV(data.results)
}

function showTV(tvs) {
    //main.innerHTML = ''

    tvs.forEach((tv) => {
        const { name, poster_path, vote_average, overview, first_air_date } = tv

        const tvEl = document.createElement('div')
        tvEl.classList.add('movie')
        tvEl.innerHTML = `
            <img src="${poster_path ? IMG_PATH + poster_path : 'https://media.istockphoto.com/id/1472933890/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=Rdn-lecwAj8ciQEccm0Ep2RX50FCuUJOaEM8qQjiLL0='}" alt="${name}">
            <div class="movie-info">
                <h3>${name}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                <span class="date">${first_air_date}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview} ${first_air_date}
            </div>  
        `
        main.appendChild(tvEl)
    })
}

function getClassByRate(vote){
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

//Get top rated movies

async function getTopratedMovies(url) {
    main.innerHTML = ''
    const res = await fetch(url)
    const data = await res.json()

    showTopratedMovies(data.results)
    counter.innerHTML = `${page}`
}

function showTopratedMovies(topratedMovies) {
    //main.innerHTML = ''

    topratedMovies.forEach((topratedMovie) => {
        const { title, poster_path, vote_average, overview, release_date } = topratedMovie

        const topratedMovieEl = document.createElement('div')
        topratedMovieEl.classList.add('movie')
        topratedMovieEl.innerHTML = `
            <img src="${poster_path ? IMG_PATH + poster_path : 'https://media.istockphoto.com/id/1472933890/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=Rdn-lecwAj8ciQEccm0Ep2RX50FCuUJOaEM8qQjiLL0='}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                <span class="date">${release_date}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview} ${release_date}
            </div>  
        `
        main.appendChild(topratedMovieEl)
    })
}

//The search bar function
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        getTvPage(SEARCH_TV_API + searchTerm)
        title.innerHTML = `${searchTerm}`

        search.value = ''
        //to get rid of the prev, counter, next elements since not needed
        document.getElementById("prev").style.display = 'none'
        document.getElementById("counter").style.display = 'none'
        document.getElementById("next").style.display = 'none'
    } else {
        window.location.reload()
    }
})

//the button and the function below are the new things i added
randomBtn.addEventListener('click', () => {
    getRandomMovies()
    title.innerHTML = "Random Movies"
    //to get rid of the prev, counter, next elements since not needed
    document.getElementById("prev").style.display = 'none'
    document.getElementById("counter").style.display = 'none'
    document.getElementById("next").style.display = 'none'
})


//this function is so that every time you load the page you get a random api page which displays different movies
function getRandomMovies() {
    const randomPage = Math.floor(Math.random() * 500) + 1
    const RANDOM_API_URL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${randomPage}`;
    getMovies(RANDOM_API_URL)
}

//the random tv button which calls getRandomTV()
randomTV.addEventListener('click', () => {
    getRandomTV()
    title.innerHTML = "Random TV Shows"
    //to get rid of the prev, counter, next elements since not needed
    document.getElementById("prev").style.display = 'none'
    document.getElementById("counter").style.display = 'none'
    document.getElementById("next").style.display = 'none'
})

//displays the tv shows from a random page number
function getRandomTV() {
    const randomPage = Math.floor(Math.random() * 500) + 1
    const TV_API = `https://api.themoviedb.org/3/trending/tv/week?&api_key=${API_KEY}&page=${randomPage}` 
    getTvPage(TV_API) 
}

//The next button
next.addEventListener('click', () => {
    page++
    getNextPage()
    console.log("Next clicked")
    counter.innerHTML = `${page}`
})

function getNextPage() {
    if (isTV) {
        const TV_API = `https://api.themoviedb.org/3/trending/tv/week?&api_key=${API_KEY}&page=${page}` 
        getTvPage(TV_API)
        console.log("tv next")
        title.innerHTML = `Trending TV Shows Page ${page}`
    } else if(isTopRated){
        const topratedMovies = `https://api.themoviedb.org/3/movie/top_rated?&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${page}`
        getTopratedMovies(topratedMovies)
        title.innerHTML = `Top Rated Movies Page ${page}`;
    } else {
        const NEXT_API_URL = `https://api.themoviedb.org/3/trending/movie/week?&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${page}`
        getMovies(NEXT_API_URL)
        console.log("movie next")
        title.innerHTML = `Trending Movies Page ${page}`
    }
}

//The prev button
prev.addEventListener('click', () => {
    getPrevPage()
    console.log("Prev clicked")
    counter.innerHTML = `${page}`
})

function getPrevPage() {
    page--
    if (page < 1) page = 1
    if (isTV) {
        const TV_API = `https://api.themoviedb.org/3/trending/tv/week?&api_key=${API_KEY}&page=${page}` 
        getTvPage(TV_API)
        title.innerHTML = `Trending TV Shows Page ${page}`
    } else if(isTopRated){
        const topratedMovies = `https://api.themoviedb.org/3/movie/top_rated?&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${page}`
        getTopratedMovies(topratedMovies)
        title.innerHTML = `Top Rated Movies Page ${page}`;
    }
    else {
        const NEXT_API_URL = `https://api.themoviedb.org/3/trending/movie/week?&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${page}`
        getNextPage(NEXT_API_URL)
        title.innerHTML = `Trending Movies Page ${page}`
    }
}

//The TV button, when clicked it will display the trending tv shows of the week, sets isTV to true
tv.addEventListener('click', () => {
    page = 1
    isTV = true
    getTvPage(TV_API)
    title.innerHTML = `Trending TV Shows Page ${page}`
    counter.innerHTML = `${page}`
    //to display the prev, counter, next elements
    document.getElementById("prev").style.display = 'block'
    document.getElementById("counter").style.display = 'block'
    document.getElementById("next").style.display = 'block'
})

//The Movie button, when clicked it will display the trending movies of the week, set isTV false
movie.addEventListener('click', () => {
    page =1
    isTV = false
    isTopRated = false
    const NEXT_API_URL = `https://api.themoviedb.org/3/trending/movie/week?&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${page}`
    getNextPage(NEXT_API_URL)
    counter.innerHTML = `${page}`
    //to display the prev, counter, next elements
    document.getElementById("prev").style.display = 'block'
    document.getElementById("counter").style.display = 'block'
    document.getElementById("next").style.display = 'block'
})

const topratedBtn = document.getElementById('toprated')
topratedBtn.addEventListener('click', () => {
    page = 1
    isTV = false
    isTopRated = true
    title.innerHTML = "Top Rated Movies"
    const topratedMovies = `https://api.themoviedb.org/3/movie/top_rated?&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${page}`
    getTopratedMovies(topratedMovies)
    counter.innerHTML = `${page}`
    //to display the prev, counter, next elements
    document.getElementById("prev").style.display = 'block'
    document.getElementById("counter").style.display = 'block'
    document.getElementById("next").style.display = 'block'
    
})

//The below are for the "ripple" effect when the user clicks on a button
const buttons = document.querySelectorAll('.ripple'||'.tvmovie')
buttons.forEach(button => {
    button.addEventListener('click', function (e)  {
        const x = e.clientX
        const y = e.clientY
        
        const buttonTop = e.target.offsetTop
        const buttonLeft = e.target.offsetLeft 
        
        const xInside = x - buttonLeft
        const yInside = y - buttonTop

        const circle = document.createElement('span')
        circle.classList.add('circle')
        circle.style.top = yInside + 'px'
        circle.style.left = xInside + 'px'

        this.appendChild(circle)

        setTimeout(() => circle.remove(), 500)
    })
})

//The Logo button which refreshes the page
logo.addEventListener('click', () => {
    window.scrollTo(0,0)
    window.location.reload()
})

//Below is for adding the dark mode/light mode button but with imgs
const darkImg = document.querySelector('.toggleImg')
const darkModeBtn = document.querySelector('.dark-toggle')
darkModeBtn.addEventListener('click', () => {
    if(darkImg.src === 'https://cdn-icons-png.freepik.com/512/6714/6714978.png'){
        darkImg.src = 'https://static.thenounproject.com/png/979909-200.png'
        //below is the white sun img
        //darkImg.src = 'https://media.istockphoto.com/id/1417730979/vector/sun-dark-mode-glyph-ui-icon.jpg?s=612x612&w=0&k=20&c=a0sZ_9VrtPK44k78IM-Zgjhz79hmx5eIyOCX1FoqYko='
        document.body.classList.toggle('dark-theme')
    } else {
        darkImg.src = 'https://cdn-icons-png.freepik.com/512/6714/6714978.png'
        document.body.classList.toggle('dark-theme')
    }
})

const menu = document.querySelector('.menu')
const offScreenMenu = document.querySelector('.off-screen-menu')

menu.addEventListener('click', () => {
    menu.classList.toggle('active')
    offScreenMenu.classList.toggle('active')
})