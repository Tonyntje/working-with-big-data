

const countryList = () => {
    const countries = randomPersonData
    .map(person => person.region)
    .sort()
    const filtered = countries.filter((person, index) => countries.indexOf(person) === index);
    createListArray(filtered);
}

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

const getAverageAge = (e) => {
    const results = document.getElementById('extra-results')
    const buttonValue = e.target.value;
    const getPeopleFromCountry = randomPersonData.filter(element => element.region === buttonValue);
    const getAverageAgeFrom = Math.round(getPeopleFromCountry.map(person => person.age).reduce((a, b) => a + b) / getPeopleFromCountry.length);
    results.innerHTML = `The average age in ${buttonValue} is ${getAverageAgeFrom}`
};

// matchMaking()