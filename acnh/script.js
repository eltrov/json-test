let requestURL = 'https://raw.githubusercontent.com/eltrov/json-test/master/hero-full-titles.json'
let request = new XMLHttpRequest();
request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function() {
  const superHeroes = request.response;



  populateHeader(superHeroes);
}


function populateHeader(jsonObj) {
  const hrs = jsonObj['hrs'];
  // EXTRACT VALUE FOR HTML HEADER. 
  // ('Book ID', 'Book Name', 'Category' and 'Price')
  var col = [];
  for (var i = 0; i < hrs.length; i++) {
    for (var key in hrs[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  // CREATE DYNAMIC TABLE.
  var table = document.createElement("table");

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  var tr = table.insertRow(-1); // TABLE ROW.
  /*
    for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th"); // TABLE HEADER.
      th.innerHTML = col[i];
      tr.appendChild(th);
    }
  */
  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (var i = 0; i < hrs.length; i++) {

    tr = table.insertRow(-1);

    for (var j = 0; j < col.length; j++) {
      var th = document.createElement("th"); // TABLE HEADER.
      th.innerHTML = hrs[i][col[j]];
      tr.appendChild(th);
      /*
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = hrs[i][col[j]];
      */
    }
  }


  const heroes = jsonObj['heroes'];

  var col2 = [];
  for (var i = 0; i < heroes.length; i++) {
    for (var key in heroes[i]) {
      if (col2.indexOf(key) === -1) {
        col2.push(key);
      }
    }
  }
  for (var i = 0; i < heroes.length; i++) {

    tr = table.insertRow(-1);

    for (var j = 0; j < col2.length; j++) {
      var tabCell = tr.insertCell(-1);
      tabCell.align = "center";
      if (j == 0) {
        var img = document.createElement("img");
        img.src = heroes[i][col2[0]];
        img.title = heroes[i][col2[1]];
        //img.width = 70;
        //img.height = 70;
        img.className = "icon";
        tabCell.appendChild(img);
      } else {
        tabCell.innerHTML = heroes[i][col2[j]];
      }

    }
  }

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  var elem = document.createElement('div');
  elem.style.cssText = 'position:absolute;width:100%;height:100%;z-index:100;'
  document.body.appendChild(elem);
  elem.appendChild(table);

}
