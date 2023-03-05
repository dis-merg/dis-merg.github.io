//////////// AGE CHART

d3.csv("./data/LoveIsland_Age.csv").then(function(data) {

// MAKE  SVG CANVAS

const width = document.querySelector("#ageChart").clientWidth;
const height = document.querySelector("#ageChart").clientHeight;
const margin = {top: 40, left: 80, right: 20, bottom: 70};
const svg = d3.select("#ageChart")
    .append("svg")
    .attr("width",width)
    .attr("height",height);

// DATA FILTERS

const filtered_Women = data.filter(function(d) {
    return d.gender == "female";
});

const filtered_Men = data.filter(function(d) {
    return d.gender == "male";
});

// SCALES

const xScale = d3.scaleBand()
    .domain(filtered_Women.map(function(d) { return d.age; }))
    .range([margin.left, width-margin.right])
    .padding(0.25);

const yScale = d3.scaleLinear()
    .domain([0,5])
    .range([height-margin.bottom, margin.top]);

// AXIS

const xAxis = svg.append("g")
    .attr("class","axis")
    .attr("transform",`translate(0, ${height-margin.bottom})`)
    .call(d3.axisBottom().scale(xScale));

const yAxis = svg.append("g")
    .attr("class","axis")
    .attr("transform",`translate(${margin.left},0)`)
    .call(d3.axisLeft().scale(yScale).ticks(5));

const xAxisLabel = svg.append("text")
    .attr("class","axisLabel")
    .attr("x", width/2)
    .attr("y", height-margin.bottom/2)
    .attr("text-anchor","middle")
    .text("Age");

const yAxisLabel = svg.append("text")
    .attr("class","axisLabel")
    .attr("transform","rotate(-90)")
    .attr("x",-height/2)
    .attr("y",margin.left/2)
    .attr("text-anchor","middle")
    .text("Number of Top Contestants");

// DATA 

let bar = svg.selectAll("rect")
        .data(filtered_Women)
        .enter()
        .append("rect")
            .attr("x", function(d) { return xScale(d.age); })
            .attr("y", function(d) { return yScale(d.total); })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return height - margin.bottom - yScale(d.total); })
            .attr("fill","#FF0054");

// BUTTON CLICK

d3.select("#maleAgeRace").on("click", function() {

    xScale.domain(filtered_Men.map(function(d) { return d.age; }));

    let b = svg.selectAll("rect")
    .data(filtered_Men, function(d) { return d.age; });

    b.enter().append("rect")
    .attr("x", function(d) { return xScale(d.age); })
    .attr("y", function(d) { return yScale(d.total); })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return height - margin.bottom - yScale(d.total); })
    .attr("opacity", 0)
    .attr("fill","#FFBD00")
    .merge(b)   
        .transition() 
        .duration(1500)
        .attr("x", function(d) { return xScale(d.age); })
        .attr("y", function(d) { return yScale(d.total); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - margin.bottom - yScale(d.total); })
        .attr("opacity", 1)
        .attr("fill","#FFBD00");

    b.exit()
        .transition()
        .duration(1500)
        .attr("opacity",0)
        .remove();

    xAxis.transition()
        .duration(1500)
        .call(d3.axisBottom().scale(xScale));

    yAxis.transition()
        .duration(1500)
        .call(d3.axisLeft().scale(yScale).ticks(5));

});


d3.select("#femaleAgeRace").on("click", function() {

    xScale.domain(filtered_Women.map(function(d) { return d.age; }));

    let b = svg.selectAll("rect")
    .data(filtered_Women, function(d) { return d.age; });

    b.enter().append("rect")
    .attr("x", function(d) { return xScale(d.age); })
    .attr("y", function(d) { return yScale(d.total); })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return height - margin.bottom - yScale(d.total); })
    .attr("opacity", 0)
    .attr("fill","#FF0054")
    .merge(b)   
        .transition() 
        .duration(1500)
        .attr("x", function(d) { return xScale(d.age); })
        .attr("y", function(d) { return yScale(d.total); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - margin.bottom - yScale(d.total); })
        .attr("opacity", 1)
        .attr("fill","#FF0054");

    b.exit()
        .transition()
        .duration(1500)
        .attr("opacity",0)
        .remove();

    xAxis.transition()
        .duration(1500)
        .call(d3.axisBottom().scale(xScale));

    yAxis.transition()
        .duration(1500)
        .call(d3.axisLeft().scale(yScale).ticks(5));
});

});

