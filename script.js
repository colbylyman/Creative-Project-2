document.getElementById("nameSubmitButton").addEventListener("click", function(event) {
    event.preventDefault();
    const inputName = document.getElementById("nameInput").value;
    inputCountry = document.getElementById("inputCountry").value;
    if (inputCountry === "ALL") {
        inputCountry = "";
    }
    if (inputName === "")
      return;
    console.log(inputName);
    console.log(inputCountry);


    let nameWebsite = "https://api.genderize.io?name="
    nameWebsite += inputName;
    if (inputCountry !== "") {
        nameWebsite += ("&country_id=" + inputCountry);
    }
    fetch(nameWebsite) 
        .then(function(response) {
	        return response.json();
    })
        .then(function(json) {
            console.log(json);
            let results = "";

            if (json.count !== 0) {
                if (json.gender === "male") {
                    results += "<div class=\"nameResultsBoy\">";
                }
                else {
                    results += "<div class=\"nameResultsGirl\">";
                }
                if (inputCountry !== "") {
                    if (inputCountry === "GB") {
                        results += '<image class="flagImage" src="uk_flag.jpg"></image>';
                    }
                    if (inputCountry === "US") {
                        results += '<image class="flagImage" src="us_flag.png"></image>';
                    }
                    if (inputCountry === "MX") {
                        results += '<image class="flagImage" src="mexican_flag.jpg"></image>';
                    }
                    if (inputCountry === "FR") {
                        results += '<image class="flagImage" src="french_flag.png"></image>';
                    }
                }
                results += '<div>';
                results += '<h2>' + json.name + '</h2>';
                results += '<h3>' + json.count + " Total People" + '</h3>';
                results += '</div>';
                results += '<h4>' + (json.probability * 100) + "%   " + json.gender + "\t\t";
                if (json.gender === "male") {
                    results += (100 - (json.probability * 100)) + "%   " + "female";
                }
                else {
                    results += (100 - (json.probability * 100)) + "%   " + "male";
                }
                results += '</h4>';
                results += "<div>";
            }
            else {
                results += '<h1>Nobody has your name in this coutury</h1>'
            }
            document.getElementById("nameResults").innerHTML = results;

    });
});


document.getElementById("manyNameSubmitButton").addEventListener("click", function(event) {
    event.preventDefault();
    var manyNames = [];
    manyNames.push(document.getElementById("nameInput0").value);
    manyNames.push(document.getElementById("nameInput1").value);
    manyNames.push(document.getElementById("nameInput2").value);
    manyNames.push(document.getElementById("nameInput3").value);
    manyNames.push(document.getElementById("nameInput4").value);
    inputCountry = document.getElementById("inputCountryMany").value;
    if (inputCountry === "ALL") {
        inputCountry = "";
    }
    if (manyNames === "")
        return;
    console.log(manyNames);
    console.log(inputCountry);


    let nameWebsite = "https://api.genderize.io/?"
    for (var i = 0; i < manyNames.length; i++) {
        nameWebsite += "name[]=" + manyNames[i] + '&';
    }

    if (inputCountry !== "") {
        nameWebsite += ("&country_id=" + inputCountry);
    }

    console.log(nameWebsite);
    fetch(nameWebsite) 
        .then(function(response) {
	        return response.json();
    })
        .then(function(json) {
            console.log(json);
            let results = "";
            var currentName;
            for (var i = 0; i < manyNames.length; i++) {
                currentName = json[i];
                if (json[i].count !== 0) {
                    if (json[i].gender === "male") {
                        results += "<div class=\"nameResultsBoy\">";
                    }
                    else {
                        results += "<div class=\"nameResultsGirl\">";
                    }
                    if (inputCountry !== "") {
                        if (inputCountry === "GB") {
                            results += '<image class="flagImage" src="uk_flag.jpg"></image>';
                        }
                        if (inputCountry === "US") {
                            results += '<image class="flagImage" src="us_flag.png"></image>';
                        }
                        if (inputCountry === "MX") {
                            results += '<image class="flagImage" src="mexican_flag.jpg"></image>';
                        }
                        if (inputCountry === "FR") {
                            results += '<image class="flagImage" src="french_flag.png"></image>';
                        }
                    }
                    results += '<div>';
                    results += '<h2>' + json[i].name + '</h2>';
                    results += '<h3>' + json[i].count + " Total People" + '</h3>';
                    results += '</div>';
                    results += '<h4>' + (json[i].probability * 100) + "%   " + json[i].gender + "\t\t";
                    if (json[i].gender === "male") {
                        results += (100 - (json[i].probability * 100)) + "%   " + "female";
                    }
                    else {
                        results += (100 - (json[i].probability * 100)) + "%   " + "male";
                    }
                    results += '</h4>';
                    results += "<div>" + '</br>';
                }
                else {
                    results += '<h1>Nobody has you\'re name in this coutury</h1>' + '</br>';
                }
            }
            document.getElementById("nameResultsMany").innerHTML = results;
        });
});



