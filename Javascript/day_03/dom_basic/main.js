// TRUY CẬP PHẦN TỬ DOM (cần nhớ)
// document.getElementById: Truy cập thông qua ID
// document.querySelector: Truy cập thông qua CSS Selector, trả về phần tử đầu tiên tìm thấy
// document.querySelectorAll: Truy cập thông qua CSS Selector, trả về danh sách các phần tử

//Ví dụ:
const heading=document.getElementById("heading");
console.log(heading);

const headingCSS =document.querySelector("#heading");
console.log(headingCSS);



//thay đổi css sẽ trở thành inline style
heading.style.color = "red";
headingCSS.style.backgroundColor="black"



//thay đổi text
heading.innerHTML="<span>Xin chào</span>"
heading.innerText="Xin chào các bạn"

const para = document.querySelectorAll("p");
Array.from(para).map(p=>p.style.color="blue");



//thêm phần tử
//appendChild() : Thêm phần tử vào cuối của phần tử cha
//prepend() : Thêm phần tử vào đầu của phần tử cha
//insertBefore() : Thêm phần tử vào trong phần tử cha và trước phần tử được chỉ được

//targetElement.insertAdjacentHTML(position, text);
//targetElement.insertAdjacentElement(position, element);

//position: Vị trí của phần tử cần thêm, bao gồm 4 vị trí sau:

//- beforebegin : Vị trí trước targetElement.
//- afterbegin : Bên trong targetElement, trước first child.
//- beforeend : Bên trong targetElement, sau last child.
//- afterend : Vị trí trước targetElement.
//Ví dụ: tạo thẻ p có nd là "Para 4" vào sau para 3
const p4 = document.createElement("p");
p4.innerText="Para 4"
console.log(p4)
//thêm vào đầu
document.body.appendChild(p4);
//thêm vào cuối
document.body.prepend(p4);

const p2 = document.querySelector(".Para")
console.log(p2);
//thêm vào giữa p1 và p2
document.body.insertBefore(p4,p2);

//Bài tập
const menu=[
    {
        label: "Facebook",
        url: "https://facebook.com"
    },
    {
        label: "Google",
        url: "https://google.com"
    },
    {
        label: "Youtube",
        url: "https://youtube.com"
    }
]

const script = document.querySelector("script");
menu.forEach(e => {
    const a = document.createElement("a");
    a.innerText=e.label;
    a.href=`${e.url}`
    document.body.insertBefore(a,script)
});



//Xóa phần tử p1
const p1= document.querySelector("p")
p1.parentNode.removeChild(p1)



//Thay thế phần tử (thay thế p2 thành button "Click me")
const btn = document.createElement("button");
btn.innerText= "Click me";
p2.parentNode.replaceChild(btn,p2)



//Sao chép phần tử
//node.cloneNode(deep)
//deep: Không bắt buộc
//- true : sao chép node, attributes và thành phần con của nó
//- false: chỉ sao chép Node và attributes (mặc định)



//Thao tác class CSS với classList
//- add(): Thêm các class được chỉ định
//- remove(): Loại bỏ các class được chỉ định
//- contains(): Kiểm tra xem class được chỉ định có tồn tại trên phần tử hay không
//- toggle(): toggles class được chỉ định