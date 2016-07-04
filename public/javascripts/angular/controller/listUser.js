app.controller('patientListCtrl', function ($scope, $http, $log) {
    var successCallBack = function (response) {
        $scope.patients = response.data;
    }
    var errorCallBack = function (respone) {
        $scope.patients = respone.data;
    }
    $http({
        method: 'GET',
        url: hostName + '/listUsers',
    }).then(successCallBack, errorCallBack);
})
