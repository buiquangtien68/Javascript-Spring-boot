const content = ["Xin chào","Hello","Hallo","Chaos"]
const p = document.querySelector("p")
console.log(p)
const changeContent = ()=>{
    p.innerText=content[Math.floor(Math.random()*content.length)]
}

const btn2 = document.getElementById("btn-2")
const randomColor =()=>{
    return '#' + Math.floor(Math.random()*16777215).toString(16);
} 

btn2.onclick=()=>{
    p.style.color=randomColor();
}

const btn3 = document.getElementById("btn-3")
btn3.addEventListener("click",()=>{
    p.style.backgroundColor = 'rgb(' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ')'
})
