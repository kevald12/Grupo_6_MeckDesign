window.addEventListener('load', function(e){

    const isFormEmpty = (e) => {
        const field = e.target;
        const errorSpan = field.previousElementSibling; 
        // console.log("ESTE ES EL FIELD", field)
        if (field.value.trim() === "") {
            field.classList.add("form-fields-invalid");
            errorSpan.innerText = `${field.placeholder} field is required`;
            errorSpan.classList.add("text-danger");
            
        } else {
            field.classList.remove("form-fields-invalid");
            errorSpan.innerText = "";
            errorSpan.classList.remove("text-danger");
            
        }
    }
    const requiredCharacters = (e) => {
        const field = e.target;
        const errorSpan = field.previousElementSibling; 
        // console.log("ESTE ES EL FIELD", field)
        if (field.value.length < 2) {
            field.classList.add("form-fields-invalid");
            errorSpan.innerText = `${field.placeholder} must be at least 2 characters`;
            errorSpan.classList.add("text-danger");
            
    }else {
            field.classList.remove("form-fields-invalid");
            errorSpan.innerText = "";
            errorSpan.classList.remove("text-danger");
            
        }
    }

    
    let firstName = document.getElementById('firstName')
    firstName.addEventListener("blur", isFormEmpty);
    firstName.addEventListener("keyup", requiredCharacters);

    
    let lastName = document.getElementById('lastName')
    lastName.addEventListener("blur", isFormEmpty);
    lastName.addEventListener("keyup", requiredCharacters);
    
    let avatar = document.getElementById('avatar')
    console.log("AVATAR", avatar)
    avatar.addEventListener("blur", isFormEmpty);
    // avatar.addEventListener("change", (e)=>{
    //     if(avatar.file!=".jpg", ".jpeg", ".png"){

    //     }
    // });


    let email = document.getElementById('email')
    email.addEventListener("blur", isFormEmpty);
    email.addEventListener("keyup",  (e) =>{
        const field = e.target;
        const errorSpan = field.previousElementSibling; 
        const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        if (!field.value.match(regex)) {
            field.classList.add("form-fields-invalid");
            errorSpan.innerText = `Please enter a valid ${field.placeholder}`;
            errorSpan.classList.add("text-danger");
            field.value == "field con error"
        } else { 
            field.classList.remove("form-fields-invalid");
            errorSpan.innerText = "";
            errorSpan.classList.remove("text-danger");
            
    }});

    
    let password = document.getElementById('password')
    password.addEventListener("blur", isFormEmpty);
    password.addEventListener("keyup", (e)=>{
        const field = e.target;
        const errorSpan = field.previousElementSibling; 
        if (field.value.length < 8){ 
            field.classList.add("form-fields-invalid");
            errorSpan.innerText = `${field.placeholder} must be at least 8 characters`;
            errorSpan.classList.add("text-danger");

    }else {
            field.classList.remove("form-fields-invalid");
            errorSpan.innerText = "";
            errorSpan.classList.remove("text-danger");
            
    }
    });
     let formRegister = document.getElementById('registerForm')
    
    formRegister.addEventListener('submit', function(e){
        let errores = false;
    let formElements = [...formRegister.elements]
    formElements.pop()
    
    formElements.forEach(oneElement => {
        const errorSpan = oneElement.previousElementSibling; 
        if (oneElement.value.trim() === ""){
            oneElement.classList.add("form-fields-invalid")
        errorSpan.innerText = `${field.placeholder} error`;
        errorSpan.classList.add("text-danger");
        errores = true;
        }
        else {
            oneElement.classList.remove("form-fields-invalid");
            errorSpan.innerText = "";
            errorSpan.classList.remove("text-danger");
            
        }
    })
    if (errores){
        e.preventDefault();
    }
    
})
})