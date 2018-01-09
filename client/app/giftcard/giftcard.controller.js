'use strict';

angular.module('wrapsy')
.controller('giftcardCtrl', ['$scope', '$state', 'Vendor', '$stateParams','Auth','Voucher','Payment',
	function($scope, $state, Vendor, $stateParams,Auth,Voucher,Payment) {
		this.getCurrentUser = Auth.getCurrentUser;
		function makeid() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for (var i = 0; i < 5; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length));

			return text;
		}


		function uuidv4() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		}

		$scope.message = 'Everyone come and see how good I look!';
		$scope.mkey = 'gtKFFx';
		$scope.productInfo = 'AddVoucher';
		$scope.txnid = makeid();
		$scope.id = uuidv4();
		$scope.type = '2';
		$scope.email = 'sathvisiva@gmail.com';
		$scope.phone = 9176464641;
		$scope.lastName = this.getCurrentUser().name;
		$scope.firstName = '';
		$scope.surl = "http://localhost:9000/api/payment/giftSuccessPaymentStatus";
		$scope.furl = "http://localhost:9000/api/payment/giftFilurePaymentStatus";
		$scope.hash = '';

		$scope.presubmit = function () {
			var data = { preHashString: $scope.mkey + '|' + $scope.txnid + '|' + $scope.amount + '|' + $scope.productInfo + '|' + $scope.firstName + '|' + $scope.email + '|' + $scope.id + '||||||||||' };
			Payment.createHash(data, function(resp) {
				document.getElementById('hash').value = resp.hash;
				document.getElementById('paymentForm').submit();
			}, function(err) {
				console.log(err)
			})
		}

		$scope.save = function(amount){
			console.log(amount)
			$scope.voucher = {};
			$scope.user = Auth.getCurrentUser() || {};
			$scope.voucher.validuntil = new Date();
			$scope.voucher.validuntil.setYear($scope.voucher.validuntil.getFullYear() + 1);
			$scope.voucher.email = $scope.user.email;
			$scope.voucher.amount = parseInt(amount);
			console.log($scope.voucher);
			Voucher.save($scope.voucher, function(resp) {
				$scope.amount = resp.amount;
				$scope.productInfo = resp._id;
				$scope.presubmit()
			}, function(err) {
				console.log(err)
			})
	/*		console.log("inside voucher")
			$scope.voucherFormSubmitted = false;
			if (!form.$valid) {
				$scope.voucherFormSubmitted = true
			}else{
				if($scope.isLoggedIn()){
					console.log($scope.voucher);
					$scope.user = Auth.getCurrentUser() || {};
					$scope.voucher.validuntil = new Date();
					$scope.voucher.validuntil.setYear($scope.voucher.validuntil.getFullYear() + 1);
					$scope.voucher.email = $scope.user.email;
					console.log($scope.voucher);
					Voucher.save($scope.voucher, function(resp) {
						$scope.amount = resp.amount;
						$scope.productInfo = resp._id;
						$scope.presubmit()
					}, function(err) {
						console.log(err)
					})
				}else{
					$scope.data = {'event' : 'login'};
					$scope.login(ev, $scope.data);
				}
			}*/
		}

	}
	])