var dataurltofile = require('./dataUrlToFile');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

	var dataurl = req.body['dataurl'];	
	var emploeeId = req.body['emploee_id'];
		
	dataurltofile.saveDataURL(context, req, emploeeId + ".png", dataurl);
		
    context.res = {
        // status: 200, /* Defaults to 200 */
        status: 200,
        body: 'OK'
    };	    

}