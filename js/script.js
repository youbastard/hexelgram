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
		CONFIG.height = e.target.height;
      	CONFIG.width = e.target.width;
      	setCanvasSize();
		cacheCanvas();
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
	
	var onSaveSubmit = function(e) {
		
		/* Nick, I'm converting the Canvas to PNG data and opening it in a new window
		 If we want to save it to the filesystem, I'll need to use PHP - not sorry! xoxo j$ */
		 
		var savedPNG = DOM.canvas.toDataURL("image/png");
		window.open(savedPNG,'_blank');
	};


	/*** RENDERING ***/

	var setCanvasSize = function () {
		DOM.$canvas.attr('height', CONFIG.height).attr('width', CONFIG.width);
	};

	var cacheCanvas = function () {
		var canvas = document.createElement('canvas');
			canvas.height = CONFIG.height;
			canvas.width = CONFIG.width;
		var ctx = canvas.getContext('2d');
			ctx.drawImage(CONFIG.$image.get(0), 0, 0);

		CONFIG.imageLoaded = true;
		CONFIG.cache.canvas = canvas;
		CONFIG.cache.ctx = ctx;
		CONFIG.cache.img = ctx.getImageData(0, 0, canvas.width, canvas.height);
		CONFIG.cache.data = CONFIG.cache.img.data;
	};

	var renderCanvas = function () {
		var type = CONFIG.render;
		var func = RENDER[type];
		
		if (!func) { 
			return;
		}

		if (!CONFIG.imageLoaded) {
			return;
		}

		func();
	}


	/*** INIT ***/

	var init = (function () {

		DOM.$inputImage.change(onImageUpload);
		DOM.$displaySelect.change(onDisplaySelectChange);
		DOM.$inputPixelSize.change(onPixelSizeChange);
		DOM.$save.click(onSaveSubmit);

	}());

});