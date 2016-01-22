/**
 * This file define various JSON documents in response after a certain request.
 * License(MIT). See the license file for more information.
 * (C) 2015-2016 luisan00.
 */ 

var response =  {
				hash : { type : String, default : '' },
				address: { type : String, default : '' },
				inserted : { type : Boolean , default : false },
				stored : { type : Boolean , default : true },
				amount : {
						paid : { type : Number , default : 0 },
						needed : { type : Number , default : 0 } 
						},
				txid : { type : String , default : ''},
				block : { type : String , default : '' },
				status: { type : Number , default : 0 },
				errors : { type : String , default : '' }
				}	
				
/**
Status values are :
 - 0 : New register, the register is automaticaly stored in the database.
 - 1 : Stored in database but waiting to be paid
 - 2 : It's paid , waiting to be inserted in the next block
 - 3 : Completed!
 **/
 				
exports.response = response;


