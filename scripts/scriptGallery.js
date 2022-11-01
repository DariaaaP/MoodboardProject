let moods = document.querySelectorAll('#mood');
      let handleClick = (event) => {
        input.value = event.target.dataset.mood;
        console.log(event.target.dataset.mood);
        apiRequest();
        document.querySelector('#search_box').classList.remove('show')
      }

      moods.forEach(mood => {   
        mood.addEventListener('click', handleClick)
      })


        document.querySelector("#input").addEventListener("keydown", (event) => {
  if (event.key == "Enter")
    apiRequest();
});

document.querySelector("#search").addEventListener("click", () => {
    apiRequest();
});

apiRequest = () => {

  document.querySelector("#grid").textContent = "";

  const url = 'https://api.unsplash.com/search/photos?query='+input.value+'&per_page=6&client_id=6zKKtMSoTSQqb5kR3q6-NlGW7EHSGWmEAYkq9libQt8';

  fetch(url)

  .then(response => {
    if (!response.ok) throw Error(response.statusText);
      return response.json();
   })

   .then(data => {
      loadImages(data);
   })

   .catch(error => console.log(error));   
}

loadImages = (data) => {
  for(let i = 0; i < data.results.length; i++){
    let image = document.createElement("div");
    image.className = "img";
    image.style.backgroundImage = "url("+data.results[i].urls.raw + "&w=1366&h=768" +")";
    image.addEventListener("dblclick", function(){
      window.open(data.results[i].links.download, '_blank');
    })
    document.querySelector("#grid").appendChild(image);
  }
}
