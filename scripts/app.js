export async function hetPost(url) {
    let response = await fetch(url)
    let data = await response.json()

    let data1 = JSON.stringify(data);
    let newCards = JSON.parse(data1);
    
        let cardsContent = '';
        let cards = data.sad
        for(let card of newCards) {
            cardsContent += 
        `<div class = 'card'>                        
            <h2>${card.title}</h2>
            <div> ${card.description}</div>
            <a href="${card.src}">Подробнее</a>
        </div>` 
        }
        document.querySelector('.cardsContainer').innerHTML = cardsContent;
    }




let moods = document.querySelectorAll('#mood');
      let handleClick = (event) => {
        input.value = event.target.dataset.mood;
        localStorage.setItem(`${new Date().getDate()}.${new Date().getMonth()}`, input.value);
        console.log(hetPost(event.target.dataset.card)); 
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
