'use strict';

angular.module('wrapsy')
.config(function ($stateProvider) {
	$stateProvider
	.state('giftcard', {
		url: '/giftcard',
		templateUrl: 'app/giftcard/giftcard.html',
		controller: 'giftcardCtrl'
	})
	.state('myvouchers', {
		url: '/myvouchers',
		templateUrl: 'app/giftcard/voucherslist.html',
		controller: 'VoucherListCtrl'
	});
});
