// Khai báo array rỗng
let arr = [];

// Khai báo array
let number = [];

// Gán giá trị cho các phần tử của array thông qua chỉ số
number[0] = 1;
number[1] = "Bùi Hiên";
number[2] = true;
number[10]=false;
console.log(number);

// Khai báo và khởi tạo giá trị cho array
const myArr = [1, 2, 3, 4, true, false, "Nguyễn Văn A"];
console.log(myArr);

//myArr=[127,122,"tiến"] sẽ lỗi vì là const
myArr[0]="bùi"; // nhg thay đổi dự vào index thì đc
console.log(myArr);

//Array Methods
//pop(): xóa phần tử cuối cùng array
//push(): thêm phần tử vào cuối array
//shift(): xóa phần tử đầu tiên array
//unshift(): thêm phần tử vào đầu array
//splice(): xóa hoặc thêm phàn tử vào array
//concat(): nối 2 mảng với nhau
//slice(): tách mảng con từ mảng ban đàu mà ko ảnh hưởng đến mảng ban đầu
// Với slice có 2 tham số thì là start,end; có 1 tham số là start, 0 tham số thì copy lại array
myArr.splice(4,1,100,200,300);//xóa phần tử thứ 4, xóa 1 phàn tử và thêm 100,200,300 vào vị trí thứ 4
// nếu chỉ thêm ko xóa thì số 1 là 0
console.log(myArr);

//sort(): sắp xếp theo String
//Để sắp xếp số:
const myNumber=[2,11,3,4,22,4,5,6,9];
console.log(myNumber.sort((a,b)=>a-b));

//split(): chuyển từ chuỗi qua mảng
let message = "xin chào các bạn";
let word = message.split(" ");
console.log(word);
//join(): chuyển từ mảng sang chuỗi
console.log(word.join(" "));

// Thủ công:
const newNum=[];
myNumber.forEach(e => {
    newNum.push(e*2);
});
console.log(newNum);
// Làm tắt:
const newNum2 = myNumber.map(e=>e*2);
console.log(newNum2);

const mangLe = myNumber.filter(e=>e%2!=0);
console.log(mangLe);

console.log(myNumber.find(e=>e%2!=0)) // trả về số lẻ đầu tiên tìm thấy
