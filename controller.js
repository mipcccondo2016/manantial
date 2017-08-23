	app.controller('inside_controller', function($scope,$http) {
		console.log("entra en inside controller");
		console.log($scope);	
		if ( sessionStorage.login  ===  "1" ){
			$scope.user_inside = sessionStorage.user;
		}
		else{
			alert("No esta logueado");
			window.location.assign("index.html");
		}
		
		$scope.log_out = function() {
			console.log("Logging out desde funcion de angularjs.....");
			sessionStorage.login = "0";
			window.location.assign("index.html");
			}
		var URL_GET_PERMISO = 'api.php/tblis?filter[]=str1,eq,' ;
		var URL_GET_PERMISO_BOTONES = 'api.php/tblis?filter[]=str2,eq,' ;
		var filter_by_permission = '&filter[]=tblhs_id,eq,'
		URL_GET_PERMISO = URL_GET_PERMISO.concat($scope.permiso);
		URL_GET_PERMISO = URL_GET_PERMISO.concat(filter_by_permission);
		URL_GET_PERMISO = URL_GET_PERMISO.concat(sessionStorage.user_id);
		
		URL_GET_PERMISO_BOTONES = URL_GET_PERMISO_BOTONES.concat($scope.permiso);
		URL_GET_PERMISO_BOTONES = URL_GET_PERMISO_BOTONES.concat(filter_by_permission);
		URL_GET_PERMISO_BOTONES = URL_GET_PERMISO_BOTONES.concat(sessionStorage.user_id);
		
		console.log(URL_GET_PERMISO);
		 $http.get(URL_GET_PERMISO).then(function(response) {
				var data = $scope.php_crud_api_transform(response.data);
			   $scope.tblis = data.tblis[0];
				console.log($scope.tblis);
				if ( $scope.tblis === undefined){
					//alert('Sin permiso para acceder este modulo');
					$scope.mensaje_login =  'Sin permiso para acceder este modulo' ;
					window.location.assign("tbl3b.html");
					
				}else{
				//Obtenemos que botones debemos ocultar en este menu 
console.log('Url query para botones bloqueados ......');
console.log(URL_GET_PERMISO_BOTONES);				
				 $http.get(URL_GET_PERMISO_BOTONES).then(function(response) {
						var data = $scope.php_crud_api_transform(response.data);
						$scope.tblis_list = data.tblis
				console.log($scope.tblis_list);
				$scope.tblis_list.forEach(function(value, index, array) {
						var tmp_id = value.str2.concat(value.str3);
						tmp_id = '.' + tmp_id ;
					console.log("ID del boton a ocultar ");
					console.log(tmp_id);
					 $(tmp_id).hide();
				});
				});
				var u = 'api.php/tblis?filter[]=str3,eq,bt&filter[]=tblhs_id,eq,';
				u = u.concat(sessionStorage.user_id);
				console.log("query to show buttons");
				console.log(u);
					 $http.get(u).then(function(response) {
						var data = $scope.php_crud_api_transform(response.data);
						$scope.tblis_list = data.tblis
				console.log($scope.tblis_list);
				$scope.tblis_list.forEach(function(value, index, array) {
						var tmp_id = value.str3 ;
						tmp_id = '.' + tmp_id ;
					console.log("ID del boton a ocultar ");
					console.log(tmp_id);
					 $(tmp_id).show();
				});
				
				});
					
					
					
				}
			});		
	
	});
	
	
	
	