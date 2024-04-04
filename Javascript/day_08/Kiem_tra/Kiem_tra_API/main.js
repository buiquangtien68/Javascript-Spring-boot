const API_POSTS = "https://jsonplaceholder.typicode.com/posts"
const API_Albums  = "https://jsonplaceholder.typicode.com/albums"
const API_Photos = "https://jsonplaceholder.typicode.com/photos"
const btnPost = document.getElementById("posts");
const btnAlbum = document.getElementById("albums");
const btnPhoto = document.getElementById("photos");
const ul= document.querySelector("ul")
const h1 = document.querySelector("h1")
btnPost.addEventListener("click", async()=>{
    h1.innerText="Type: posts"
    try {
        const res = await axios.get(API_POSTS);
        console.log(res)
        let liHtml=""
        res.data.forEach(re=> {
            liHtml+=`
            <li>${re.title}<li\>`
        });
        ul.innerHTML=liHtml
      
    } catch (error) {
        console.log(error)
    }
})
btnAlbum.addEventListener("click", async()=>{
    h1.innerText="Type: albums"
    try {
        const res = await axios.get(API_Albums);
        console.log(res)
        let liHtml=""
        res.data.forEach(re=> {
            liHtml+=`
            <li>${re.title}<li\>`
        });
        ul.innerHTML=liHtml
      
    } catch (error) {
        console.log(error)
    }
})
btnPhoto.addEventListener("click", async()=>{
    h1.innerText="Type: photos"
    try {
        const res = await axios.get(API_Photos);
        console.log(res)
        let liHtml=""
        res.data.forEach(re=> {
            liHtml+=`
            <li>${re.title}<li\>`
        });
        ul.innerHTML=liHtml
      
    } catch (error) {
        console.log(error)
    }
})
const buttons = document.getElementsByClassName("button");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    for (var j = 0; j < buttons.length; j++) {
      buttons[j].classList.remove("button-red");
    }
    this.classList.add("button-red");
  });
}
