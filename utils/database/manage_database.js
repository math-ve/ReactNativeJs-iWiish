// FIREBASE
import database from '@react-native-firebase/database'
// UTILS
import { import_file_to_storage_and_get_url, delete_main_image_from_storage, delete_cover_image_from_storage } from '../storage/manage_storage'

// SAVE NEW LIST IN DATABASE
const save_new_list = async (userId, listId, title, isPublic, password, photoPATH, coverPATH) => {

    database()
        .ref(`/users/${userId}/lists/${listId}/`)
            .update({
                title: title,
                isPublic: isPublic,
                password: password,
                listID: listId,
                photoURL: photoPATH.includes("firebasestorage.googleapis.com") ? photoPATH : await import_file_to_storage_and_get_url(`/users/${userId}/lists/${listId}/main_picture.jpg`, photoPATH),
                coverURL: coverPATH.includes("firebasestorage.googleapis.com") ? coverPATH : await import_file_to_storage_and_get_url(`/users/${userId}/lists/${listId}/cover_picture.jpg`, coverPATH)
            })
}

// SAVE LIST AFTER EDIT IN DATABASE
const save_list_after_edit = async (userId, listId, title, isPublic, password, photoPATH, coverPATH, PresetImgUrls, PresetCoverUrls) => {

    console.log(PresetImgUrls)
    console.log(PresetCoverUrls)

    if (PresetImgUrls.includes(photoPATH))
        delete_main_image_from_storage(listId, userId)
    if (PresetCoverUrls.includes(coverPATH))
        delete_cover_image_from_storage(listId, userId)

    database()
    .ref(`/users/${userId}/lists/${listId}/`)
        .update({
            title: title,
            isPublic: isPublic,
            password: password,
            listID: listId,
            photoURL: photoPATH.includes("firebasestorage.googleapis.com") ? photoPATH : await import_file_to_storage_and_get_url(`/users/${userId}/lists/${listId}/main_picture.jpg`, photoPATH),
            coverURL: coverPATH.includes("firebasestorage.googleapis.com") ? coverPATH : await import_file_to_storage_and_get_url(`/users/${userId}/lists/${listId}/cover_picture.jpg`, coverPATH)
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
    save_list_after_edit,
    delete_list,
}