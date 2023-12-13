class Message{
    constructor(info){
        this.photo = info.photo
        this.nickname = info.nickname
        this.msg = info.chat_content
        this.datetime = info.date
    }
}
module.exports = Message