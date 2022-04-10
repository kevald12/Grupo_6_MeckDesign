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
        } else if ((field.name == "password" && field.value.length >= 8) || ((field.name == "firstName" || field.name == "lastName") && field.value.length > 2)) {
            console.log("field name en else de isformempty", field.name)
            field.classList.remove("form-fields-invalid");
            errorSpan.innerText = "";
            console.log("field dentro del else de isformempty", field)
            errorSpan.classList.remove("text-danger");
            return errores = false
        }
    }
    const requiredCharacters = (e, input) => {
        const field = e.target || input;
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
    const avatarValidation = (e, input)=>{
        const field = e.target || input;
        const errorSpan = field.previousElementSibling;
        console.log("AVATAR value", avatar.value)
        let avatarExtention = avatar.value.toLowerCase().split(".")
        console.log("!!!!!!",avatarExtention[1])
        let regex = /jpg|jpeg|png/
        if(!avatarExtention[1].match(regex)){
            field.classList.add("form-fields-invalid");
                errorSpan.innerText = `Valid avatar extentions are .jpg. jpeg or .png`;
                errorSpan.classList.add("text-danger");
                return errores = true;
        }else {
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

    //********EVENTS ----- Validations on inputs
    firstName.addEventListener("blur", isFormEmpty);
    firstName.addEventListener("keyup", requiredCharacters)

    lastName.addEventListener("blur", isFormEmpty);
    lastName.addEventListener("keyup", requiredCharacters);

    avatar.addEventListener("blur", isFormEmpty);
    avatar.addEventListener("change", avatarValidation);

    email.addEventListener("blur", isFormEmpty);
    email.addEventListener("keyup", emailValidation);

    password.addEventListener("blur", isFormEmpty);
    password.addEventListener("keyup", passwordValidation);

    //*********Validations for submit button
    let formRegister = document.getElementById('registerForm')
    // console.log("FORM REGISTER", formRegister)
 
    
    const formFunction = function (e) {
        // let errores = false;
        let formElements = [...formRegister.elements]
        console.log("form elements 125",formElements)
        formElements.pop()
        formElements.pop()
         formElements.forEach(oneElement => {
            const errorSpan = oneElement.previousElementSibling;
            console.log("SPAN", errorSpan)
            console.log("errores en form submit 127", errores)

            if (oneElement.value.trim() === "") {
                oneElement.classList.add("form-fields-invalid")
                errorSpan.innerText = `${oneElement.placeholder} error`;
                errorSpan.classList.add("text-danger");
                errores = true;
                console.log("errores en form submit 134", errores)
            }
            // else {
            //     oneElement.classList.remove("form-fields-invalid");
            //     errorSpan.innerText = "";
            //     errorSpan.classList.remove("text-danger");

            // }
            if (oneElement.value.trim() !== "" && (oneElement.name == "firstName" || oneElement.name == "lastName")) {
                requiredCharacters(oneElement)
            }
            if (oneElement.value.trim() !== "" && oneElement.name == "avatar") {
                avatarValidation(oneElement)
            }
            if (oneElement.value.trim() !== "" && oneElement.name == "email") {
                emailValidation(oneElement)
            }
            if (oneElement.value.trim() !== "" && oneElement.name == "password") {
                passwordValidation(oneElement)
            }
        })
                if (errores) {
                    console.log("ERROR DE PREVENT DEFAULT errores", errores)
                    e.preventDefault();
                    // console.log("prevent default", e.preventDefault())
                }

    }
    formRegister.addEventListener('submit', formFunction);
})