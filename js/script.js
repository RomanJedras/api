
(function () {


    const button = document.getElementById('get-joke');

    document.addEventListener('DOMContentLoaded', function() {
        getJoke();
        button.addEventListener('click', function () {
            getJoke();
        });
    });

    let paragraph = document.getElementById('joke');
    const url = 'http://api.icndb.com/jokes/random';
    function getJoke() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.addEventListener('load', function(){
            let response = JSON.parse(xhr.response);
            paragraph.innerHTML = response.value.joke;
        });
        xhr.send();
    }

})();