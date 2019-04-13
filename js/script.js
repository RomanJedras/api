(function () {
    const url = 'https://restcountries.eu/rest/v1/name/';
    const countriesList = document.getElementById('countries');
    const templateList = document.getElementById('template-country-list').innerHTML;
    let listItems = '';
    let isLoad = false;



    if (countriesList.children[0].innerHTML === 'No data') {
        countriesList.classList.add('hasnt')
    }


    const button = document.getElementById('search');
        button.addEventListener('click', searchCountries);


    function searchCountries() {

        isLoad = true;

        let countryName = document.getElementById('country-name').value;
        let country = document.getElementById('country-name');
        let info = document.getElementById('info');
        if(countryName.length < 2) {
            info.innerText = "Your choose is not correct, Please again";
            country.classList.add('alert');
        }


        if(!countryName.length) countryName = 'Poland';

        countriesList.classList.remove('hasnt');


        if (countryName.length >= 2) {


         countriesList.firstElementChild.innerHTML = "Waiting by data";
         // url documentation about fetch : https://kursjs.pl/kurs/ajax/fetch.php

            fetch(url + countryName).then(function (resp) {

                  if (resp.ok ) {
                      isLoad = false;
                      button.innerText = 'Just get data';
                      info.style.color = '';
                      countriesList.firstElementChild.classList.add('status');
                      countriesList.firstElementChild.classList.remove('error');
                      countriesList.firstElementChild.innerHTML = 'Download information about countries';
                      info.innerText = "Data correct";
                      return resp.json();
                  } else {
                      return Promise.reject(resp);
                  }

                }).then(getVirtualSt).catch(function (error) {

                    if (error.status === 404) {
                        console.log("Error: this request is empty");
                    }

                    info.style.color = 'red';
                    info.innerText = "Your choose is not correct, Please again";
                    countriesList.firstElementChild.classList.add('error');
                    countriesList.firstElementChild.innerHTML = 'No data';

                    while (countriesList.children.length > 1) {
                        countriesList.removeChild(countriesList.lastChild);
                     }
                });
            }
     }


     function getVirtualSt(tab) {

        let countryDataCount = tab.length;
        Mustache.parse(templateList);
        for (let i = 0; i < countryDataCount; i++) {
            if (!tab[i].capital) tab[i].capital = 'Unknow capital';
            if (!tab[i].length && tab[i].region !== '') listItems = Mustache.render(templateList, tab[i]);
                countriesList.insertAdjacentHTML('beforeend', listItems);
            }
        }
    })();