// FIREBASE
import database from '@react-native-firebase/database'

// SAVE NEW LIST IN DATABASE
const save_new_list = (userId, listId, title, isPublic, password, photoURL, coverURL) => {
    database()
        .ref(`/users/${userId}/lists/${listId}/`)
        .update({
            title: title,
            isPublic: isPublic,
            password: password,
            listID: listId,
            photoURL: photoURL,
            coverURL: coverURL
        })
}

// DELETE LIST IN DATABASE (/lists) & (users/userID/lists)
const delete_list = (userId, listId) => {
    database()
        .ref(`/users/${userId}/lists/${listId}`)
        .remove()
    
    database()
        .ref(`lists/${listId}`)
        .remove()
}

export {
    save_new_list,
    delete_list,
}