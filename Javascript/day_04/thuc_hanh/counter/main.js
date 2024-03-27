const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const counter = document.getElementById("counter");

prevBtn.addEventListener("click",()=>{
    counter.innerText=Number(counter.innerText)-1;
    changeColor(counter.innerText)
})
nextBtn.addEventListener("click",()=>{
    counter.innerText=Number(counter.innerText)+1;
    changeColor(counter.innerText)
})

const changeColor = (value)=>{
    if(value>0){
        counter.style.color="green"
    }else if(value==0){
        counter.style.color="#333333"
    }else{
        counter.style.color="red"
    }
}