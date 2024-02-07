var Titre;
var Artiste;
var ImagePeinture;
var Prix;
var Info;

function Init() {
 Titre = document.getElementById('titre');
 Artiste = document.getElementById('artiste');
 ImagePeinture = document.getElementById('peinture');
 Prix = document.getElementById('prix');
 Info = document.getElementById('info');
}

function ChargerInfo(el) {

  var code = el.value;
  var typeFichier = document.getElementById('typefichier').value;
  var locationText = "ajax/peintures.";


    
  switch (typeFichier) {
    case "json" :{
    getJSON(locationText, code);
    getTXT (code);
    }
    break;
    case "xml" :{
      getXML(locationText, code);
      getTXT (code);
    }
    break;
  }
}

  function getTXT (code) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      
      if (xhr.readyState == 4 && xhr.status == 200) {
        Info.textContent = xhr.responseText
      }
    }

    xhr.open("GET", "ajax/" + code + ".txt", true);
	  xhr.send();
  }

  function getXML (locationText, code) {

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        DisplayXMLResponse(xhr.responseXML, code);
      }
    }
    
    xhr.open("GET", locationText + "xml", true);
    xhr.send();
  }

  function DisplayXMLResponse(xml, code) {
    var peinture = xml.getElementsByTagName("peinture");

    for (i = 0; i < peinture.length; i++) {
      if(peinture[i].getElementsByTagName("code")[0].firstChild.nodeValue == code) {
        var titre = peinture[i].getElementsByTagName("titre")[0].firstChild.nodeValue;
        var artiste = peinture[i].getElementsByTagName("artiste")[0].firstChild.nodeValue;
        var prix = peinture[i].getElementsByTagName("prix")[0].firstChild.nodeValue;
        var image = peinture[i].getElementsByTagName("image")[0].firstChild.nodeValue;
      }
    Titre.textContent = titre;
    Artiste.textContent = artiste;
    Prix.textContent = prix;
    ImagePeinture.src = "img/" + image;
    }
  }

  function getJSON (locationText, code) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        DisplayJSONResponse(JSON.parse(xhr.responseText), code);
      }
    }
    
    xhr.open("GET", locationText + "json", true);
    xhr.send();
  }

  function DisplayJSONResponse(json, code) {
    var peinture = json.peinture

    for (i = 0; i < peinture.length; i++) {
      if(peinture[i].code == code) {
        var titre = peinture[i].titre;
        var artiste = peinture[i].artiste;
        var prix = peinture[i].prix;
        var image = peinture[i].image;
      }
    }

    Titre.textContent = titre;
    Artiste.textContent = artiste;
    Prix.textContent = prix;
    ImagePeinture.src = "img/" + image;
   
  }