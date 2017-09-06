
angular.module('ElasticSearchApp').service('client', ['esFactory', function (esFactory) {

    return esFactory({
      host: 'localhost:9200',
      apiVersion: '2.3',
      log: 'trace'
    });

}]);
