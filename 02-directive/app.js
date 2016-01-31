(function () {
  'use strict';

  angular.module('uploadFileApp', []);

  ///

  angular.module('uploadFileApp').directive('fileInput', fileInput);

  fileInput.$inject = ['$parse'];

  function fileInput($parse) {
    return {
      restrict: 'A',
      link    : function (scope, elm, attrs) {
        elm.bind('change', function () {
          $parse(attrs.fileInput)
            .assign(scope, elm[0].files);
          scope.$apply();
        });
      }
    }
  }

  ///

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
