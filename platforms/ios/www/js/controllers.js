angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http) {
        var vm = this;
        vm.country;
        vm.search = function () {

            console.log(vm.country.cityname);
            if($scope.cityname =! '') {
                state.go ('menu.information', {country: $scope.cityname});
            }
        }

}])
   
.controller('aboutCtrl', ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http) {


}])
      
.controller('informationCtrl', ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http) {
     $scope.results ;
     $scope.isSearching = false;
     $scope.checkCon = false;
    var geocoder;
    var map;
    $scope.initMap = function(country) {
        console.log('working');
        createMap(country);
    }
    function createMap(country)
    {
        console.log
        if(country) {
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(53.3496, -6.3263);
            var mapOptions =
            {
                zoom: 6,
                center: latlng
            }
            map = new google.maps.Map(document.getElementById('map'), mapOptions);

            $scope.isSearching = true;
            $http.get("http://api.openweathermap.org/data/2.5/weather?q="+country+"&APPID=a574e71530f7067061869ace1afb937d&&mode=html").success(function (data) {
                $scope.myhtml = data;
                $scope.isSearching = false;
                console.log(data, "data retured from api")

            }).error(function (error) {
                console.error(error);
                $scope.isSearching = false;
            });
            codeAddress(country);//call the function
        }

    }

    function codeAddress(address) {
        geocoder.geocode({address: address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);//center the map over the result
                //place a marker at the location
                var marker = new google.maps.Marker(
                    {
                        map: map,
                        position: results[0].geometry.location,
                        zoom: 6
                    });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });

    }
    $scope.initMap($stateParams.country);



}])
 