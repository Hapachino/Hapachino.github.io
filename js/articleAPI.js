document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
    var button = document.getElementById('submit');

    button.addEventListener('click', function(event) {
        var req = new XMLHttpRequest();

        var endpoint = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
        var api_key = "0b8bb4e0f6ef4e6cb68cc6c1274e2c83"
        var q = encodeURIComponent(document.getElementById('q').value);
        var begin_date = document.getElementById('begin_date').value;
        var end_date = document.getElementById('end_date').value;
        var sort= document.getElementById('sort').value;

        var parameters = "api-key=" + api_key + "&q=" + q + "&sort=" + sort;

        if (begin_date) {
            parameters += "&begin_date=" + begin_date;
        }

        if (end_date) {
            parameters += "&end_date=" + end_date;
        }

        var query = endpoint + parameters;

        req.open("GET", query, true);

        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                document.getElementById("results").innerHTML = ""
                var object = JSON.parse(req.responseText);
                var docs = object.response.docs;

                for (var i = 0; i < docs.length; ++i) {
                    var a = document.createElement('a');
                    a.setAttribute('href', docs[i].web_url);
                    a.innerHTML = docs[i].headline.main;

                    var headline = document.createElement('h2');
                    headline.appendChild(a);
                    document.getElementById("results").appendChild(headline);

                    var pub_date = document.createElement('div');
                    pub_date.textContent = docs[i].pub_date.slice(0, 10);
                    document.getElementById("results").appendChild(pub_date);

                    var snippet = document.createElement('p');
                    snippet.textContent = docs[i].snippet;
                    document.getElementById("results").appendChild(snippet);

                    if (docs[i].multimedia[0]) {
                        var img = document.createElement('img');
                        img.src = "http://www.nytimes.com/" + docs[i].multimedia[0].url;
                        img.style.height = '75px';
                        img.style.width = '75px';
                        document.getElementById("results").appendChild(img);
                    }
                }
            } else {
                console.log("Error: " + req.statusText);
            }
        });
        req.send(null); 

        event.preventDefault();
        event.stopPropagation();
    });
}