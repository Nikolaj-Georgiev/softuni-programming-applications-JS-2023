function loadRepos() {

   let url = 'https://api.github.com/users/testnakov/repos';
   const httpRequest = new XMLHttpRequest();
   httpRequest.addEventListener('readystatechange', function () {
      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
         // let date = JSON.parse(httpRequest.responseText);

         document.getElementById("res").textContent = httpRequest.responseText;
         // .map(x => x.name).join(' .I. ');
      }
   });
   httpRequest.open("GET", url);
   httpRequest.send();

}