const username_validation = (username) => {
    
    var i = 0;

    if (username.length < 5)
        return false

    while (i < username.length) {
        
        if ((username[i] >= '0' && username[i] <='9') ||
            (username[i] >= 'a' && username[i] <= 'z') ||
            (username[i] >= 'A' && username[i] <= 'Z') ||
            (username[i] === '-') ||
            (username[i] === '_'))
            i++;
        else 
            return false  
    }
    return true
}

export default username_validation