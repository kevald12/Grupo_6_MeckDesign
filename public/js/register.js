window.addEventListener('load', function(e){


    const isFormEmpty = (e) => {
        const field = e.target;
        const errorSpan = field.previousElementSibling; // capturo al <span></span> hermano
        if (field.value.trim() === "") {
            //field.classList.add("is-invalid");
            errorSpan.innerText = `El campo ${field.name} es obligatorio`;
            errorSpan.classList.add("text-danger");
        } else {
            //field.classList.remove("is-invalid");
            //field.classList.add("is-valid");
            errorSpan.innerText = "";
            errorSpan.classList.remove("text-danger");
        }
    }

    
    let firstName = document.getElementById('firstName')
    firstName.addEventListener("blur", isFormEmpty);
    
    let lastName = document.getElementById('lastName')
    lastName.addEventListener("blur", isFormEmpty);
    
    let email = document.getElementById('email')
    email.addEventListener("blur", isFormEmpty);
    
    
    let password = document.getElementById('password')
    password.addEventListener("blur", isFormEmpty);

})
let formRegister = document.getElementById('registerForm')

formRegister.addEventListener('submit', function(e){
e.preventDefault()
})





// // email.addEventListener('blur', function() {
// //     if(email.value.length <= 0) {
// //         alert ('Please enter an email')
// //         // crossbones[1].style.display = “block”;
// //         // feedback[1].innerHTML = “Debes ingresar un correo electrónico”;
// //     } else if (/\b[a-z0-9-_.]+@[a-z0-9-_.]+(\.[a-z0-9]+)+/i.test(email.value) !== true) {
// //         console.log("email con error")
// //         alert ('Please enter a valid email format')
// //         // crossbones[1].style.display = “block”;
// //         // feedback[1].innerHTML = “Debes ingresar un email válido”;
// //     // } else {
// //     //     crossbones[1].style.display = “none”;
// //     //     feedback[1].innerHTML = “”;
// // }
// });



// let password = document.getElementById('password')
// password.addEventListener('blur', function(){

//     if(password.value == ""){
//         alert ('el campo password debe completarse')
//     } else if (password.value.length < 8 ){
//         alert ('el password debe de tener mas de 8 caracteres')
//     }
// })
    
// let terms = document.getElementById('terms')

// })

