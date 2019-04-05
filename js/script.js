(function () {
    let url = 'https://restcountries.eu/rest/v1/name/';
    let countriesList = document.getElementById('countries');
    let templateList = document.getElementById('template-country-list').innerHTML;
    let listItems = ''


    if (countriesList.children[0].innerHTML === 'No data') {
        countriesList.classList.add('hasnt')
    }


    document.getElementById('search').addEventListener('click', searchCountries);

    function searchCountries() {
        let countryName = document.getElementById('country-name').value;
        let country = document.getElementById('country-name');
        let info = document.getElementById('info');

        if(countryName.length < 2) {
            info.innerText = "Your choose is not correct, Please again";
            country.classList.add('alert');
        }

        if(!countryName.length) countryName = 'Poland';

        countriesList.classList.remove('hasnt');

        if (countriesList.firstElementChild) {
            countriesList.firstElementChild.classList.add('hidden');
        }

        if(countryName.length >= 2) {

            fetch(url + countryName).then(function (resp) {
                return resp.json();
            }).then(showCountriesList);
        }

    }

    function showCountriesList(resp) {
        let values = [];
        resp.forEach(function(item) {
            //Here is the code that will execute on each successive item in the collection. A single item is hidden under an item variable.
            values.push(item);
        });

        getVirtualSt(values);
    }

    function getVirtualSt(tab) {

    let countryDataCount = tab.length;
    for (let i = 0; i < countryDataCount; i++) {
           if (! tab[i].capital ) tab[i].capital = 'Unknow capital';
           if (! tab[i].length && tab[i].region !== '') listItems += Mustache.render(templateList, tab[i]);
    }
    Mustache.parse(templateList);
    countriesList.insertAdjacentHTML('beforeend', listItems);
    }

})();