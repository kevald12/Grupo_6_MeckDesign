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
        } else if ((field.name == "description" && field.value.length >= 20) || ((field.name == "name" || field.name == "name") && field.value.length > 5) || (field.name == "price" && field.value.length >= 1) || field.id === "submitButton") {
            setSuccess(field, errorSpan)
        }
    }
    const requiredCharacters = (e, input) => {
        const field = e.target || input;
        const errorSpan = field.previousElementSibling;
   
        if ( field.value.length < 5) {
           if(setError(field, errorSpan, "must be at least 5 characters"))
            {
                return true
            }
        } else {
            setSuccess(field, errorSpan)
        }
    }
    const imageValidation = (e, input)=>{
        const field = e.target || input;
        const errorSpan = field.previousElementSibling;
        let imageExtention = image.value.toLowerCase().split(".")
        console.log("!!!!!!",imageExtention[1])
        let regex = /jpg|jpeg|png/
        if(!imageExtention[1].match(regex)){
                if(setError(field, errorSpan, "valid extentions are .jpg, .jpeg, .png")){
                    return true
                }
        }else {
            setSuccess(field, errorSpan)
        }
    }

    const descriptionValidation = (e, input) => {
        const field = e.target || input;
        const errorSpan = field.previousElementSibling;
        if (field.value.length < 20) {
             if(setError(field, errorSpan, "must be at least 20 characters")){
                return true
            }
        } else {
            setSuccess(field, errorSpan)
        }
    }

    const colorValidation = (e, input)=>{
        const field = e.target || input;
        const errorSpan = document.getElementById('colorErrorSpan');
        console.log("errorSpan", errorSpan)
        console.log(" color field", field.placeholder)
        if (field.value.length < 1){
            if(setError(field, errorSpan, "You must select at least 1 color")){
                return true
            }
        }else {
            setSuccess(field, errorSpan)
        }
    }

    //*******Input call
    let name = document.getElementById('name');
    let description = document.getElementById('description');
    let image = document.getElementById('image');
    let color = document.getElementById('color');
    let price = document.getElementById('price');
console.log("color element", color)


    //********EVENTS ----- Validations on inputs
    name.addEventListener("blur", isFormEmpty);
    name.addEventListener("keyup", requiredCharacters)

    description.addEventListener("blur", isFormEmpty);
    description.addEventListener("keyup", descriptionValidation);
    // condicional para form edit - de esta manera pueden no subir una imagen nueva
    console.log("image en event", image)
    if(image){
        image.addEventListener("blur", isFormEmpty);
        image.addEventListener("change", imageValidation);
    }

    color.addEventListener("blur", colorValidation, true)

    price.addEventListener("blur", isFormEmpty);

    //*********Validations for submit button
    let productsForm = document.getElementById('productsForm')
    let buttonSubmit = document.getElementById('submitButton')
    
    let formElements = [...productsForm.elements]
        formElements.pop()
    const buttonFunction = function (e) {
        let formElements = [...productsForm.elements]
        formElements.pop()
        // let errores = false;
        // e.preventDefault()
         formElements.forEach(oneElement => {
            if (oneElement.value.trim() !== "" && (oneElement.name == "name")) {
                if (requiredCharacters("", oneElement)){
                    e.preventDefault()
                }
                console.log("requiredCharacters del forEach", requiredCharacters("", oneElement))
            }
            if(image){
                if (oneElement.value.trim() !== "" && oneElement.name == "image") {
                    console.log("image", image)
                    if (imageValidation("", oneElement)){
                        e.preventDefault()
                    }
                }
            }
            if (oneElement.value.trim() !== "" && oneElement.name == "description") {
                if (descriptionValidation("", oneElement)){
                    e.preventDefault()
                } 
            }
            if (oneElement.value.trim() !== "" && oneElement.name == "color") {
                if (colorValidation("", oneElement)){
                    e.preventDefault()
                } 
            }
            if(image){
                if (oneElement.value.trim() === "" && oneElement.name != "color") {
                    if (isFormEmpty("", oneElement)){
                        e.preventDefault()
                    }
                } 
            }else {
                if (oneElement.value.trim() === "" && oneElement.name != "color" && oneElement.name != "image") {
                    if (isFormEmpty("", oneElement)){
                        e.preventDefault()
                    }
                } 
            }
        })
    }
    productsForm.addEventListener('submit', buttonFunction, true);
    // buttonSubmit.addEventListener("click", buttonFunction);
})