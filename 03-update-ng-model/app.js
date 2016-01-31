(function () {
  'use strict';

  angular.module('uploadFileApp', []);

  ///

  angular.module('uploadFileApp').directive('fileInput', fileInput);

  fileInput.$inject = [];

  function fileInput() {
    return {
      restrict: 'A',
      require : 'ngModel',
      link    : function (scope, elm, attrs, ngModel) {
        if (!ngModel) return;

        elm.bind('change', function (ele) {
          ngModel.$setViewValue(ele.currentTarget.files);
        });
      }
    }
  }

  ///

  angular.module('uploadFileApp')
    .controller('uploadFileController', uploadFileController);

  uploadFileController.$inject = ['$http'];

  function uploadFileController($http) {
    var ufCtrl = this;

    ufCtrl.submit = function () {
      var uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
          transformRequest: angular.identity, // esto es para que no transforme
                                              // los datos a JSON
          headers         : {'Content-Type': undefined}
                                              // si ponemos multipart/form-data
                                              // angular no lo reconoce, pero con
                                              // undefined, el browser si
        })
          .success(function () {
          })
          .error(function () {
          });
      };


      for(var i = 0; i < ufCtrl.files.length; i++){
        uploadFileToUrl(ufCtrl.files.item(i), '/upload');
      }

    };
  }

})();
