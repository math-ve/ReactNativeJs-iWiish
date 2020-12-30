// FIREBASE
import database from '@react-native-firebase/database'

const save_new_list = (userId, listId, title, isPublic, password) => {
    database()
        .ref(`/users/${userId}/lists/${listId}/`)
        .update({
            title: title,
            isPublic: isPublic,
            password: password,
            listID: listId
        })
}

export {
    save_new_list
}