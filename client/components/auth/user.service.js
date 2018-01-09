'use strict';

(function() {

  function UserResource($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    }, {
      forgotPassword: {
        method: 'POST',
        params: {
          controller: 'forgot'
        }
      },
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },
      addTocart : {
        method: 'POST',
        params: {
          controller: 'addTocart'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      },
      'userCount': {
        method: 'post',
        isArray: true,
        params: {
          controller: 'userCount',
        }
      }
    });
  }

  angular.module('wrapsy.auth')
  .factory('User', UserResource);

})();
