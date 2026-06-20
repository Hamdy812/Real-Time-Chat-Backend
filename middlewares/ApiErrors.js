
class ApiErrors extends Error {
    constructor(msg,stscode){
        super(msg);
        this.statuscode=stscode;
        this.statuscode=`${stscode}`.startsWith(4)?"Fail":"Error"
        this.isOperational=true;

    }
}
module.exports=ApiErrors