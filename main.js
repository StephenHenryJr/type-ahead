const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

// fetch our endpoint array, convert it to json data and push it to our cities array
// we use a spread operator here when pushing the data to our array
fetch(endpoint)
    .then(response => response.json())
    .then(jsonResponse => cities.push(...jsonResponse))

console.log(cities)   

// finds matches by taking in variable of wordToMatch
// this will come from our input
// filter through our cities array for city or state matching our regex which comes from our wordToMatch inputs
function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi'); // creates expression to be used with wordToMatch with 'gi' representing global and insensitive
        return place.city.match(regex) || place.state.match(regex)
    });
}

// function grabbed from stack overflow to add comma separators 
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


// variable matchArray captures what is returned from our search
// we use .map() to return and plug the values into HTML
function displayMatches() {
    console.log(this.value);
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi'); // create variable with RexExp rules
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>`
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)