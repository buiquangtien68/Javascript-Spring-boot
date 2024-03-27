// Lắng nghe sự kiện keydown
// document.addEventListener("keydown", function () {
//     console.log("keydown");
// });

// // Lắng nghe sự kiện keyup
// document.addEventListener("keyup", function () {
//     console.log("keyup");
// });

// // Lắng nghe sự kiện keypress
// document.addEventListener("keypress", function () {
//     console.log("keypress");
// });

// document.addEventListener("keydown", function (event) {
//     console.log(event);
// });



// Thực hành
let products = [
    {
        name: "Iphone 13 Pro Max", // Tên sản phẩm
        price: 3000000, // Giá mỗi sản phẩm
        brand: "Apple", // Thương hiệu
        count: 2, // Số lượng sản phẩm trong giỏ hàng
    },
    {
        name: "Samsung Galaxy Z Fold3",
        price: 41000000,
        brand: "Samsung",
        count: 1,
    },
    {
        name: "IPhone 11",
        price: 15500000,
        brand: "Apple",
        count: 1,
    },
    {
        name: "OPPO Find X3 Pro",
        price: 19500000,
        brand: "OPPO",
        count: 3,
    },
]

const input = document.querySelector("input");
const ul = document.querySelector("ul");

input.addEventListener("keydown", function (event) {
    if(event.key== "Enter"){
        //lấy giá trị trong ô input
        let value = input.value;
        //console.log(value)

        //Hiển thị kết quả 
        let data = products.filter(p=> p.name.toLowerCase().includes(value.toLowerCase()));
        if(data.length === 0) {
            ul.innerHTML = `<li>Không tìm thấy sản phẩm nào</li>`;
        } else {
            ul.innerHTML = data.map(product => `<li>${product.name}</li>`).join(" ");
        }

        //Clear giá trị
        input.value=""
    }
   
});