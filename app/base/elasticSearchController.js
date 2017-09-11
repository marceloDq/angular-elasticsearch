(function(){  

    angular.module('ElasticSearchApp').controller('ElasticSearchController', ['$scope', 'client', 'esFactory', function ($scope, client, esFactory) {

        $scope.results = [];
        $scope.autoCompleteResults = [];
        $scope.search = {
            queryTerm: ''
        };

        $scope.autoComplete = function () {
            client.search({
                index: 'bank',
                size: 10,
                body: {
                    'query': {
                        'multi_match': {
                            'query': $scope.search.queryTerm,
                            'type': 'phrase',
                            'fields': [
                                'firstname^4',
                                'firstname.ngram^4',
                                'lastname',
                                'lastname.ngram',
                                'city',
                                'city.ngram'
                            ],
                            'operator': 'and'
                        }
                    }
                }
            }).then(function (response) {
                $scope.autoCompleteResults = response.hits.hits;
            });
        };

        $scope.search = function () {
            client.search({
                index: 'bank',
                size: 10,
                body: {
                    'query': {
                        'multi_match': {
                            'query': $scope.search.queryTerm,
                            'type': 'cross_fields',
                            'fuzziness': 'AUTO',
                            'prefix_length': 2,
                            'fields': [
                                'firstname',
                                'lastname',
                                'address',
                                'employer',
                                'email',
                                'city'
                            ],
                            'operator': 'and'
                        }
                    }
                }
            }).then(function (response) {
                $scope.results = response.hits.hits;
            });
        };

        $scope.state = function () {
            client.cluster.state({
                metric: [
                    'cluster_name',
                    'nodes',
                    'master_node',
                    'version'
                ]
            }).then(function (resp) {
                $scope.clusterState = resp;
                $scope.error = null;
            }).catch(function (err) {
                $scope.clusterState = null;
                $scope.error = err;

                if (err instanceof esFactory.errors.NoConnections) {
                    $scope.error = new Error('Unable to connect to elasticsearch. ' +
                    'Make sure that it is running and listening at http://localhost:9200');
                }
            });
        };

        $scope.state();

    }]);

}).call(this);  