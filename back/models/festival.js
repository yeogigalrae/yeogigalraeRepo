class Festival{
    constructor(info){
        this.id = info.FESTIVAL_ID
        this.name = info.NAME
        this.category = info.CATEGORY
        this.place = info.PLACE
        this.call = info.CALL
        this.fee = info.FEE
        this.image = info.IMAGE
        this.description = info.DESCRIPTION
        this.like = info.LIKE
        this.begin_date= info.BEGIN_DATE
        this.end_date = info.END_DATE
    }

}
module.exports = Festival