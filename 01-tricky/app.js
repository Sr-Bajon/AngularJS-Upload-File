(function () {
  'use strict';

  angular.module('uploadFileApp', []);

  angular.module('uploadFileApp')
    .controller('uploadFileController', uploadFileController);

  uploadFileController.$inject = ['$scope'];

  function uploadFileController($scope) {
    var ufCtrl = this;

    ufCtrl.submit = function () {
      console.log(ufCtrl);
    };

    $scope.filesChanged = function (elm) {
      ufCtrl.files = elm.files;
      $scope.$apply();
    }
  }


})();
