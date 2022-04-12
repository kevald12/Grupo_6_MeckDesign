window.addEventListener('load', function (e) {

    var errores = false;

    //********Event handlers ---- Validation functions
    const isFormEmpty = (e) => {
        const field = e.target;
        const errorSpan = field.previousElementSibling;
        if (field.value.trim() === "") {
            field.classList.add("form-fields-invalid");
            errorSpan.innerText = `${field.placeholder} field is required`;
            errorSpan.classList.add("text-danger");
            return errores = true;
        } else if ((field.name == "password" && field.value.length >= 8) || ((field.name == "firstName" || field.name == "lastName") && field.value.length > 2)) {
            console.log("field name en else de isformempty", field.name)
            field.classList.remove("form-fields-invalid");
            errorSpan.innerText = "";
            console.log("field dentro del else de isformempty", field)
            errorSpan.classList.remove("text-danger");
            return errores = false
        }
    }

    const emailValidation = (e, input) => {
        const field = e.target || input;
        const errorSpan = field.previousElementSibling;
        const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        if (!field.value.match(regex)) {
            field.classList.add("form-fields-invalid");
            errorSpan.innerText = `Please enter a valid ${field.placeholder}`;
            errorSpan.classList.add("text-danger");
            field.value == "field con error"
            return errores = true
        } else {
            field.classList.remove("form-fields-invalid");
            errorSpan.innerText = "";
            errorSpan.classList.remove("text-danger");
            return errores = false
        }
    }

    const passwordValidation = (e, input) => {
        const field = e.target || input;
        const errorSpan = field.previousElementSibling;
        if (field.value.length < 8) {
            field.classList.add("form-fields-invalid");
            errorSpan.innerText = `${field.placeholder} must be at least 8 characters`;
            errorSpan.classList.add("text-danger");
            return errores = true
        } else {
            field.classList.remove("form-fields-invalid");
            errorSpan.innerText = "";
            errorSpan.classList.remove("text-danger");
            return errores = false
        }
    
}
//*******Input call
let email = document.getElementById('email')
let password = document.getElementById('password')


//EVENTS ----- Validations on inputs
email.addEventListener("blur", isFormEmpty);
email.addEventListener("keyup", emailValidation);

password.addEventListener("blur", isFormEmpty);
password.addEventListener("keyup", passwordValidation);

//*********Validations for submit button
let formLogin = document.getElementById('loginForm');



const formFunction = function (e) {
    // let errores = false;
    let formElements = [...formLogin.elements]
    console.log("form elements 125",formElements)
    formElements.pop()
    formElements.pop()
     formElements.forEach(oneElement => {
        const errorSpan = oneElement.previousElementSibling;
        if (oneElement.value.trim() === "") {
            oneElement.classList.add("form-fields-invalid")
            errorSpan.innerText = `${oneElement.placeholder} error`;
            errorSpan.classList.add("text-danger");
            errores = true;
            console.log("errores en form submit 134", errores)
        }

        if (oneElement.value.trim() !== "" && oneElement.name == "email") {
            emailValidation("", oneElement)
        }
        if (oneElement.value.trim() !== "" && oneElement.name == "password") {
            passwordValidation("", oneElement)
        }
    })
            if (errores) {
                console.log("ERROR DE PREVENT DEFAULT errores", errores)
                e.preventDefault();
                // console.log("prevent default", e.preventDefault())
            }

}
formLogin.addEventListener('submit', formFunction);

});