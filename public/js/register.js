window.addEventListener('load', function (e) {
    var errores = false;

    //********Event handlers ---- Validation functions
    const isFormEmpty = (e) => {
        const field = e.target;
        const errorSpan = field.previousElementSibling;
        console.log("ESTE ES EL FIELD de form empty", field)
        if (field.value.trim() === "") {
            field.classList.add("form-fields-invalid");
        console.log("ESTE ES EL FIELD de form empty en el if", field)
            
            errorSpan.innerText = `${field.placeholder} field is required`;
            errorSpan.classList.add("text-danger");
            return errores = true;
        } else if (field.value.length > 2) {
            field.classList.remove("form-fields-invalid");
            errorSpan.innerText = "";
            console.log("field dentro del else de isformempty", field)
            errorSpan.classList.remove("text-danger");
            return errores = false
        }
    }
    const requiredCharacters = (e) => {
        const field = e.target;
        // console.log("input en requiredCharacters", input)
        console.log("e target value or input", field)
        const errorSpan = field.previousElementSibling;
        console.log("ESTE ES EL FIELD de required characters", field)
        console.log("field length 27", field.value.length)
        
        if ( field.value.length < 2) {
            console.log("field length 30", field.value.length)
            console.log("error span", errorSpan.innerText.length)
            // if (errorSpan.innerText.length > 0){
            //     errorSpan.innerText = "";
            //     errorSpan.classList.remove("text-danger")
            // }
            field.classList.add("form-fields-invalid");
            errorSpan.innerText = `${field.placeholder} must be at least 2 characters`;
            errorSpan.classList.add("text-danger");
            console.log("field placeholder", field.placeholder)
            return errores = true
        } else {
            console.log("field length 41", field.value.length)

            field.classList.remove("form-fields-invalid");
            errorSpan.innerText = "";
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
    let firstName = document.getElementById('firstName')
    let lastName = document.getElementById('lastName')
    let avatar = document.getElementById('avatar')
    let email = document.getElementById('email')
    let password = document.getElementById('password')

    //********Validations on inputs
    firstName.addEventListener("blur", isFormEmpty);
    firstName.addEventListener("keyup", requiredCharacters)
    // firstName.addEventListener("blur", requiredCharacters)

    lastName.addEventListener("blur", isFormEmpty);
    lastName.addEventListener("keyup", requiredCharacters);

    // console.log("AVATAR", avatar)
    avatar.addEventListener("blur", isFormEmpty);
    // avatar.addEventListener("change", (e)=>{
    //     if(avatar.file!=".jpg", ".jpeg", ".png"){

    //     }
    // });

    email.addEventListener("blur", isFormEmpty);
    email.addEventListener("keyup", emailValidation);

    password.addEventListener("blur", isFormEmpty);
    password.addEventListener("keyup", passwordValidation);

    //*********Validations for submit button
    let formRegister = document.getElementById('registerForm')
    // console.log("FORM REGISTER", formRegister)
    formRegister.addEventListener('submit', function (e) {
        // let errores = false;
        let formElements = [...formRegister.elements]
        formElements.pop()
        formElements.pop()
         formElements.forEach(oneElement => {
            const errorSpan = oneElement.previousElementSibling;
            console.log("SPAN", errorSpan)
            if (oneElement.value.trim() === "") {
                oneElement.classList.add("form-fields-invalid")
                errorSpan.innerText = `${oneElement.placeholder} error`;
                errorSpan.classList.add("text-danger");
                errores = true;
            }
            // else {
            //     oneElement.classList.remove("form-fields-invalid");
            //     errorSpan.innerText = "";
            //     errorSpan.classList.remove("text-danger");

            // }
            if (oneElement.value.trim() !== "" && (oneElement.name == "firstName" || oneElement.name == "lastName")) {
                requiredCharacters(oneElement)
            }
            if (oneElement.value.trim() !== "" && oneElement.name == "email") {
                emailValidation(oneElement)
            }
            if (oneElement.value.trim() !== "" && oneElement.name == "password") {
                passwordValidation(oneElement)
            }
        })
                if (errores) {
                    console.log("errores", errores)
                    e.preventDefault();

                }

    })
})