// FIREBASE
import database from '@react-native-firebase/database'

// RESERVE LISTID IN DATABASE (/lists/)
const reserve_item_id = (itemId, userId) => {
    database()
        .ref(`items/${itemId}`)
        .set(userId)    
}

const create_item_id = async (userID) => {

    const char = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    var new_item_id = ""

    for (var i = 0; i < 8; i++) {
        var index = Math.floor(Math.random() * 35)
        new_item_id += char[index]
    }

    return new Promise(resolve => {
        database()
            .ref(`items/${new_item_id}`)
            .once('value')
            .then((res) => {
                if (res.val() === null) {   // if itemId available
                    reserve_item_id(new_item_id, userID)
                    resolve(new_item_id)
                } else if (res.val()) {     // if itemId not available
                    console.log('item id taken')
                }
            })        
    })

}



export {
    create_item_id,
}