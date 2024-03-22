// Tạo object
let user = {
    name: "Nguyễn Văn A",
    age: 23,
    email: "abc@gmail.com",
    languges: ["PHP","JS","Python"],
    address: {
        city: "Hà Nội",
        distict: "Tố Hữu",
        street: "Lê Gia Định"
    },
    
    eat: function(food){ //viết rõ
        console.log(`Tôi ăn ${food}`)
    },
    sleep(hour){ //viết tắt
        console.log(`Tôi ngủ ${hour} giờ`)
    }
}

//Lấy dữ liệu
console.log(user.address.street);
console.log(user.languges[1]);
user.sleep(8);

