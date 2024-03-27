// document.addEventListener('click', function() {
//     console.log('click');
//    })
   
//    document.addEventListener('mousedown', function() {
//     console.log('mousedown');
//    })
   
//    document.addEventListener('mousemove', function() {
//     console.log('mousemove');
//    })
   
//    document.addEventListener('mouseup', function() {
//     console.log('mouseup');
//    })
   
// document.addEventListener('click', function(event) {
//  console.log(event);
// })


//Thực hành
document.addEventListener("click",(event)=>{
   //Xóa hình tròn (nếu có)
   const currentCircleEl= document.querySelector(".circle")
   if(currentCircleEl){
       document.body.removeChild(currentCircleEl);
   }

   //Tạo hình tròn
   const circle = document.createElement("div")
   circle.classList.add("circle")

   //Gắn vị trí
   circle.style.top=`${event.offsetY-50}px`
   circle.style.left=`${event.offsetX-50}px`

   document.body.prepend(circle)
})