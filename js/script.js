$(function () {

	/*** EVENTS ***/

	var onImageUpload = function (e) {
		var file = document.getElementById('input-image').files[0];
		var reader = new FileReader();
			reader.onload = fileReaderLoad;
			reader.readAsDataURL(file);
	};

	var fileReaderLoad = function (e) { 
 		var dataUri = e.target.result;
 		var $img = $("<img />").load(onImageLoad).attr("src", dataUri);
       	CONFIG.$image = $img; 
	};

	var onImageLoad = function (e) {
		console.log(e);
       	CONFIG.height = e.target.height;
      	CONFIG.width = e.target.width;
      	renderCanvas();
	};
	
	var onDisplaySelectChange = function (e) {
		var val = $(this).val();
		CONFIG.render = val;

      	renderCanvas();		
	};

	var onPixelSizeChange = function (e) {
		var val = $(this).val();
		CONFIG.pixelSize = parseInt(val, 10);

      	renderCanvas();
	};


	/*** RENDERING ***/

	var renderCanvas = function () {
		var type = CONFIG.render;
		var func = RENDER[type];
		
		if (!func) { 
			return;
		}

		func();
	}


	/*** INIT ***/

	var init = (function () {

		DOM.$inputImage.change(onImageUpload);
		DOM.$displaySelect.change(onDisplaySelectChange);
		DOM.$inputPixelSize.change(onPixelSizeChange);

	}());

});