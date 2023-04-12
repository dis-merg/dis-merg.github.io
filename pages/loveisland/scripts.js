
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
        console.log(gender)
        
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
const jobmargin = {top: 40, left: 130, right: 20, bottom: 70};
var jobwidth = window.innerWidth - jobmargin.left - jobmargin.right - 200;
var jobheight = 350 - jobmargin.top - jobmargin.bottom;


// append the svg object to the body of the page
var jobsvg = d3.select("#jobChart")
    .append("svg")
        .attr("width", jobwidth + jobmargin.left + jobmargin.right)
        .attr("height", jobheight + jobmargin.top + jobmargin.bottom)
    .append("g")
        .attr("transform", "translate(" + jobmargin.left + "," + jobmargin.top + ")");

d3.csv("./data/LoveIsland_Jobs.csv").then(function(data) {

    
    // DATA FILTERS
    
    const filtered_Women = data.filter(function(d) {
        return d.gender == "female";
    });
    
    const filtered_Men = data.filter(function(d) {
        return d.gender == "male";
    });
    
    // AXIS
    
        let x = d3.scaleLinear()
        .domain([0, 10])
        .range([0, jobwidth]);
        
        let jobxAxis = jobsvg.append("g")
        .attr("transform", "translate(0," + jobheight + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .style("text-anchor", "end");
            
    
        let y = d3.scaleBand()
        .range([0, jobheight ])
        .domain(filtered_Women.map(function(d) { return d.profession; }))
        .padding(.1);
        
        let jobyAxis = jobsvg.append("g")
        .call(d3.axisLeft(y))

        jobsvg.selectAll("rect")
        .data(filtered_Women)
        .enter()
        .append("rect")
        .attr("x", x(0) )
        .attr("y", function(d) { return y(d.profession); })
        .attr("width", function(d) { return x(d.total); })
        .attr("height", y.bandwidth() )
        .attr("fill", "#9E0059")


    let jobxAxisLabel = jobsvg.append("text")
        .attr("class","jobaxisLabel")
        .attr("x", jobwidth/2)
        // .attr("y", jobheight-jobmargin.bottom/4)
        .attr("y", jobheight*1.2)
        .attr("text-anchor","middle")
        .text("Age");
    
    let jobyAxisLabel = jobsvg.append("text")
        .attr("class","jobaxisLabel")
        .attr("transform","rotate(-90)")
        .attr("x", -jobheight/2)
        .attr("y", -jobmargin.left/1.1)
        .attr("text-anchor","middle")
        .text("Number of Top Contestants");
    
    
    // BUTTON CLICK
    
    d3.select("#maleJob").on("click", function() {
    
    y = d3.scaleBand()
        .range([0, jobheight ])
        .domain(filtered_Men.map(function(d) { return d.profession; }))
        .padding(.1);

    jobyAxis.call(d3.axisLeft().scale(y))

    jobxAxisLabel = jobsvg.append("text")
        .attr("class","jobaxisLabel")
        .attr("x", jobwidth/2)
        // .attr("y", jobheight-jobmargin.bottom/4)
        .attr("y", jobheight*1.2)
        .attr("text-anchor","middle")
        .text("Age");
    
    jobyAxisLabel = jobsvg.append("text")
        .attr("class","jobaxisLabel")
        .attr("transform","rotate(-90)")
        .attr("x", -jobheight/2)
        .attr("y", -jobmargin.left/1.1)
        .attr("text-anchor","middle")
        .text("Number of Top Contestants");

        

    let b = jobsvg.selectAll("rect")
        .data(filtered_Men);

    b.enter().append("rect")
        .attr("x", x(0) )
        .attr("y", function(d) { return y(d.profession); })
        .attr("width", 0)
        .attr("height", y.bandwidth() )
        .attr("fill", "#FFBD00")
    .merge(b)   
        .transition() // a transition makes the changes visible...
        .duration(1500)
        .attr("x", x(0) )
        .attr("y", function(d) { return y(d.profession); })
        .attr("width", function(d) { return x(d.total); })
        .attr("height", y.bandwidth() )
        .attr("fill", "#FFBD00");

    b.exit()
        .transition()
        .duration(1500)
        .attr("width",0)
        .remove();




    
    });
    
    d3.select("#femaleJob").on("click", function() {

    y = d3.scaleBand()
        .range([0, jobheight ])
        .domain(filtered_Women.map(function(d) { return d.profession; }))
        .padding(.1);

    jobyAxis.call(d3.axisLeft().scale(y));

    let b = jobsvg.selectAll("rect")
        .data(filtered_Women);

    b.enter().append("rect")
        .attr("x", x(0) )
        .attr("y", function(d) { return y(d.profession); })
        .attr("width", 0)
        .attr("height", y.bandwidth() )
        .attr("fill", "#9e0059")
    .merge(b)   
        .transition() // a transition makes the changes visible...
        .duration(1500)
        .attr("x", x(0) )
        .attr("y", function(d) { return y(d.profession); })
        .attr("width", function(d) { return x(d.total); })
        .attr("height", y.bandwidth() )
        .attr("fill", "#9e0059");

    b.exit()
        .transition()
        .duration(1500)
        .attr("width",0)
        .remove();
    
    })});