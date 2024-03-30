
// const fs = require('fs');

const userData = require('../data/data.json');
const response = require('../utils/commonUtils');


const getuserFormDyanmicFields  =async(req,res)=>{

   try {
    if (userData && userData.length >0) {
        return response(res, true, 200, "user dynamic fields fetched Successfully", userData)
    }

    return response(res, false, 400, "user dynamic fields not found")
    
   } catch (error) {
    return response(res, false, 500, "something went wrong")
   }
}

module.exports = getuserFormDyanmicFields

