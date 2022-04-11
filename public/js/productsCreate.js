window.addEventListener('load', function (e) {
    var errores = false;

    let localErrors = document.getElementById('localErrors');
    if(localErrors){
        localErrors.innerTXT = ""
    };

    //********Event handlers ---- Validation functions
    const isFormEmpty = (e, input) => {
        const field = e.target || input;
        console.log("field in isFormEmpty", field.value)
        const errorSpan = field.previousElementSibling;
        console.log("errorSpan de isformEmpty", errorSpan)
        if (field.value.trim() === "") {
            console.log("THE FORM IS EMPTY!!!")
            field.classList.add("form-fields-invalid");
            errorSpan.innerText = `${field.placeholder} field is required`;
            errorSpan.classList.add("text-danger");
            return errores = true;
        } else if ((field.name == "description" && field.value.length >= 20) || ((field.name == "name" || field.name == "name") && field.value.length > 5) || (field.name == "price" && field.value.length >= 1) || field.id === "submitButton") {
            field.classList.remove("form-fields-invalid");
            field.classList.add("form-fields")
            errorSpan.innerText = "";
            errorSpan.classList.remove("text-danger");
            return errores = false
        }
    }
    const requiredCharacters = (e, input) => {
        const field = e.target || input;
        console.log("INPUTTTT or FIELD", field)
        const errorSpan = field.previousElementSibling;
   
        if ( field.value.length < 5) {
            field.classList.add("form-fields-invalid");
            errorSpan.innerText = `${field.placeholder} must be at least 5 characters`;
            errorSpan.classList.add("text-danger");
            console.log("field placeholder", field.placeholder)
            return errores = true
        } else {
            field.classList.remove("form-fields-invalid");
            field.classList.add("form-fields")
            errorSpan.innerText = "";
            errorSpan.classList.remove("text-danger");
            return errores = false
        }
    }
    const imageValidation = (e, input)=>{
        const field = e.target || input;
        const errorSpan = field.previousElementSibling;
        console.log("image value", image.value)
        let imageExtention = image.value.toLowerCase().split(".")
        console.log("!!!!!!",imageExtention[1])
        let regex = /jpg|jpeg|png/
        if(!imageExtention[1].match(regex)){
            field.classList.add("form-fields-invalid");
                errorSpan.innerText = `Valid image extentions are .jpg. jpeg or .png`;
                errorSpan.classList.add("text-danger");
                return errores = true;
        }else {
            field.classList.remove("form-fields-invalid");
            field.classList.add("form-fields")
            errorSpan.innerText = "";
            errorSpan.classList.remove("text-danger");
            return errores = false
        }
    }

    const descriptionValidation = (e, input) => {
        const field = e.target || input;
        const errorSpan = field.previousElementSibling;
        if (field.value.length < 20) {
            field.classList.add("form-fields-invalid");
            errorSpan.innerText = `${field.placeholder} must be at least 20 characters`;
            errorSpan.classList.add("text-danger");
             errores = true
             console.log("error de description", errores)
        } else {
            field.classList.remove("form-fields-invalid");
            field.classList.add("form-fields")
            errorSpan.innerText = "";
            errorSpan.classList.remove("text-danger");
            return errores = false
        }
    }
    console.log("error de description por fuera", errores)


    const colorValidation = (e, input)=>{
        const field = e.target || input;
        const errorSpan = document.getElementById('colorErrorSpan');
        console.log("errorSpan", errorSpan)
        console.log(" color field", field.option)
        if (field.value.length < 1){
            field.classList.add("form-fields-invalid");
            errorSpan.innerText = `You must choose at least 1 color`;
            errorSpan.classList.add("text-danger");
            return errores = true
        }else {
            field.classList.remove("form-fields-invalid");
            field.classList.add("form-fields")
            errorSpan.innerText = "";
            errorSpan.classList.remove("text-danger");
            return errores = false
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

    image.addEventListener("blur", isFormEmpty);
    image.addEventListener("change", imageValidation);

    color.addEventListener("change focus", colorValidation)

    price.addEventListener("blur", isFormEmpty);

    function submitAll () {
        isFormEmpty();

    }


    //*********Validations for submit button
    let productsForm = document.getElementById('productsForm')
    let buttonSubmit = document.getElementById('submitButton')
    
    let formElements = [...productsForm.elements]
        formElements.pop()
        console.log("FORM ELEMENTS", formElements)
console.log("errores al final", errores)


    const buttonFunction = function (e) {
        let formElements = [...productsForm.elements]
        formElements.pop()
        let errores = false;
         formElements.forEach(oneElement => {
                    console.log("este es el forEach", oneElement)
            if (oneElement.value.trim() !== "" && (oneElement.name == "name")) {
                console.log("RRRRRequired character de abajo")

                requiredCharacters(e, oneElement)
            }
            if (oneElement.value.trim() !== "" && oneElement.name == "image") {
                console.log("image validation de abajo")
                imageValidation(e, oneElement)
            }
            if (oneElement.value.trim() !== "" && oneElement.name == "description") {
                console.log("description de abajo")
                descriptionValidation(e, oneElement)
            }
            if (oneElement.value.trim() !== "" && oneElement.name == "color") {
                console.log("color validation de abajo")
                colorValidation(e, oneElement)
            }
            if (oneElement.value.trim() === "") {
                console.log("el form empty de abajo")
                isFormEmpty(e, oneElement)

            } 
        })
                if (!errores) {
                    console.log("Errores fue false")
                  
                } else if (errores == true) {
                    e.preventDefault()
                }

    }
    productsForm.addEventListener('submit', buttonFunction, true);
    // buttonSubmit.addEventListener("click", buttonFunction);
})