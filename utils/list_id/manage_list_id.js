// FIREBASE
import database from '@react-native-firebase/database'

// RESERVE LISTID IN DATABASE (/lists/)
const reserve_list_id = (listId, userId) => {
    database()
        .ref(`lists/${listId}`)
        .set(userId)    
}

const create_list_id = async (userID) => {

    const char = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    var new_list_id = "@"

    for (var i = 0; i < 4; i++) {
        var index = Math.floor(Math.random() * 35)
        new_list_id += char[index]
    }

    return new Promise(resolve => {
        database()
            .ref(`lists/${new_list_id}`)
            .once('value')
            .then((res) => {
                if (res.val() === null) {   // if listID available
                    reserve_list_id(new_list_id, userID)
                    resolve(new_list_id)
                } else if (res.val()) {     // if listID not available
                    console.log('list id taken')
                }
            })        
    })

}



export {
    create_list_id,
}