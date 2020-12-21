/*
    PASSWORD VALIDATION
    ===================
    Used to check if both match && if is min 1 digit && if is min 1 upper
*/
const is_pass_valid = (password1) => {

    var isNumber = false;
    var isUpper = false;

    if (password1.length < 6)
        return false

    for (var i = 0; i < password1.length; i++)
    {
        if (password1.charCodeAt(i) > 64 && password1.charCodeAt(i) < 91)
            isUpper = true;
        else if (password1.charCodeAt(i) > 47 && password1.charCodeAt(i) < 58)
            isNumber = true;
    }
    if (isNumber && isUpper)
        return true
    else
        return false
}

const does_they_match = (password1, password2) => {
    if (password1 === "")
        return false
    if (password1 === password2)
        return true;
    else
        return false;
}

export {is_pass_valid, does_they_match};