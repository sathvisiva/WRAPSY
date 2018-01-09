'use strict';

angular.module('wrapsy')
.controller('ManageHomeCtrl', ['$scope', '$state',  '$stateParams',
	function($scope, $state,  $stateParams) {
		Home.GethompageImg(function(resp) {
			console.log('images', resp);
			$scope.homeImages = resp;
		}, function(err) {
			console.log(err);
			$scope.message == err;
		});

		Catalog.query(function(categories) {
			$scope.categories = categories;

		});


		Home.GetpopularCat(function(resp) {
			console.log('images', resp);
			$scope.popularcat = resp;
		}, function(err) {
			console.log(err);
			$scope.message == err;
		});



		$scope.deleteImage = function(id) {
			Home.DelhompageImg({id : id }, function(resp){
				console.log(resp)
			})
		}

		$scope.deletepopCat = function(id) {
			Home.DelpopularCat({id : id }, function(resp){
				console.log(resp)
			})
		}


	}
	])
.controller('ManageHomePageImgAddCtrl', ['$scope', '$state', 'Home', '$stateParams','Upload',
	function($scope, $state, Home, $stateParams, Upload) {

	/*	$scope.cropper = {};
		$scope.cropper.sourceImage = null;
		$scope.cropper.croppedImage   = null;
		$scope.bounds = {};
		$scope.bounds.left = 0;
		$scope.bounds.right = 0;
		$scope.bounds.top = 0;
		$scope.bounds.bottom = 0;*/

		$scope.upload = function(file, errfile) {

			if (file) {
				Upload.upload({
					url: '/api/uploads',
					data: { file: file }
				}).then(function(resp) {
					if ($scope.homeimage) {

						$scope.homeimage.imageUrl = resp.data.url;

					} else {
						$scope.homeimage = { imageUrl: resp.data.imageUrl }
					}
					console.log(resp.data);
				}, function(resp) {
					$scope.errorMsg = resp.status + ': ' + resp.data;
				}, function(evt) {
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
			};
		}

/*		function dataURItoBlob(dataURI) {

            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
            	byteString = atob(dataURI.split(',')[1]);
            else
            	byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
            	ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {type:mimeString});
        }
*/


        $scope.save = function(form) {
        	/*console.log($scope.cropper.croppedImage)
        	var blob = dataURItoBlob($scope.cropper.croppedImage);
        	var file = new File([blob], 'fileName.jpeg', {type: "'image/jpeg"});
        	$scope.homeimage.imageUrl = $scope.upload(file)
        	console.log($scope.imageUrl)*/
        	if (form.$valid) {
        		console.log($scope.homeimage)
        		Home.createhompageImg($scope.homeimage, function(resp) {
        			console.log('created', resp);
        			$state.go('adminconsole.manage-categories');
        		}, function(err) {
        			console.log(err);
        			$scope.message == err;
        		});
        	}
        }
    }
    ])
