
const stars = document.querySelectorAll(".star");
const ratingValue = document.getElementById("rating-value");

let currentRating = null;
let ratingHidden=document.getElementById('rating-input');
ratingHidden.value = currentRating;
console.log(ratingHidden)
stars.forEach((star) => {
    star.addEventListener("mouseover", () => {
        resetStars();
        const rating = parseInt(star.getAttribute("data-rating"));
        highlightStars(rating);
    });

    star.addEventListener("mouseout", () => {
        resetStars();
        highlightStars(currentRating);
    });

    star.addEventListener("click", () => {
        currentRating = parseInt(star.getAttribute("data-rating"));
        ratingValue.textContent = `Bạn đã đánh giá ${currentRating} sao.`;
        highlightStars(currentRating);
        ratingHidden.value = currentRating; // Cập nhật giá trị của trường input ẩn
        console.log(ratingHidden)
        $('#form-review').valid();
    });
});

function resetStars() {
    stars.forEach((star) => {
        star.classList.remove("active");
    });
}

function highlightStars(rating) {
    stars.forEach((star) => {
        const starRating = parseInt(star.getAttribute("data-rating"));
        if (starRating <= rating) {
            star.classList.add("active");
        }
    });
}

// render review
const formatDate = dateStr => {
    const date = new Date(dateStr);
    const day = `0${date.getDate()}`.slice(-2); // 01 -> 01, 015 -> 15
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
const reviewListEl = document.querySelector(".review-list");
const renderReview = reviews => {
    let html = "";
    reviews.forEach(review => {
        if (user.id!==null &&user.id === review.user.id){
            html += `
            <div class="comment-info bg-light-subtle rounded-5 p-3 mt-3">
                           <div class="d-flex align-items-center">
                               <img src="${review.user.avatar}" alt="Avatar" class="rounded-circle" style="width: 50px; height: 50px;">
                               <h5 class="ms-2" >${review.user.name}</h5>
                               <p class="pt-2 ms-2 text-body-tertiary" <small>${formatDate(review.createdAt)}</small></p>
                           </div>
                           <div class="comment-content ps-1 pt-2" >
                               <p>${review.content}</p>
                           </div>
                           <div>
                               <button  onclick="openEditModal(${review.id})" style="border: none">Sửa</button>
                               <button  onclick="deleteRv(${review.id})" style="border: none">Xóa</button>
                           </div>
                       </div>
        `
        }else {
            html += `
            <div class="comment-info bg-light-subtle rounded-5 p-3 mt-3">
                           <div class="d-flex align-items-center">
                               <img src="${review.user.avatar}" alt="Avatar" class="rounded-circle" style="width: 50px; height: 50px;">
                               <h5 class="ms-2" >${review.user.name}</h5>
                               <p class="pt-2 ms-2 text-body-tertiary" <small>${formatDate(review.createdAt)}</small></p>
                           </div>
                           <div class="comment-content ps-1 pt-2" >
                               <p>${review.content}</p>
                           </div>
                       </div>
        `
        }
    })

    reviewListEl.innerHTML = html;
}


// Tạo review
const formReviewEl = document.getElementById("form-review");
const reviewContentEl = document.getElementById("review-content");
const modalReviewEl = document.getElementById("review-modal");
let idReviewEdit = null;
const myModalReviewEl = new bootstrap.Modal(modalReviewEl, {
    keyboard: false
})
// reset
modalReviewEl.addEventListener('hidden.bs.modal', event => {
    console.log("Su kien dong modal")
    modalReviewTitleEl.innerText="Tạo bình luận"
    btnCreateReviewEl.innerText="Tạo";
    currentRating = 0;
    reviewContentEl.value = "";
    ratingValue.textContent = "";
    idReviewEdit=null;
    resetStars();
    ratingHidden.value=currentRating;
})


formReviewEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Đã nghe ấn nút")
    // TODO: Validate các thông tin (sử dụng thư jQuery Validation)
    if (currentRating === null) {
        toastr.error("Không được để sao trống");
        return;
    }
    ratingHidden.value = currentRating; // Cập nhật giá trị của trường input ẩn
    console.log(ratingHidden)
    $('#form-review').valid();

    if (!$('#form-review').valid()){
        return;
    }

    const data = {
        content: reviewContentEl.value,
        rating: currentRating,
        movieId: currentMovie.id
    }

    // Gọi API
    if (idReviewEdit!=null){
        await updateRv(data);
    }else {
       await postRv(data);
    }
})
const postRv =async (data) => {
    try {
        let res = await axios.post("/api/reviews", data);
        reviews.unshift(res.data);
        renderReview(reviews);

        // Dong modal
        myModalReviewEl.hide();
        toastr.success("Đánh giá thành công")


    } catch (e) {
        console.log(e)
    }
}

//Nút sửa, xóa
const deleteRv =async (id)=>{
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa ko")
    if(confirm){
        try {
            const deleteRv = await axios.delete(`/api/reviews/${id}`)
            console.log("Sự kiện xóa rv")
            reviews=reviews.filter(rv=>rv.id !==id);
            renderReview(reviews)

            // Dong modal
            myModalReviewEl.hide();
            toastr.success("Xóa thành công đánh giá")
        } catch (error) {
            console.log(error)
        }
    }
}
const modalReviewTitleEl = document.querySelector(".modal-title")
const btnCreateReviewEl = document.getElementById("btn-create-review")

const openEditModal= (id)=>{
    myModalReviewEl.show();
    currentRating = reviews.find(review => review.id === id).rating;
    reviewContentEl.value = reviews.find(review => review.id === id).content;
    highlightStars(currentRating)
    ratingValue.textContent = `Bạn đã đánh giá ${currentRating} sao.`;
    modalReviewTitleEl.innerText="Sửa bình luận"
    btnCreateReviewEl.innerText="Sửa";
    idReviewEdit=id;

}
const updateRv=async (data) =>{
        try {
            let updateData = await axios.put(`/api/reviews/${idReviewEdit}`, data);

            const editedReviewIndex = reviews.findIndex(review => review.id === idReviewEdit);
            console.log(idReviewEdit)
            console.log(editedReviewIndex)
            if (editedReviewIndex !== -1) {
                reviews[editedReviewIndex] = updateData.data;
                console.log(reviews[editedReviewIndex])
                console.log(updateData.data)
                renderReview(reviews);
            }

            // Dong modal
            myModalReviewEl.hide();
            toastr.success("Cập nhật thành công")
        } catch (e) {
            console.log(e)
        }
}
$('#form-review').validate({
    rules: {
        rating: {
            required: true,
            min:1,
        },
        content: {
            required: true,
        },
    },
    messages: {
        rating:{
            required: "Bạn phải chọn một số sao để đánh giá.",
            min: "K được để rating trống",
        },
        content: {
            required: "Không được để trống nội dung",
        },
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
        error.addClass('invalid-feedback');
        if (element.attr('type') === 'hidden') { // Kiểm tra nếu là trường input ẩn
            error.insertAfter(element); // Chèn thông báo lỗi sau trường input ẩn
            console.log("đã vào đây")
        } else {
            element.closest('.form-group').append(error); // Nếu không, chèn thông báo lỗi như bình thường
        }
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('is-invalid');
    }
});





