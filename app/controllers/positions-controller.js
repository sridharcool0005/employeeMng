function positionsController($scope,$http,$location,$route,$routeParams,toastr){

	$scope.getPositions = function(){
		$http.get('/api/positions/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.positions = response.data;
		});
	}

	$scope.addPosition = function(){
        $http.post('/api/positions/', $scope.position, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $location.path('/positions');
        });
	}

	$scope.deletePosition = function(id){
		var id = id;
		$http.delete('/api/positions/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$route.reload();
			toastr.success('You have successfully removed selected position!', 'Success');
		});
	}

	$scope.showSelectedPosition = function(){
		var id = $routeParams.id;
		$http.get('/api/positions/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.position = response.data;
		});
	}

	$scope.updatePosition = function(){
		var id = $routeParams.id;
		$http.put('/api/positions/'+ id , $scope.position, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$location.path('/positions');
			toastr.success('You have successfully updated selected position!', 'Success');
		});
	}
}