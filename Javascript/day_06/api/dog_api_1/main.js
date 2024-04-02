/* 
API là gi? Application Programming Interface
API là một tập hợp các quy tắc và cơ chế mà theo đó, một ứng dụng hay một thành phần sẽ tương tác với một ứng dụng hay thành phần khác.

HTTP Method là gì? GET, POST, PUT, DELETE (CRUD) → Các hành động các động lên tài nguyên (Resource)

API Endpoint là gì? Đường dẫn URL mà chúng ta sẽ gửi request đến để lấy dữ liệu 
GET /api/users: Lấy ds tất cả user
PUT /api/users/:id: Cập nhật user
POST /api/users: Tạo mới user
DELETE /api/users/:id: Xóa user

VD: GET /api/users/l/posts: Lấy ds tất cả bài viết của user có id = 1

HTTP Status Code là gì? Mã trạng thái HTTP (5 đầu mã chính chủ yếu sử dụng đầu 2,4,5)

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