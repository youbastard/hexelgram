RENDER.normal = function () {
	var attr = {
		height : CONFIG.height,
		width : CONFIG.width
	};

	var imgData = CONFIG.cache.ctx.getImageData(0, 0, attr.width, attr.height)
	DOM.context.putImageData(imgData, 0, 0);
};