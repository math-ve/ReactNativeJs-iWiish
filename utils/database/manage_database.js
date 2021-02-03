// FIREBASE
import database from '@react-native-firebase/database'
// UTILS
import { import_file_to_storage_and_get_url,
            delete_main_image_from_storage,
            delete_cover_image_from_storage,
            delete_item_photo
        } from '../storage/manage_storage'

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

// SAVE NEW ITE IN DATABASE
const save_new_item = async (userId, listId, itemId, title, photoPATH, price, url, description) => {

    var photoURL = photoPATH.includes("file:///") ? await import_file_to_storage_and_get_url(`users/${userId}/lists/${listId}/items/${itemId}.jpg`, photoPATH) : photoPATH

    database()
        .ref(`/items/${itemId}/`)
        .set({
            userId : userId,
            listId: listId,
            title : title,
            photoURL : photoURL,
            price: price,
            linkUrl : url,
            description : description
        })
    
    database()
        .ref(`/users/${userId}/lists/${listId}/items/${itemId}/`)
        .set({
            userId : userId,
            listId: listId,
            title : title,
            photoURL : photoURL,
            price : price,
            linkUrl : url,
            description : description            
        })
}

// DELETE ITEMS (/items/itemsId) & PHOTO IN STORAGE  ==>  FROM DELETE LIST
const delete_items = (userId, listId, itemsId) => {
    itemsId.map(itemId => {
        database()
            .ref(`/items/${itemId}/`)
            .remove()
        delete_item_photo(userId, listId, itemId)
    })
}

const save_item_after_edit = async (userId, listId, itemId, title, photoPATH, price, url, description) => {

    var photoURL = photoPATH.includes("file:///") ? await import_file_to_storage_and_get_url(`users/${userId}/lists/${listId}/items/${itemId}.jpg`, photoPATH) : photoPATH

    database()
        .ref(`/items/${itemId}/`)
        .update({
            userId : userId,
            listId: listId,
            title : title,
            photoURL : photoURL,
            price: price,
            linkUrl : url,
            description : description
        })
    
    database()
        .ref(`/users/${userId}/lists/${listId}/items/${itemId}/`)
        .update({
            userId : userId,
            listId: listId,
            title : title,
            photoURL : photoURL,
            price : price,
            linkUrl : url,
            description : description            
        })    
}

// DELETE LIST IN DATABASE (/lists) & (users/userID/lists)
const delete_list = (userId, listId) => {
    database()
        .ref(`/users/${userId}/lists/${listId}/items`)
        .once('value')
        .then((snapshot) => {
            delete_items(userId, listId, Object.keys(snapshot.val()))
        })

    database()
        .ref(`/users/${userId}/lists/${listId}`)
        .remove()
    
    database()
        .ref(`lists/${listId}`)
        .remove()

    delete_main_image_from_storage(listId, userId)
    delete_cover_image_from_storage(listId, userId)
}

// DELETE ITEM IDEA IN DATABASE (/items)
const delete_item = (userId, listId, itemId) => {
    database()
        .ref(`/items/${itemId}`)
        .remove()
    database()
        .ref(`/users/${userId}/lists/${listId}/items/${itemId}`)
        .remove()
    
    delete_item_photo(userId, listId, itemId);
}

const add_favorite = (userId, targetId) => {
    database()
        .ref(`users/${userId}/favorites/`)
        .push()
        .set(targetId)
}

const remove_favourite = (userId, token) => {
    database()
        .ref(`users/${userId}/favorites/${token}`)
        .remove()
}

export {
    save_new_list,
    save_list_after_edit,
    delete_list,
    save_new_item,
    save_item_after_edit,
    delete_item,
    add_favorite,
    remove_favourite
}