/////////////// RACE CHART

d3.csv("./data/LoveIsland_Race.csv").then(function(data) {

    // MAKE  SVG CANVAS
    
    const width = document.querySelector("#raceChart").clientWidth;
    const height = document.querySelector("#raceChart").clientHeight;
    const margin = {top: 40, left: 80, right: 20, bottom: 70};
    const svg = d3.select("#raceChart")
        .append("svg")
        .attr("width",width)
        .attr("height",height);
    
    // DATA FILTERS
    
    const filtered_Women = data.filter(function(d) {
        return d.gender == "female";
    });
    
    const filtered_Men = data.filter(function(d) {
        return d.gender == "male";
    });
    
    // SCALES
    
    const xScale = d3.scaleBand()
        .domain(filtered_Women.map(function(d) { return d.race; }))
        .range([margin.left, width-margin.right])
        .padding(0.25);
    
    const yScale = d3.scaleLinear()
        .domain([0,30])
        .range([height-margin.bottom, margin.top]);
    
    // AXIS
    
    const xAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform",`translate(0, ${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));
    
    const yAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform",`translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale).ticks(8));
    
    const xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .attr("text-anchor","middle")
        .text("Race");
    
    const yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x",-height/2)
        .attr("y",margin.left/2)
        .attr("text-anchor","middle")
        .text("Number of Top Contestants");
    
    // DATA 
    
    let bar = svg.selectAll("rect")
            .data(filtered_Women)
            .enter()
            .append("rect")
                .attr("x", function(d) { return xScale(d.race); })
                .attr("y", function(d) { return yScale(d.total); })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) { return height - margin.bottom - yScale(d.total); })
                .attr("fill","#FF0054");
    
    // BUTTON CLICK
    
    d3.select("#maleAgeRace").on("click", function() {
    
        xScale.domain(filtered_Men.map(function(d) { return d.race; }));
    
        let b = svg.selectAll("rect")
        .data(filtered_Men, function(d) { return d.race; });
    
        b.enter().append("rect")
        .attr("x", function(d) { return xScale(d.race); })
        .attr("y", function(d) { return yScale(d.total); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - margin.bottom - yScale(d.total); })
        .attr("opacity", 0)
        .attr("fill","#FFBD00")
        .merge(b)   
            .transition() 
            .duration(1500)
            .attr("x", function(d) { return xScale(d.race); })
            .attr("y", function(d) { return yScale(d.total); })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return height - margin.bottom - yScale(d.total); })
            .attr("opacity", 1)
            .attr("fill","#FFBD00");
    
        b.exit()
            .transition()
            .duration(1500)
            .attr("opacity",0)
            .remove();
    
        xAxis.transition()
            .duration(1500)
            .call(d3.axisBottom().scale(xScale));
    
        yAxis.transition()
            .duration(1500)
            .call(d3.axisLeft().scale(yScale).ticks(8));
    
    });
    
    
    d3.select("#femaleAgeRace").on("click", function() {
    
        xScale.domain(filtered_Women.map(function(d) { return d.race; }));
    
        let b = svg.selectAll("rect")
        .data(filtered_Women, function(d) { return d.race; });
    
        b.enter().append("rect")
        .attr("x", function(d) { return xScale(d.race); })
        .attr("y", function(d) { return yScale(d.total); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - margin.bottom - yScale(d.total); })
        .attr("opacity", 0)
        .attr("fill","#FF0054")
        .merge(b)   
            .transition() 
            .duration(1500)
            .attr("x", function(d) { return xScale(d.race); })
            .attr("y", function(d) { return yScale(d.total); })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return height - margin.bottom - yScale(d.total); })
            .attr("opacity", 1)
            .attr("fill","#FF0054");
    
        b.exit()
            .transition()
            .duration(1500)
            .attr("opacity",0)
            .remove();
    
        xAxis.transition()
            .duration(1500)
            .call(d3.axisBottom().scale(xScale));
    
        yAxis.transition()
            .duration(1500)
            .call(d3.axisLeft().scale(yScale).ticks(8));
    });
    
    });