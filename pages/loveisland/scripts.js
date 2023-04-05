
const margin = {top: 40, left: 80, right: 20, bottom: 70};

let ageData = "./data/LoveIsland_Age.csv";
let raceData = "./data/LoveIsland_Race.csv";

Promise.all([
    d3.csv(ageData),
    d3.csv(raceData),
]).then(function(files) {

    let filtered_Women_A = files[0].filter(function(d) {
        return d.gender == "female";
    });
    
    let filtered_Men_A = files[0].filter(function(d) {
        return d.gender == "male";
    });

    let filtered_Women_B = files[1].filter(function(d) {
        return d.gender == "female";
    });
    
    let filtered_Men_B = files[1].filter(function(d) {
        return d.gender == "male";
    });

    chartA(filtered_Women_A, "female");
    chartB(filtered_Women_B, "female");

    d3.selectAll(".select").on("click", function() {
        var gender = d3.selectAll(".select").property("id");
        if (gender === "female") {
            chartA.update(filtered_Women_A, "female");
            chartB.update(filtered_Women_B, "female");
        } else {
            chartA.update(filtered_Men_A, "male");
            chartB.update(filtered_Men_B, "male");
        }
    })

});


// make first chart

function chartA(data, gender) {

    var width = document.querySelector("#ageRace").clientWidth / 2 - (margin.left + margin.right);
    var height = 500 - (margin.top + margin.bottom);

    // var width = document.querySelector("#ageRace").clientWidth / 2;
    // var height = document.querySelector("#ageRace").clientHeight;

    const svg = d3.select("#charts")
    .append("svg")
    .attr("class", "ageChart")
    .attr("width",width)
    .attr("height",height);

    function assignColor(gender) {
        if (gender === "female") {
            return "#FF0054";
        }
        return "#FFBD00";
    }

    const age = {
        min: d3.min(data, function(d) {return +d.age; }),
        max: d3.max(data, function(d) {return + d.age; })
    };

    var xScale = d3.scaleBand()
        .domain(data.map(function(d) { return d.age; }))
        .range([margin.left, width-margin.right])
        .padding(0.5);

    const yScale = d3.scaleLinear()
        .domain([0,5]).nice()
        .range([height-margin.bottom, margin.top]);

    const xAxis = svg.append("g")
        .attr("class","axis--x")
        .attr("transform",`translate(0, ${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    const yAxis = svg.append("g")
        .attr("class","axis--y")
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

    update(data,gender);

    function update(data, gender) {

        xScale = d3.scaleBand()
        .domain(data.map(function(d) { return d.age; }))
        .range([margin.left, width-margin.right])
        .padding(0.5);

        xAxis.call(d3.axisBottom().scale(xScale));

        var bars = svg.selectAll(".ageBars")
            .data(data, function(d){
                return d.gender;
            });

        bars.join(
            function(enter) {
                return enter.append("rect")
                .attr("class", "ageBars")
                .attr("x", function(d) { return xScale(d.age); })
                .attr("y", function(d) { return yScale(d.total); })
                .attr("width", xScale.bandwidth())
                .attr("height", 0)
                .transition().duration(700)
                .attr("height", function(d) {return height - (margin.bottom + yScale(d.total)); })
                .attr("fill", assignColor(gender));
            },
            function(update){
                return update.transition().duration(700);
            },
            function(exit){
                return exit.transition().duration(700)
                    .attr("height", "0")
                    .remove();
            }
        );
    }

    chartA.update = update;

}

function chartB(data, gender) {

    var width = document.querySelector("#ageRace").clientWidth / 2 - (margin.left + margin.right);
    var height = 500 - (margin.top + margin.bottom);

    // var width = document.querySelector("#ageRace").clientWidth / 2;
    // var height = document.querySelector("#ageRace").clientHeight;

    const svg = d3.select("#charts")
        .append("svg")
        .attr("class", "raceChart")
        .attr("width", width)
        .attr("height", height);

    function assignColor(gender) {
        if (gender === "female") {
            return "#FF0054";
        }
        return "#FFBD00";
    }

    const race = {
        min: d3.min(data, function(d) {return +d.race; }),
        max: d3.max(data, function(d) {return +d.race; })
    };

    var xScale = d3.scaleBand()
        .domain(data.map(function(d) { return d.race; }))
        .range([margin.left, width-margin.right])
        .padding(0.5);

    var yScale = d3.scaleLinear()
        .domain([0,30]).nice()
        .range([height-margin.bottom, margin.top]);

    const xAxis = svg.append("g")
        .attr("class","axis--x")
        .attr("transform",`translate(0, ${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    const yAxis = svg.append("g")
        .attr("class","axis--y")
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

    update(data, gender);

    function update(data, gender) {

        xScale = d3.scaleBand()
        .domain(data.map(function(d) { return d.race; }))
        .range([margin.left, width-margin.right])
        .padding(0.5);

        xAxis.call(d3.axisBottom().scale(xScale));

        let bars = svg.selectAll(".secondBars")
            .data(data, function(d){
                return d.gender;
            });

        bars.join(
            function(enter) {
                return enter.append("rect")
                    .attr("class", "secondBars")
                    .attr("x", function(d) { return xScale(d.race); })
                    .attr("y", function(d) { return yScale(d.total); })
                    .attr("width", xScale.bandwidth())
                    .attr("height", 0)
                    .transition().duration(700)
                    .attr("height", function(d) { return height - margin.bottom - yScale(+d.total); })
                    .attr("fill", assignColor(gender));
            },
            function(update){
                return update.transition().duration(700);
            },
            function(exit){
                return exit.transition().duration(700)
                    .attr("height", 0)
                    .remove();
            }
        )

    }

    chartB.update = update;

}


/////////////// PROFESSION CHART

// set the dimensions and margins of the graph
var jobwidth = window.innerWidth - margin.left - margin.right - 200;
var jobheight = 350 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#jobChart")
  .append("svg")
    .attr("width", jobwidth + margin.left + margin.right)
    .attr("height", jobheight + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("./data/LoveIsland_Jobs.csv").then(function(data) {

    
    // DATA FILTERS
    
    const filtered_Women = data.filter(function(d) {
        return d.gender == "female";
    });
    
    const filtered_Men = data.filter(function(d) {
        return d.gender == "male";
    });
    
    // AXIS
    
    var x = d3.scaleLinear()
    .domain([0, 10])
    .range([0, jobwidth]);
    svg.append("g")
    .attr("transform", "translate(0," + jobheight + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    
        var y = d3.scaleBand()
        .range([0, jobheight ])
        .domain(data.map(function(d) { return d.profession; }))
        .padding(.1);
        svg.append("g")
        .call(d3.axisLeft(y))

        svg.selectAll("myRect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", x(0) )
        .attr("y", function(d) { return y(d.profession); })
        .attr("width", function(d) { return x(d.total); })
        .attr("height", y.bandwidth() )
        .attr("fill", "#9E0059")


    // const xAxisLabel = svg.append("text")
    //     .attr("class","axisLabel")
    //     .attr("x", width/2)
    //     .attr("y", height-margin.bottom/2)
    //     .attr("text-anchor","middle")
    //     .text("Age");
    
    // const yAxisLabel = svg.append("text")
    //     .attr("class","axisLabel")
    //     // .attr("transform","rotate(-90)")
    //     // .attr("x",-height/2)
    //     // .attr("y",margin.left/2)
    //     .attr("text-anchor","middle")
    //     .text("Number of Top Contestants");
    
    
    // BUTTON CLICK
    
    // d3.select("#maleAgeRace").on("click", function() {
    
    //     xScale.domain(filtered_Men.map(function(d) { return d.age; }));
    
    //     let b = svg.selectAll("rect")
    //     .data(filtered_Men, function(d) { return d.age; });
    
    //     b.enter().append("rect")
    //     .attr("x", function(d) { return xScale(d.age); })
    //     .attr("y", function(d) { return yScale(d.total); })
    //     .attr("width", xScale.bandwidth())
    //     .attr("height", function(d) { return height - margin.bottom - yScale(d.total); })
    //     .attr("opacity", 0)
    //     .attr("fill","#FFBD00")
    //     .merge(b)   
    //         .transition() 
    //         .duration(1500)
    //         .attr("x", function(d) { return xScale(d.age); })
    //         .attr("y", function(d) { return yScale(d.total); })
    //         .attr("width", xScale.bandwidth())
    //         .attr("height", function(d) { return height - margin.bottom - yScale(d.total); })
    //         .attr("opacity", 1)
    //         .attr("fill","#FFBD00");
    
    //     b.exit()
    //         .transition()
    //         .duration(1500)
    //         .attr("opacity",0)
    //         .remove();
    
    //     xAxis.transition()
    //         .duration(1500)
    //         .call(d3.axisBottom().scale(xScale));
    
    //     yAxis.transition()
    //         .duration(1500)
    //         .call(d3.axisLeft().scale(yScale).ticks(5));
    
    // });
    
    
    // d3.select("#femaleAgeRace").on("click", function() {
    
    //     xScale.domain(filtered_Women.map(function(d) { return d.age; }));
    
    //     let b = svg.selectAll("rect")
    //     .data(filtered_Women, function(d) { return d.age; });
    
    //     b.enter().append("rect")
    //     .attr("x", function(d) { return xScale(d.age); })
    //     .attr("y", function(d) { return yScale(d.total); })
    //     .attr("width", xScale.bandwidth())
    //     .attr("height", function(d) { return height - margin.bottom - yScale(d.total); })
    //     .attr("opacity", 0)
    //     .attr("fill","#FF0054")
    //     .merge(b)   
    //         .transition() 
    //         .duration(1500)
    //         .attr("x", function(d) { return xScale(d.age); })
    //         .attr("y", function(d) { return yScale(d.total); })
    //         .attr("width", xScale.bandwidth())
    //         .attr("height", function(d) { return height - margin.bottom - yScale(d.total); })
    //         .attr("opacity", 1)
    //         .attr("fill","#FF0054");
    
    //     b.exit()
    //         .transition()
    //         .duration(1500)
    //         .attr("opacity",0)
    //         .remove();
    
    //     xAxis.transition()
    //         .duration(1500)
    //         .call(d3.axisBottom().scale(xScale));
    
    //     yAxis.transition()
    //         .duration(1500)
    //         .call(d3.axisLeft().scale(yScale).ticks(5));
    // });
    
    });