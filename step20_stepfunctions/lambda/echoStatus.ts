type event = {
    operationSuccessful: Boolean
}

module.exports.handler = function (event:event){
    console.log(event)
    if(event.operationSuccessful){
        console.log("data was added successfully")
    }
    else{
        console.log("error")
    }
}