class Message {
  constructor(info) {
    this.photo = info.PHOTO;
    this.nickname = info.NICKNAME;
    this.msg = info.CHAT_CONTENT;
    this.datetime = info.DATE;
  }
}
module.exports = Message;
