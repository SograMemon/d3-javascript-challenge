//define global variables
var sampleValues;
var otuIds;
var otuLabels;
var otuPersonId;
function init(){
    //initializes default graph
    //read data from samples.json
    var filepath="../../samples.json";
    var dataPromise= d3.json(filepath).then(data => {
        //get the values for the first otu_id
        sampleValues= data.samples.map(sample => sample.sample_values);
        otuIds= data.samples.map(sample => sample.otu_ids);
        otuLabels= data.samples.map(sample => sample.otu_labels);
        otuPersonId= data.samples.map(sample => sample.id);
        //create data for plotly
        var data=[{
            x: sampleValues[0],
            y: otuIds[0].map(sample => "OTU ".concat(sample)), //add str OTU before each OTU_id
            type: "bar",
            orientation: "h",
            text: otuLabels[0] //hovertext
        }];
        var layout={ title: "Belly Bacteria population"};
        //plot graph
        Plotly.newPlot("bar", data, layout);
        //select dropdown menu 
        var dropDown= d3.select("#selDataset")
        //give the dropdow id values
        otuPersonId.forEach(element => {
            dropDown.append("option").text("PersonId: ".concat(element));
        });
        
    });
}
// define function to draw the graph for a new out_id
function update(i){
    var x= sampleValues[i];
    var y= otuIds[i].map(sample => "OTU ".concat(sample));
    var text= otuLabels[i];
    Plotly.restyle("bar", "x", [x]);
    Plotly.restyle("bar", "y", [y]);
    Plotly.restyle("bar", "text", text);
}
init();
//select dropdown and event which calls update
d3.select("#selDataset").on("change", function(){
    var i= this.selectedIndex;
    var x= sampleValues[i];
    var y= otuIds[i].map(sample => "OTU ".concat(sample));
    var text= otuLabels[i];
    Plotly.restyle("bar", "x", [x]);
    Plotly.restyle("bar", "y", [y]);
    Plotly.restyle("bar", "text", text);
});

