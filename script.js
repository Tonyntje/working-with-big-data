
// Short function to get the country list sorted uniquely. This was easy.
const countryList = () => {
    const countries = randomPersonData
    .map(person => person.region)
    .sort()
    const filtered = countries.filter((person, index) => countries.indexOf(person) === index);
    createListArray(filtered);
}

// This was reasonable challenging. Specially the capricorn part.
// But i could reuse this function later in step 6.
const capricornWoman = () => {
    const parent = document.createElement('ul')
    const result = document.getElementById('result');
    result.innerHTML = ''
    const women = randomPersonData
    .filter(woman => {
        const sign = findSign(new Date(woman.birthday.mdy))
        return woman.gender === 'female' && woman.age > 30 && sign === 'Capricorn'
    }).sort((a, b) => a.name.localeCompare(b.name))
    women.forEach(element => {
        const listitem = document.createElement('li')
        const listImage = document.createElement('img')
        listImage.src = `${element.photo}`
        listitem.innerHTML = `${element.name} ${element.surname}`
        listitem.prepend(listImage)
        parent.append(listitem);
    });
    result.append(parent);
}

// Medium sized function to get the amount of poeple per country. 
// This was easy and could be written better
const oldCreditCards = () => {
    const parent = document.createElement('ul')
    const result = document.getElementById('result');
    result.innerHTML = ''
    var today = new Date();
    var mm = parseInt(String(today.getMonth() + 1).padStart(2, '0'));
    var yyyy = today.getFullYear() - 2000;

    const creditcards = randomPersonData
    .filter(person => {
        const splode = person.credit_card.expiration.split('/')
        return person.age > 23 && parseInt(splode[0]) < mm && parseInt(splode[1]) === yyyy + 1 || person.age > 23 && parseInt(splode[0]) > mm && parseInt(splode[1]) == yyyy
    }).sort((a, b) => {
        const aDate = a.credit_card.expiration.split('/')
        const bDate = b.credit_card.expiration.split('/')
        const stackA = aDate[1]+aDate[0].padStart(2, '0')
        const stackB = bDate[1]+bDate[0].padStart(2, '0')
        return stackA - stackB
    })
    creditcards
    .forEach(element => {
        const listitem = document.createElement('li')
        listitem.innerHTML = `${element.name} ${element.surname} -- Tel: ${element.phone} -- ${element.credit_card.number} (exp: ${element.credit_card.expiration})`
        parent.append(listitem);
    });
    result.append(parent);
}

// Medium sized function to get the amount of poeple per country. 
// This was easy and could be written better
const mostPeople = () => {
    const parent = document.createElement('ul')
    const result = document.getElementById('result');
    result.innerHTML = ''
    const countries = randomPersonData
    .map(person => person.region).sort()
    const countCountries = [];
    let prev;
    countries.forEach(element => {
        if(prev != undefined && prev.country === element) {
            prev.count++
        } else {
            const countryObj = {country: element, count: 1}
            countCountries.push(countryObj)
            prev = countryObj
        }
    })
    countCountries.sort((a,b) => b.count - a.count).forEach(element => {
        const listitem = document.createElement('li')
        listitem.innerHTML = `The list has ${element.count} people from ${element.country}`
        parent.append(listitem);
        result.append(parent);
    })
}

// Short function to get the average Age. This was easy.
const averageAge = () => {
    const result = document.getElementById('result');
    result.innerHTML = ''
    const countries = randomPersonData
    .map(person => person.region)
    .sort()
    const filtered = countries.filter((person, index) => countries.indexOf(person) === index);
    filtered.forEach(element => {
        const button = document.createElement('button')
        button.value = element
        button.innerHTML = element
        button.addEventListener('click', getAverageAge);
        result.append(button)
    })
    const extraResults = document.createElement('p')
    extraResults.id = 'extra-results'
    result.append(extraResults);
}

// SShort function to support the above
const getAverageAge = (e) => {
    const results = document.getElementById('extra-results')
    const buttonValue = e.target.value;
    const getPeopleFromCountry = randomPersonData.filter(element => element.region === buttonValue);
    const getAverageAgeFrom = Math.round(getPeopleFromCountry.map(person => person.age).reduce((a, b) => a + b) / getPeopleFromCountry.length);
    results.innerHTML = `The average age in ${buttonValue} is ${getAverageAgeFrom}`
};

const matchMaking = () => {
    // Initiate start and basics of app
    const result = document.getElementById('result');
    const layer = document.createElement('div')
    let id = 1;
    layer.id = 'gridify'
    result.innerHTML = ''
    result.append(layer)

    // Sort all this junk
    const sorted = randomPersonData
        .map(person => {
            const sign = findSign(new Date(person.birthday.mdy))
            return {name: person.name, photo: person.photo, country: person.region, age: person.age, zodiac_sign: sign }
        })
        .sort((a, b) => a.name.localeCompare(b.name)).filter(person => person.age > 23 && person.name != '')

    // For Each filtered mapped & sorted person perform a recursive function. Too much noise otherwise.
    sorted.forEach(element => placeholder(element, id++, sorted, layer)) // Found id++ out by trying
}

function placeholder(element, id, sorted, layer) {
    // Create Base Elements
        const card = document.createElement('div')
        const title = document.createElement('p')
        const age = document.createElement('p')
        const zodiacsign = document.createElement('p')
        const region = document.createElement('p')
        const match = document.createElement('button')
        const image = document.createElement('img')
    // Assign properties to Elements
        image.src = element.photo
        title.innerHTML = `${element.name}`
        age.innerHTML = `${element.age}`
        zodiacsign.innerHTML = `${element.zodiac_sign}`
        region.innerHTML = `${element.country}`
        match.innerHTML  = `Find match`
    // Append elements to card (loopable via array?)
        card.append(image)
        card.append(title)
        card.append(age)
        card.append(zodiacsign)
        card.append(region)
        card.append(match)
        card.id = id;
        match.value = id;
    // Add eventlistener to button
    match.addEventListener('click', (e) => {
        let id = 2;
        // Const everyhting usefull
        const gridi = document.getElementById('gridify')
        const allMatches = sorted.filter(person => person.zodiac_sign === element.zodiac_sign && person.name != element.name)
        const mainMatch = (document.getElementById(e.target.value))
        const availableMatches = document.createElement('div')
        const matchHeader = document.createElement('h1')

        // Append a shitload with eachother
        matchHeader.innerHTML = `Matches for ${element.name}`
        availableMatches.id = 'matches'
        gridi.innerHTML = ''
        layer.innerHTML = ''
        gridi.append(mainMatch)
        gridi.append(matchHeader)
        result.append(availableMatches)

        // OMG! It's recursive :,)!
        // But useless :,(!
        // Unless >:)...
        // Need to recurse the function to all matches. Pretty clever for future features
        allMatches.forEach(match => {
            placeholder(match, id, sorted, availableMatches)
            id++
        });
    })
    layer.append(card)
}