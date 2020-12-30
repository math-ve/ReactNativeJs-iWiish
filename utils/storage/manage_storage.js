// FIREBASE
import storage from '@react-native-firebase/storage'

const delete_main_image_from_storage = async (listId, userId) => {    // DELETE MAIN IMAGE FROM STORAGE IF IT EXISTS

    const ref = storage().ref(`/${userId}/lists/${listId}/cover_picture.jpg`)

    try {
        await ref.getDownloadURL().then(() => {
            storage().ref(`/${userId}/lists/${listId}/cover_picture.jpg`).delete()
        })
    } catch (err) {

    }
}

const delete_cover_image_from_storage = async (listId, userId) => {    // DELETE COVER IMAGE FROM STORAGE IF IT EXISTS

    const ref = storage().ref(`/${userId}/lists/${listId}/cover_horizontal_picture.jpg`)

    try {
        await ref.getDownloadURL().then(() => {
            storage().ref(`/${userId}/lists/${listId}/cover_horizontal_picture.jpg`).delete()
        })
    } catch (err) {
        
    }
}

export {
    delete_main_image_from_storage,
    delete_cover_image_from_storage
}