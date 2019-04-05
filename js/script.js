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

        if(!countryName.length) countryName = 'Poland';

        countriesList.classList.remove('hasnt');

        if (countriesList.firstElementChild) {
            countriesList.firstElementChild.classList.add('hidden');
        }



        fetch(url + countryName).then(function(resp) {
                return resp.json();
            }).then(showCountriesList);

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
            listItems += Mustache.render(templateList, tab[i]);
    }
    Mustache.parse(templateList);
    countriesList.insertAdjacentHTML('beforeend', listItems);
    }

})();