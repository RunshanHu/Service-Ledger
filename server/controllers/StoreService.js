'use strict';

// output service configuration
var config = require('config');
var out_service_name = config.get('out-service.name');

var db_utils = require('../utils/dbUtils.js');
var hl_utils = require('../utils/hlUtils.js');

exports.deletePOST = function(args, res, next) {

  var response = {};
  var keyPair = args.body.value;

  if (out_service_name == 'mongo') {
    console.log("[StoreService.js] Calling Mongo - DELETE");

    db_utils.db_delete(keyPair, function (result) {
      if (Object.keys(result).length > 0) {
        res.writeHead(200,{'Content-Type':'application/json'});
        response['application/json'] = {
          "message" : result
         };
        res.end(JSON.stringify(response[Object.keys(response)[0]] || {}, null, 2));
      } else {
        res.writeHead(400,{'Content-Type':'application/json'});
        res.end(JSON.stringify({'message': 'error'}));
      }
    });
  }

  if (out_service_name == 'fabric') {

    console.log("[StoreService.js] Calling Hyperledger Fabric - DELETE");
    hl_utils.hl_delete(keyPair, function (result) {
      if (Object.keys(result).length > 0) {
        res.writeHead(200,{'Content-Type':'application/json'});
        response['application/json'] = {
          "message" : result
         };
        res.end(JSON.stringify(response[Object.keys(response)[0]] || {}, null, 2));
      } else {
        res.writeHead(400,{'Content-Type':'application/json'});
        res.end(JSON.stringify({'message': 'error'}));
      }
    });

  }

}

exports.getPOST = function(args, res, next) {
  var response = {};
  var keyPair = args.getId.value;

  if (out_service_name == 'mongo') {

    console.log("[StoreService.js] Calling Mongo - GET");

    db_utils.db_get(keyPair, function (result) {
      if (Object.keys(result).length > 0) {
        res.writeHead(200,{'Content-Type':'application/json'});
        response['application/json'] = {
          "message" : result
         };
    		res.end(JSON.stringify(response[Object.keys(response)[0]] || {}, null, 2));
      } else {
        res.writeHead(400,{'Content-Type':'application/json'});
    		res.end(JSON.stringify({'message': 'error'}));
      }
    });
  }

  if (out_service_name == 'fabric') {

    console.log("[StoreService.js] Calling Hyperledger Fabric - GET");
    hl_utils.hl_get(keyPair, function (result) {
      if (Object.keys(result).length > 0) {
        res.writeHead(200,{'Content-Type':'application/json'});
        response['application/json'] = {
          "message" : result
         };
    		res.end(JSON.stringify(response[Object.keys(response)[0]] || {}, null, 2));
      } else {
        res.writeHead(400,{'Content-Type':'application/json'});
    		res.end(JSON.stringify({'message': 'error'}));
      }
    });

  }

}

exports.putPOST = function(args, res, next) {

  var response = {};
  var keyPair = args.putSpec.value;

  if (out_service_name == 'mongo') {
    console.log("[StoreService.js] Calling Mongo - PUT");

    db_utils.db_put(keyPair, function (result) {
      if (Object.keys(result).length > 0) {
        //console.log(result);
        res.writeHead(200,{'Content-Type':'application/json'});
        response['application/json'] = {
          "message" : result
         };
    		res.end(JSON.stringify(response[Object.keys(response)[0]] || {}, null, 2));
      } else {
        res.writeHead(400,{'Content-Type':'application/json'});
    		res.end(JSON.stringify({'message': 'error'}));
      }
    });
  }

  if (out_service_name == 'fabric') {

    console.log("[StoreService.js] Calling Hyperledger Fabric - PUT");
    hl_utils.hl_put(keyPair, function (result) {
      if (Object.keys(result).length > 0) {
        res.writeHead(200,{'Content-Type':'application/json'});
        response['application/json'] = {
          "message" : result
         };
    		res.end(JSON.stringify(response[Object.keys(response)[0]] || {}, null, 2));
      } else {
        res.writeHead(400,{'Content-Type':'application/json'});
    		res.end(JSON.stringify({'message': 'error'}));
      }
    });

  }

}

exports.getKeysPOST = function(args, res, next) {


//   examples['application/json'] = {
//   "list" : [ {
//     "keyId" : "aeiou"
//   } ]
// };
  
  // TODO ??

  var response = {};
  var key = args.body.value;

  if (out_service_name == 'mongo') {
    console.log("Calling mongo - get");

    db_utils.db_getKeys(key, function (result) {
      if (Object.keys(result).length > 0) {
        console.log(result);
        res.writeHead(200,{'Content-Type':'application/json'});
        response['application/json'] = {
          "message" : result
        };
        res.end(JSON.stringify(response[Object.keys(response)[0]] || {}, null, 2));
      } else {
        res.writeHead(400,{'Content-Type':'application/json'});
        res.end(JSON.stringify({'message': 'error'}));
      }
    });
  }

  if (out_service_name == 'fabric') {

    console.log("Calling hyperledger");

    console.log("Calling api to 'get' in the keyValueStore chaincode...");
    
	/*hl_utils.hl_get(key, function (result) {
      if (Object.keys(result).length > 0) {
        console.log(result);
        res.writeHead(200,{'Content-Type':'application/json'});
        response['application/json'] = {
          "message" : result
        };
        res.end(JSON.stringify(response[Object.keys(response)[0]] || {}, null, 2));
      } else {
        res.writeHead(400,{'Content-Type':'application/json'});
        res.end(JSON.stringify({'message': 'error'}));
      }
    });
	*/
	
	var payload = {fcn:"getAll", args:"\"\",\"\"", peer:"0"};
	
	hl_utils.hl_invoke(payload, function (result) {
      if (Object.keys(result).length > 0) {
        res.writeHead(200,{'Content-Type':'application/json'});
        response['application/json'] = {
          "message" : result
         };
        res.end(JSON.stringify(response[Object.keys(response)[0]] || {}, null, 2));
      } else {
          res.writeHead(400,{'Content-Type':'application/json'});
    		  res.end(JSON.stringify({'message': 'error'}));
      }
    });

  }




}
