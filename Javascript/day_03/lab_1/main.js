//1. Truy cập vào thẻ h1 có id=“heading” thay đổi màu chữ thành ‘red’, và in hoa nội dung của thẻ đó
const h1 = document.getElementById("heading");
console.log(h1);
h1.style.color="red";
h1.style.textTransform="uppercase";

//2. Thay đổi màu chữ của tất cả thẻ có class “para” thành màu “blue” và có font-size = “20px”
const paraList = document.querySelectorAll(".para");
Array.from(paraList).map(p => {
    p.style.color="blue"
    p.style.fontSize="20px"
});

//3. Thêm thẻ a link đến trang ‘facebook’ ở đằng sau thẻ có class “para-3”
const a = document.createElement("a");
a.innerText="facebook";
a.href="https://facebook.com";
//const div = document.querySelector("div");
//document.body.insertBefore(a,div);

const para3 = document.querySelector(".para-3")
para3.insertAdjacentHTML("afterend","<a href='https://facebook.com'>facebook</a>")
para3.insertAdjacentElement("afterend",a)



//4. Thay đổi nội dung của thẻ có id=“title” thành “Đây là thẻ tiêu đề”
const title = document.getElementById("title");
console.log(title)
title.innerText="Đây là thẻ tiêu đề";


//5. Thêm class “text-bold” vào thẻ có class=“description” (định nghĩa class “text-bold” có tác dụng in đậm chữ)
const  des = document.querySelector(".description")
des.classList.add("text-bold");

//6. Thay thế thẻ có class=“para-3” thành thẻ button có nội dung là “Click me”
const btn = document.createElement("button")
btn.innerText="Click me"
para3.parentNode.replaceChild(btn,para3)

//7. Copy thẻ có class=“para-2” và hiển thị ngay đằng sau thẻ đó
const para2 = document.querySelector(".para-2")
const para2Clone = para2.cloneNode(true);
btn.parentNode.insertBefore(para2Clone,btn)

//8. Xóa thẻ có class=“para-1”
const p1 = document.querySelector(".para-1")
p1.parentNode.removeChild(p1)
