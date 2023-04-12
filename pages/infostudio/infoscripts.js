// const margin = {top: 50, left: 150, right: 50, bottom: 150};
// const width = document.querySelector("#scatterChart").clientWidth;
// const height = 600;
 

// //////////// SCATTERPLOT

// const svg = d3.select("#scatterChart")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height);

//     /* ADDING A G ELEMENT */

//     const g = svg.append('g');

// d3.csv("./data/quadrants_classification.csv").then(function(data) {

//     /*
//     DEFINE DIMENSIONS OF SVG + CREATE SVG CANVAS
//     */


//     const filtered_data = data.filter(function(d) {
//             return d.quadrant != "NA";
//         });

//     /*
//     DETERMINE MIN AND MAX VALUES OF VARIABLES
//     */
//     const averageDispensing = {
//         min: d3.min(filtered_data, function(d) { return +d.averageDispensing; }),
//         max: d3.max(filtered_data, function(d) { return +d.averageDispensing; })
//     };

//     const averageDeaths = {
//         min: d3.min(filtered_data, function(d) { return +d.averageDeaths; }),
//         max: d3.max(filtered_data, function(d) { return +d.averageDeaths; })
//     };

//     const Population = {
//         min: d3.min(filtered_data, function(d) { return +d.Population; }),
//         max: d3.max(filtered_data, function(d) { return +d.Population; })
//     }

//     /*
//     CREATE SCALES
//     */
//     const xScale = d3.scaleLinear()
//         .domain([averageDispensing.min, averageDispensing.max])
//         .range([margin.left, width-margin.right]);

//     const yScale = d3.scaleLinear()
//         .domain([averageDeaths.min, averageDeaths.max])
//         .range([height-margin.bottom, margin.top]);

//     const rScale = d3.scaleSqrt()
//         .domain([Population.min, Population.max])
//         .range([3, 25]);

//     const colorScale = d3.scaleOrdinal()
//         .domain(['lessLess', 'lessMore', 'moreLess', 'moreMore'])
//         .range(['#7899D4', '#AA5064', '#917299', '#DA1F2C']);

//     /*
//     DRAW AXES
//     */

//     const xAxis = g.append("g")
//         .attr("class","axis")
//         .attr("transform", `translate(0,${height-margin.bottom})`)
//         .call(d3.axisBottom().scale(xScale));

//     const yAxis = g.append("g")
//         .attr("class","axis")
//         .attr("transform", `translate(${margin.left},0)`)
//         .call(d3.axisLeft().scale(yScale));

//     /*
//     DRAW POINTS
//     */

//     const points = g.selectAll("circle")
//         .data(filtered_data)
//         .enter()
//         .append("circle")
//             .attr("cx", function(d) { return xScale(d.averageDispensing); })
//             .attr("cy", function(d) { return yScale(d.averageDeaths); })
//             .attr("r", function(d) { return rScale(d.Population); })
//             .attr("fill", function(d) { return colorScale(d.quadrant); })
//             .attr("stroke", "#2B2D42")
//             .attr("stroke-width", 1.5)
//             .attr("opacity", .75);
    
//     /*
//     DRAW AXIS LABELS
//     */

//     const xAxisLabel = g.append("text")
//         .attr("class","axisLabel")
//         .attr("x", width/2.40)
//         .attr("y", height-margin.bottom/2)
//         .text("Prescriptions per 100 people");

//     const yAxisLabel = g.append("text")
//         .attr("class","axisLabel")
//         .attr("transform","rotate(-90)")
//         .attr("x",-height/1.65)
//         .attr("y",margin.left/2)
//         .text("Overdose Deaths per 100k people")



//         /*
//         ADDING ZOOM
//         // */

//         function zoomed(e) {

//             // g.attr("transform", e.transform);

//             // recover the new scale
//             let newX = e.transform.rescaleX(xScale);
//             let newY = e.transform.rescaleY(yScale);
        
//             // update axes with new boundaries
//             xAxis.call(d3.axisBottom(newX))
//             yAxis.call(d3.axisLeft(newY))
        
//             // update circle position
//             g.selectAll("circle")
//             .attr('cx', function(d){return newX(d.averageDispensing)})
//             .attr('cy', function(d){return newY(d.averageDeaths)})
//             // .attr("r", function(d){return rScale(+d.Population)/e.transform.k;})
//             // .attr("stroke-width", 1.5/e.transform.k);
//         };

//         let zoom = d3.zoom()
//         .translateExtent([[0, 0], [width, height]])
//         .scaleExtent([1, 15])
//         .on("zoom", zoomed);

//         svg.call(zoom);


//         // function updateChart() {

//         //     // recover the new scale
//         //     var newX = d3.event.transform.rescaleX(xScale);
//         //     var newY = d3.event.transform.rescaleY(yScale);
        
//         //     // update axes with new boundaries
//         //     xAxis.call(d3.axisBottom(newX))
//         //     yAxis.call(d3.axisLeft(newY))
        
//         //     // update circle position
//         //     g.selectAll("circle")
//         //     .attr('cx', function(d) {return newX(d.averageDispensing)})
//         //     .attr('cy', function(d) {return newY(d.averageDeaths)});
//         // }
        

// });




///////////// MAP

// const svgMap = d3.select("#mapChart")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height)

//     const projection = d3.geoAlbersUsa()
//     .scale(99)
//     .translate([ width/2, height/2 ])

//     Promise.all([
//         d3.json("./data/counties-albers-10m.json"),
//         d3.csv("./data/countyLongLat.csv")
//         ]).then(function (initialize) {
        
//             let dataGeo = initialize[0]
//             let data = initialize[1]
        
//           // Create a color scale
//         const color = d3.scaleOrdinal()
//         .domain(['lessLess', 'lessMore', 'moreLess', 'moreMore'])
//         .range(['#7899D4', '#AA5064', '#917299', '#DA1F2C']);
        
//           // Add a scale for bubble size
//         const valueExtent = d3.extent(data, d => +d.Population)
//         const size = d3.scaleSqrt()
//             .domain(valueExtent)  // What's in the data
//             .range([ 1, 50])  // Size in pixel
        
//           // Draw the map
//         svgMap.append("g")
//             .selectAll("path")
//             //   .data(dataGeo.features)
//             .join("path")
//                 .attr("fill", "#b8b8b8")
//                 .attr("d", d3.geoPath()
//                     .projection(projection)
//                 )
//             .style("stroke", "none")
//             .style("opacity", .3)
        
//           // Add circles:
//         svgMap
//             .selectAll("myCircles")
//             // .data(data.sort((a,b) => +b.Population - +a.Population).filter((d,i) => i<2000000))
//             .join("circle")
//                 .attr("cx", d => projection([+d.lon, +d.lat])[0])
//                 .attr("cy", d => projection([+d.lon, +d.lat])[1])
//                 .attr("r", d => size(+d.Population))
//                 .style("fill", d => color(d.quadrant))
//                 .attr("stroke", "white")
//                 .attr("stroke-width", 1)
//                 .attr("fill-opacity", .4)
        
        
        
//           // Add title and explanation
//         svgMap
//             .append("text")
//                 .attr("text-anchor", "end")
//                 .style("fill", "black")
//                 .attr("x", width - 10)
//                 .attr("y", height - 30)
//                 .attr("width", 90)
//                 .html("TITLE")
//                 .style("font-size", 14)
        
//         })