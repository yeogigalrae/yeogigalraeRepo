class User{
    constructor(info){
        if(info.PHOTO != null){
            const decodedStringPhoto = info.PHOTO.toString('utf8');
            this.photo = decodedStringPhoto
        } else {
            this.photo = info.PHOTO
        }
        this.user_id = info.USER_ID
        this.id = info.ID
        this.password = info.PASSWORD
        this.name = info.NAME
        this.email = info.EMAIL
        this.birth = info.BIRTH
        this.gender = info.GENDER
        this.address = info.ADDRESS
        this.nickname = info.NICKNAME
        this.notice = info.NOTICE
    }

}
module.exports = User