//Bài 1. Viết function truyền vào mảng các chuỗi có độ dài bất kỳ. Kết quả trả về là 1 mảng các chuỗi có độ dài lớn nhất
const getStringHasMaxLength=(array)=>{
    let max = 0;
    let longestStrings =[]
    array.forEach(str => {
        if(str.length > max){
            max = str.length
        }
    });
    longestStrings=array.filter(str=>str.length===max)
    return longestStrings;
}


//Bài 2. Cho mảng users như sau:
users = [
    {
        name: "Bùi Công Sơn",
        age: 30,
        isStatus: true
    },
    {
        name: "Nguyễn Thu Hằng",
        age: 27,
        isStatus: false
    },
    {
        name: "Phạm Văn Dũng",
        age: 20,
        isStatus: false
    }
]
//Viết function truyền vào 1 mảng các object user. Trả về mảng các user có age > 25 và isStatus = true
const findUser =(users)=>{
    return users.filter(user =>user.age>25 && user.isStatus===true )
}

//Viết function truyền vào 1 mảng các object user. Trả về mảng các user có age tăng dần
const sortUser = (users)=>{
    return users.sort((a,b)=>a.age-b.age);
}


//Bài 3. Viết function truyền vào 1 mảng các chuỗi. Trả về Object hiển thị xem mỗi phần tử trong mảng xuất hiện bao nhiêu lần
const getCountElement = (array)=>{
    const object={}
    array.forEach(a =>{
        if(object.hasOwnProperty(`${a}`)){
            object[`${a}`]+=1;
        }else{
            object[`${a}`]=1;
        }
    })
   return object
}
