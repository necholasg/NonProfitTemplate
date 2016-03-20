(function(){

'use strict';

angular.module('FullpageScroll',[])
.directive('fullpageScroll', FullpageScroll);

// injecting dependencies
FullpageScroll.$inject = ['$window'];

function FullpageScroll ($window) {

	return {
		link: function(scope,element,attr){

			//'top' or 'noscroll' will take up a full page and resize with the page
			if(attr.fullpageScroll === 'top' || attr.fullpageScroll === 'noscroll'){
				element.css({
					'height': String($window.innerHeight)+'px'
				});

				$window.addEventListener('resize', function(){
					element.css({
						'height': String($window.innerHeight)+'px'
					});
				});
			}

			//'scroll' will scroll over the element with 'top'
			else if(attr.fullpageScroll === 'scroll'){
				element.css({
					'margin-top': String($window.innerHeight)+'px'
				});

				$window.addEventListener('resize', function(){
					element.css({
						'margin-top': String($window.innerHeight)+'px'
					});
				});
			}
		}
	}
}

})();
