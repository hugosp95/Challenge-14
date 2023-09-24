function init() {
    
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      var dropdown = d3.select("#selDataset");
      data.names.forEach((subjectId) => {
        dropdown.append("option").text(subjectId).property("value", subjectId);
      });
      var initialSubjectId = data.names[0];
      hbar(initialSubjectId);
      BubbleChart(initialSubjectId);
      demographicTable(metadata);
    });
  }
  
  function hbar(subjectId) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      var selectedSubject = data.samples.filter((sample) => sample.id === subjectId)[0];
  
      var topOtuIds = selectedSubject.otu_ids.slice(0, 10).reverse();
      var topSampleValues = selectedSubject.sample_values.slice(0, 10).reverse();
      var topOtuLabels = selectedSubject.otu_labels.slice(0, 10).reverse();
  
      var trace = {
        x: topSampleValues,
        y: topOtuIds.map((otuId) => `OTU ${otuId}`),
        text: topOtuLabels,
        type: "bar",
        orientation: "h"
      };
  
      var data = [trace];
  
      var layout = {
        title: `Top 10 OTUs for Subject ${subjectId}`,
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU ID" }
      };
  
      Plotly.newPlot("bar", data, layout);
  

    });
  }
  
  function BubbleChart(subjectId) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      var selectedSubject = data.samples.filter((sample) => sample.id === subjectId)[0];
  
      var trace = {
        x: selectedSubject.otu_ids,
        y: selectedSubject.sample_values,
        mode: "markers",
        marker: {
          size: selectedSubject.sample_values,
          color: selectedSubject.otu_ids,
          colorscale: "Earth" 
        },
        text: selectedSubject.otu_labels
      };
  
      var data = [trace];
  
      var layout = {
        title: `Bubble Chart for Subject ${subjectId}`,
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "Sample Values" }
      };
  
      Plotly.newPlot("bubble", data, layout);
    });
  }


  function demographicTable(metadata){

      var demographicTable = d3.select("#sample-metadata");
      demographicTable.html(""); 
  
      var table = demographicTable.append("table").classed("table", true);
  
      Object.entries(metadata).forEach(([key, value]) => {
        var row = table.append("tr");
        row.append("td").text(key);
        row.append("td").text(value);

        

      });   


  }
  
  function charts_d(subjectId) {
    hbar(subjectId);
    BubbleChart(subjectId);
    demographicTable(metadata);
    
  }
  
init();