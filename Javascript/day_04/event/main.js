//XỬ LÝ SỰ KIỆN
// Cách 1: Sử dụng HTML-attribute
const sayHello = ()=>{
    alert("Xin chào các bạn 1") //hiển thị 1 câu thông báo
}


//Cách 2: Sử dụng DOM property
const btn2 = document.getElementById("btn_2")
btn2.onclick = () =>{
    alert("Xin chào các bạn 2");
}


//Cách 3: Sử dụng addEventListener
const btn3 = document.getElementById("btn_3");
btn3.addEventListener("click",()=>{
    alert("Xin chào các bạn 3");
})


