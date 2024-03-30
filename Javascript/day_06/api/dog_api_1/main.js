/* 
API là gi? Application Programming Interface



*/

//Sử dụng build-in fetch API của Js để gửi request lên server
const btn = document.getElementById("btn");
const image = document.getElementById("image");

// Lắng nghe sự kiện khi bấm vào nút "random"
// btn.addEventListener("click",  () =>{
//     fetch("https://dog.ceo/api/breeds/image/random")
//         .then(response =>response.json())
//         .then(data => {
//             console.log(data);
//             image.src=data.message;
//         })
//         .catch(err=> console.log(err))
// })


// btn.addEventListener("click", async () =>{
//     try{
//         const response = await fetch("https://dog.ceo/api/breeds/image/random")
//         const data = await response.json()
//         image.src=data.message;
//     }catch(err){
//         console.log(err)
//     }
// })


//Axios + promise
// btn.addEventListener("click", ()=>{
//     axios.get("https://dog.ceo/api/breeds/image/random")
//     .then(res => {
//         console.log(res)
//         image.src=res.data.message;
//     })
//     .catch(err=>console.log(err))
// })

//Axios + Async/Await
btn.addEventListener("click", async ()=>{
    try{
        const res = await axios.get("https://dog.ceo/api/breeds/image/random")
        image.src = res.data.message;
    }catch(err){
        console.log(err)
    }
})