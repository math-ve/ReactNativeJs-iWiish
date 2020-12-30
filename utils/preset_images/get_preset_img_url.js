// FIREBASE
import storage from '@react-native-firebase/storage'

const get_pictures_urls = async (reference, pageToken) => {

    var urls = []

    reference.list({ pageToken }).then(result => {
      result.items.forEach(ref => {
        storage()
        .ref(ref.path)
        .getDownloadURL()
        .then((url) => urls.push(url))
      })
    });
    return urls;
  }
const get_covers_urls = async (reference, pageToken) => {

    var urls = []

    reference.list({ pageToken }).then(result => {
      result.items.forEach(ref => {
        storage()
        .ref(ref.path)
        .getDownloadURL()
        .then((url) => urls.push(url))
      })
    });
    return urls;
  }


export {
  get_pictures_urls,
  get_covers_urls
}