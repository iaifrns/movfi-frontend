function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const checkDataRegister = (formData: {name:string, email:string, password: string, confirm: string}) => {
    if(formData.name.length < 1 || formData.email.length < 1 || formData.password.length < 1 || formData.confirm.length < 1) {
        alert("Please enter all informations")
        return false
    }

    if(!isValidEmail(formData.email)){
        alert("Please enter a valid email")
        return false
    }

    if(formData.password.length < 5){
        alert("The password is less than 5 characters, please correct that")
        return false
    }

    if(formData.confirm !== formData.password){
        alert("The password should be the same as the confirm password")
        return false
    }

    return true
}

export const checkDataLogin = (formData: {email:string, password: string}) => {
    if(formData.email.length < 1 || formData.password.length < 1) {
        alert("Please enter all informations")
        return false
    }

    if(!isValidEmail(formData.email)){
        alert("Please enter a valid email")
        return false
    }

    if(formData.password.length < 5){
        alert("The password is less than 5 characters, please correct that")
        return false
    }

    return true
}
