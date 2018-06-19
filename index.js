'use strict';

var fs = require('fs');
var path = require('path');
const aws = require('aws-sdk');
const docClient = new aws.DynamoDB.DocumentClient();

exports.get = function(event, context, callback) {
  var contents = fs.readFileSync(`public${path.sep}index.html`);
  var result = {
    statusCode: 200,
    body: contents.toString(),
    headers: {'content-type': 'text/html'}
  };

  callback(null, result);
};

exports.findByYear = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify([{
      title: 'test',
      year: 2018
    }]),
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
    // findAllByYear(parseInt(event.pathParameters.year))
    //     .then(data => {
    //         callback(null, {
    //             statusCode: 200,
    //             body: JSON.stringify(data.Items),
    //             headers: {
    //               'Access-Control-Allow-Origin': '*'
    //             }
    //         });
    //     })
    //     .catch(err => {
    //         callback(err);
    //     });
    // TODO implement
    
};

function findAllByYear(year) {
  console.log(`Querying for movies from ${year}.`);

  const params = {
    TableName: 'movies',
    KeyConditionExpression: '#yr = :yyyy',
    ExpressionAttributeNames: {
      '#yr': 'year'
    },
    ExpressionAttributeValues: {
      ':yyyy': year
    }
  };
  return docClient.query(params).promise(); // Most of the time we will want to do it this way
}