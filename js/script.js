(function () {
    const url = 'https://restcountries.eu/rest/v1/name/';
    const countriesList = document.getElementById('countries');
    const templateList = document.getElementById('template-country-list').innerHTML;
    let listItems = '';
    let status = '';
    let isLoad = false;
    let count = 0;


    if (countriesList.children[0].innerHTML === 'No data') {
        countriesList.classList.add('hasnt')
    }


    const button = document.getElementById('search');
        button.addEventListener('click', searchCountries);

        button.onclick = function () {
            count += 1;
        };


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


        if(countryName.length >= 2 && ! isLoad ) {

         status = "Waiting by data";
         countriesList.firstElementChild.innerHTML = status;
         setTimeout(function () {

            fetch(url + countryName).then(function (resp) {
                if (resp.status !== 200) {
                    throw "InvalidData";
                } else {
                  button.innerText = 'Just get data';
                  info.style.color = '';
                  countriesList.firstElementChild.classList.add('status');
                  countriesList.firstElementChild.classList.remove('error');
                  status = 'Download information about countries';
                  countriesList.firstElementChild.innerHTML = status;
                  info.innerText = "Data correct";
                  return resp.json();
                }

                }).then(showCountriesList).catch(function (resp) {
                  if (resp) {
                    info.style.color = 'red';
                    info.innerText = "Your choose is not correct, Please again";
                    countriesList.firstElementChild.classList.add('error');
                    status  = 'No data';
                    countriesList.firstElementChild.innerHTML = status;
                    setTimeout(function () {location.reload()},3000)
                    }

                });
          },3000)
        }
        isLoad = true;



    }

    function showCountriesList(resp) {

        try {
          let values = [];
          resp.forEach(function (item) {
              //Here is the code that will execute on each successive item in the collection. A single item is hidden under an item variable.
              values.push(item);

          });

          getVirtualSt(values);
      } catch(error) {
          console.error(error);
        }
    }

    function getVirtualSt(tab) {

        let countryDataCount = tab.length;

        for (let i = 0; i < countryDataCount; i++) {
            if (!tab[i].capital) tab[i].capital = 'Unknow capital';
            if (!tab[i].length && tab[i].region !== '') listItems += Mustache.render(templateList, tab[i]);
        }
        Mustache.parse(templateList);
        countriesList.insertAdjacentHTML('beforeend', listItems);
    }

})();