import database from '@react-native-firebase/database';

const newUserDataWithMailDB = (data) => {

    database()
    .ref(`/users/${data.user.uid}`)
    .set({
        userID : data.user.uid,
        infos : {
            email: data.user.email,
            name : "",
            surname : "",
            photoURL : "https://firebasestorage.googleapis.com/v0/b/iwiish-ed11d.appspot.com/o/default%2Fempty_profile_img.png?alt=media&token=bb564c31-84ce-4013-abb4-97aab1337910",
            username : ""
        },
        status : {
            isNew : true,
            ShowWelcomeBanner : true
        },
        settings : {
            language : "Français"
        }
    })

}

const newUserDataWithGoogle = (data) => {
    if (data.additionalUserInfo.isNewUser === true) {
        database()
        .ref(`/users/${data.user._user.uid}`)
        .set({
            userID : data.user._user.uid,
            infos : {
                email : data.additionalUserInfo.profile.email,
                name : data.additionalUserInfo.profile.given_name,
                surname : data.additionalUserInfo.profile.family_name,
                photoURL : data.additionalUserInfo.profile.picture,
                username : ""
            },
            status : {
                isNew : true,
                ShowWelcomeBanner : true
            },
            settings : {
                language : "Français"
            }
        }).then(() => {
            database()
            .ref(`profile_pictures/${data.user._user.uid}`)
            .set(data.additionalUserInfo.profile.picture)
        })
    }
}

const newUserDataWithFacebook = (data) => {
    if (data.additionalUserInfo.isNewUser === true) {
        database()
        .ref(`/users/${data.user._user.uid}`)
        .set({
            userID : data.user._user.uid,
            infos : {
                email : data.additionalUserInfo.profile.email,
                name : data.additionalUserInfo.profile.first_name,
                surname : data.additionalUserInfo.profile.last_name,
                photoURL : data.additionalUserInfo.profile.picture.data.url,
                username : ""
            },
            status : {
                isNew : true,
                ShowWelcomeBanner : true
            },
            settings : {
                language : "Français"
            }
        }).then(() => {
            database()
            .ref(`profile_pictures/${data.user._user.uid}`)
            .set(data.additionalUserInfo.profile.picture.data.url)
        })
    }
}

export {
    newUserDataWithMailDB,
    newUserDataWithGoogle,
    newUserDataWithFacebook
} 