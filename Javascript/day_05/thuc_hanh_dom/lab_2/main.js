//1.Hiển thị danh sách công việc ban đầu, nếu không có công việc nào trong danh sách thì hiển thị Danh sách công việc trống
let toDoList =[
    {
        id: 1,
        title: "Làm bài",
        status: true,
    },
    {
        id: 2,
        title: "Chơi game",
        status: false,
    },
    {
        id: 3,
        title: "Đá bóng",
        status: false,
    },
    {
        id: 4,
        title: "Xem phim",
        status: true,
    }
]
const ul = document.querySelector("ul")
const renderToDoList = (toDoList)=>{
    ul.innerHTML="";
    if (toDoList.length===0) {
        ul.insertAdjacentHTML("afterbegin","<li>Danh sách công việc trống</li>")
        return;
    }
    let html="";
    toDoList.forEach(toDo => {
        html+=`
        <li>
            <input 
            type="checkbox" 
            ${toDo.status ? "checked" : ""}
            onchange="toggleStatus(${toDo.id})"
            />
            <span class=${toDo.status ? "active" : ""}>${toDo.title}</span>
            <button onclick ="editToDo(${toDo.id})">Edit</button>
            <button onclick ="deleteToDo(${toDo.id})">Delete</button>
        </li>
        `
    })
    ul.innerHTML=html;
}
renderToDoList(toDoList);

//2. Thêm công việc mới (nếu title rỗng -> alert “Tên công việc không được để trống”)
const generateId =()=>{
    if(toDoList.length===0){
        return 1;
    }
    return Math.max(...toDoList.map(toDo => toDo.id))+1;
}

const inputToDo = document.getElementById("input-todo");
console.log(inputToDo)
const btnAdd = document.getElementById("btn-add");

btnAdd.addEventListener("click",()=>{
    //lấy nd trong ô input
    const title = inputToDo.value.trim();

    //kiểm tra nd có rỗng ko
    if(title===""){
        alert("Vui lòng nhập công việc")
        return;
    }
    //Tạo ra to do mới
    const newToDo = {
    id: generateId(),
    title: title,
    status: false
    }
    //Thêm vao mảng
    toDoList.push(newToDo);
    //Render lại giao diện mới


    renderToDoList(toDoList);
    inputToDo.value=""
    inputToDo.focus()
})

//3. Xóa công việc (cần confirm trước khi xóa, sử dụng window.confirm)
const deleteToDo = (id)=>{
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa ko")
    if(confirm){
        toDoList=toDoList.filter(toDo => toDo.id!==id);
        renderToDoList(toDoList)
    }
}


//4. Chỉnh sửa tiêu đề công việc (sử dụng window.prompt cho đơn giản)
const editToDo = (id)=>{
    toDoList.forEach(toDo =>{
        if (toDo.id===id) {
        let title= window.prompt("Mời bạn nhập công việc khác",toDo.title)
        if( title== ""){
            alert("Vui lòng nhập công việc")
            return;
        }
        if(title==null){
            return
        }
        toDo.title=title;
        renderToDoList(toDoList)
        }
    })
}

//5. Thay đổi trạng thái công việc (status)
const toggleStatus = (id)=>{
    toDoList.forEach(toDo =>{
        if (toDo.id===id) {
           if(toDo.status==true){
            toDo.status=false
           }else{
            toDo.status=true
           }
           renderToDoList(toDoList)
           return;
        }
    })
}

   


