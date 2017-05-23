document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
    var button = document.getElementById('submit');

    button.addEventListener('click', function(event) {
        var req = new XMLHttpRequest();

        var endpoint = "https://api.nytimes.com/svc/topstories/v2/";
        var api_key = "0b8bb4e0f6ef4e6cb68cc6c1274e2c83"
        var section = document.getElementById('section').value;

        endpoint = endpoint + section + ".json";

        var query = endpoint + "?api-key=" + api_key;

        req.open("GET", query, true);

        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                document.getElementById("results").innerHTML = ""
                var object = JSON.parse(req.responseText);
                var results = object.results;

                for (var i = 0; i < results.length; ++i) {
                    var a = document.createElement('a');
                    a.setAttribute('href', results[i].url);
                    a.innerHTML = results[i].title;

                    var title = document.createElement('h2');
                    title.appendChild(a);
                    document.getElementById("results").appendChild(title);
                    
                    var byline = document.createElement('div');
                    byline.textContent = results[i].byline;
                    document.getElementById("results").appendChild(byline);

                    var created_date = document.createElement('div');
                    created_date.textContent = results[i].created_date.slice(0, 10);
                    document.getElementById("results").appendChild(created_date);

                    var abstract = document.createElement('p');
                    abstract.textContent = results[i].abstract;
                    document.getElementById("results").appendChild(abstract);

                    if (results[i].multimedia[0]) {
                        var img = document.createElement('img');
                        img.src = results[i].multimedia[0].url;
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