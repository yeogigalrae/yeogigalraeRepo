class User{
    constructor(info){
        this.id = info.USER_ID
        this.name = info.NAME
        this.email = info.EMAIL
        this.birth = info.BIRTH
        this.gender = info.GENDER
        this.address = info.ADDRESS
        this.nickname = info.NICKNAME
        this.photo = info.PHOTO
        this.notice = info.NOTICE
    }

}
module.exports = User