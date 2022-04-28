const findSign = date => {
    const days = [21, 20, 21, 21, 22, 22, 23, 24, 24, 24, 23, 22];
    const signs = ["Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo",    "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn"];
    let month = date.getMonth();
    let day = date.getDate();
    if(month == 0 && day <= 20){
        month = 11;
    }   else if(day < days[month]){
        month--;
    };
    return signs[month];
};

const createListArray = (data) => {
    result.innerHTML = ''
    const parent = document.createElement('ul')
    data.forEach(element => {
        const listitem = document.createElement('li')
        listitem.innerHTML = element;
        parent.append(listitem);
    });
    result.append(parent);
}