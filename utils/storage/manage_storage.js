// FIREBASE
import storage from '@react-native-firebase/storage'

const import_file_to_storage_and_get_url = async (path, source) => {

    const ref = storage().ref(path)
    await ref.putFile(source).catch((error) => { throw error })
    const url = await ref.getDownloadURL().catch((error) => { throw error });
    return url

}

const delete_main_image_from_storage = async (listId, userId) => {    // DELETE MAIN IMAGE FROM STORAGE IF IT EXISTS

    const ref = storage().ref(`/users/${userId}/lists/${listId}/main_picture.jpg`)

    try {
        await ref.getDownloadURL().then(() => {
            storage().ref(`/users/${userId}/lists/${listId}/main_picture.jpg`).delete()
        })
    } catch (err) {

    }
}

const delete_cover_image_from_storage = async (listId, userId) => {    // DELETE COVER IMAGE FROM STORAGE IF IT EXISTS

    console.log(userId)
    console.log(listId)

    const ref = storage().ref(`/users/${userId}/lists/${listId}/cover_picture.jpg`)

    try {
        await ref.getDownloadURL().then(() => {
            console.log("in it")
            storage().ref(`/users/${userId}/lists/${listId}/cover_picture.jpg`).delete()
        })
    } catch (err) {
        console.log(err)
    }
}

export {
    delete_main_image_from_storage,
    delete_cover_image_from_storage,
    import_file_to_storage_and_get_url
}