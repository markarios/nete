d3.custom = {};
d3.custom.forceChart = function module(){
	// INSTRUCTIONS
	// var chart = d3.custom.forceChart();
	// d3.select(".vis").datum(dataset)
	// 	.call(chart);
	var margin = {top: 80,right:80, bottom: 80, left:80},
	width = 640,
	height = 640,
	radius = 4,
	svg,
	svgBackgroundColor = "#000",
	colorScale = d3.scale.category20(),
	chartClass = "chart",
	containerClass = "container",
	linkDistance = [10],
	charge = [-20];
	function exports(_selection){
		_selection.each(function(_data){
			var chartW = width - margin.left - margin.right,
					chartH = height - margin.top - margin.bottom;
			if(!svg){
				svg = d3.select(this)
					.append("svg")
					.classed(chartClass,true)
					.style("background-color",svgBackgroundColor);
				var container = svg.append("g")
					.classed(containerClass,true)
			}
			svg.attr({ width: width, height: height})

			svg.select("\." + containerClass).attr("transform","translate(" + margin.left + "," + margin.top + " )");
			var force = d3.layout.force()
				.nodes(_data.nodes)
				.links(_data.edges)
				.size([ chartW, chartH])
				.linkDistance(linkDistance)
				.charge(charge)
				.start();
			var edges = container.selectAll("line")
				.data(_data.edges)
				.enter()
				.append("line")
				.classed("edges",true)
				.style("stroke","#CCC")
				.style("stroke-width",1);
			var nodes = container.selectAll("circle")
				.data(_data.nodes)
				.enter()
				.append("circle")
				.attr("r",radius)
				.style("fill",function(d,i){
					return colorScale(i);
				})
				.call(force.drag);
			force.on("tick",function(){
				edges.attr("x1",function(d){return d.source.x;})
						.attr("y1",function(d){return d.source.y;})
						.attr("x2",function(d){return d.target.x;})
						.attr("y2",function(d){return d.target.y;})
				nodes.attr("cx",function(d){return d.x})
						 .attr("cy",function(d){return d.y});
			});
		})
	}
	exports.width = function(_) {
		if(!arguments.length) return width;
		width = _;
		return this;
	};
	exports.height = function(_) {
		if(!arguments.length) return height;
		height = _;
		return this;
	}
	exports.svgBackgroundColor = function(_) {
		if(!arguments.length) return svgBackgroundColor;
		svgBackgroundColor = _;
		return this;
	}
	exports.colorScale = function(_) {
		if(!arguments.length) return colorScale;
		colorScale = _;
		return this;
	}
	exports.margin = function(_) {
		if(!arguments.length) return margin;
		margin = _;
		return this;
	}
	exports.chartClass = function(_) {
		if(!arguments.length) return chartClass;
		chartClass = _;
		return this;
	}
	exports.containerClass = function(_) {
		 if(!arguments.length) return containerClass;
		 containerClass = _;
		 return this;
	}
	exports.linkDistance = function(_) {
		 if(!arguments.length) return linkDistance;
		 linkDistance = _;
		 return this;
	}
	exports.charge = function(_) {
		if(!arguments.length) return charge;
		charge  = _;
		return this;
	}
	exports.radius = function(_) {
		if(!arguments.length) return radius;
		radius = _;
		return this;
	}
	return exports;
}