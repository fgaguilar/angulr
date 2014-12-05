var myApp = angular.module('app', []);
myApp.run(function($locale){
    $locale.NUMBER_FORMATS.GROUP_SEP = ",";
});
myApp.controller('MyCtrl', function($scope, $locale) {
  $scope.currencyVal = 123456;
});

myApp.directive('numericInput', function($filter, $browser, $locale) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var replaceRegex = new RegExp($locale.NUMBER_FORMATS.GROUP_SEP, 'g');
            var fraction = $attrs.fraction || $locale.NUMBER_FORMATS.PATTERNS[0].maxFrac;
            var listener = function() {
                var value = $element.val().replace(replaceRegex, '')
                $element.val($filter('number')(value, fraction))
            }
            
            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                var newVal = viewValue.replace(replaceRegex, '');
                var newValAsNumber = newVal * 1;
                
                // check if new value is numeric, and set control validity
                if (isNaN(newValAsNumber)){
                    ngModelCtrl.$setValidity(ngModelCtrl.$name+'Numeric', false);
                }
                else{
                    newVal = newValAsNumber.toFixed(fraction);
                    ngModelCtrl.$setValidity(ngModelCtrl.$name+'Numeric', true);
                }
                return newVal;
                
            })
            
            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('number')(ngModelCtrl.$viewValue, fraction))
            }
            
            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode
                // If the keys include the CTRL, SHIFT, ALT, or META keys, home, end, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (35 <= key && key <= 40)) 
                    return 
                //$browser.defer(listener) // Have to do this or changes don't get picked up properly
            })
            
            //$element.bind('paste cut', function() {
//                $browser.defer(listener)  
//            })
        }
        
    }
})