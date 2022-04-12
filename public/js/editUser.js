   window.addEventListener('load', function (e) {
        //******* Error handlers */
const setError = (field, errorSpan, msg)=>{
    field.classList.add("form-fields-invalid");
    if(field.placeholder == undefined){
    errorSpan.innerText = `${msg}`;
    }else {
        errorSpan.innerText = `${field.placeholder} ${msg}`;
    }
    errorSpan.classList.add("text-danger");
    return true;
}

const setSuccess = (field, errorSpan) => {
field.classList.remove("form-fields-invalid");
    field.classList.add("form-fields")
    errorSpan.innerText = "";
    errorSpan.classList.remove("text-danger");
    return false
}

    //********Event handlers ---- Validation functions
    const isFormEmpty = (e, input) => {
        const field = e.target || input;
        const errorSpan = field.previousElementSibling;
        // console.log("errorSpan de isformEmpty", errorSpan)
        if (field.value.trim() === "") {
            if(setError(field, errorSpan, "field cannot be blank")){
                return true
            }
        } else {
            setSuccess(field, errorSpan)
        }
    }
    const requiredCharacters = (e, input) => {
        const field = e.target || input;
        const errorSpan = field.previousElementSibling;
   
        if ( field.value.length < 2) {
           if(setError(field, errorSpan, "must be at least 2 characters"))
            {
                return true
            }
        } else {
            setSuccess(field, errorSpan)
        }
    }
    const avatarValidation = (e, input)=>{
        const field = e.target || input;
        const errorSpan = field.previousElementSibling;
        let imageExtention = avatar.value.toLowerCase().split(".")
        let regex = /jpg|jpeg|png/
        if(!imageExtention[1].match(regex)){
                if(setError(field, errorSpan, "valid extentions are .jpg, .jpeg, .png")){
                    return true
                }
        }else {
            setSuccess(field, errorSpan)
        }
    }

    let firstName = document.getElementById('firstName')
    let lastName = document.getElementById('lastName')
    let avatar = document.getElementById('avatar')
console.log("la imagen cuando se carga la pagina", avatar)
//********EVENTS ----- Validations on inputs
firstName.addEventListener("blur", isFormEmpty);
firstName.addEventListener("keyup", requiredCharacters)

lastName.addEventListener("blur", isFormEmpty);
lastName.addEventListener("keyup", requiredCharacters);
if(avatar){
    avatar.addEventListener("change", avatarValidation);
}

    let userEditForm = document.getElementById('userEditForm');
console.log("este es el form", userEditForm)
    userEditForm.addEventListener("submit", (e)=>{
        let formElements = [...userEditForm.elements]
        formElements.pop()
         formElements.forEach(oneElement => {
             
            if (oneElement.value.trim() !== "" && (oneElement.name == "firstName" || oneElement.name == "lastName")) {
               if (requiredCharacters("", oneElement)){
                   e.preventDefault();
               }
            }
            if (oneElement.value.trim() !== "" && oneElement.name == "avatar") {
                if(avatarValidation("", oneElement)){
                    e.preventDefault()
                }
            }
            if(avatar){
                if (oneElement.value.trim() === "") {
                    if (isFormEmpty("", oneElement)){
                        console.log('este es el avatar', avatar)

                        e.preventDefault()
                    }
                } 
            }else {
                if (oneElement.value.trim() === "" && oneElement.name != "avatar") {
                    if (isFormEmpty("", oneElement)){
                        console.log('este es el avatar sin avatar', avatar)
                        e.preventDefault()
                    }
                } 
            }
         })
    })
})

