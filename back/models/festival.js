class Festival {
  constructor(info) {
    this.id = info.FESTIVAL_ID;
    this.category = info.CATEGORY;
    this.name = info.NAME;
    this.place = info.PLACE;
    this.description = info.DESCRIPTION;
    this.info = info.INFO;
    this.show_times = info.SHOW_TIMES;
    this.fee = info.FEE;
    this.call = info.PHONENUMBER;
    this.image = info.IMAGE;
    this.address = info.ADDRESS;
    this.like = info.LIKE;
    this.begin_date = BEGIN_DATE;
    this.end_date = END_DATE;
    this.latitude = info.LATITUDE;
    this.longitude = info.LONGITUDE;
    this.likestate = info.LIKESTATE;
    this.sentiment = info.SENTIMENT;
  }
}
module.exports = Festival;
