/*
Name: Greg Lawrence
Email: gregory_lawrence@student.uml.edu
Umass Lowell Computer Science
Copyright(c) December 9, 2019. May be freely copied or excerpted for educational purposes with credit to the author.
*/

var lowerX, lowerY, higherX, higherY;
var tabIndex = 1;
var slideMin = -10, slideMax = 10;
var no_submit = false;

(function($){

    sub(); // Create default table when page loads


    // Each of the options relating to each slider. Probably would've been better to implement
    // these together somehow but this was the first method of doing it I could think of
    var sliderOpts1 = {
        min: slideMin,
        max: slideMax,
        slide: function(e, ui){
            $("#num1").val(ui.value);
            $("#multTable").remove();
            populateTable(lowerX, higherX, lowerY, higherY);
            sub();
        }
    }

    var sliderOpts2 = {
        min: slideMin,
        max: slideMax,
        slide: function(e, ui){
            $("#num2").val(ui.value);
            $("#multTable").remove();
            populateTable(lowerX, higherX, lowerY, higherY);
            sub();
        }
    }

    var sliderOpts3 = {
        min: slideMin,
        max: slideMax,
        slide: function(e, ui){
            $("#num3").val(ui.value);
            $("#multTable").remove();
            populateTable(lowerX, higherX, lowerY, higherY);
            sub();
        }
    }

    var sliderOpts4 = {
        min: slideMin,
        max: slideMax,
        slide: function(e, ui){
            $("#num4").val(ui.value);
            $("#multTable").remove();
            populateTable(lowerX, higherX, lowerY, higherY);
            sub();
        }
    }

    // Initiate each of the sliders based on their options
    $("#slider1").slider(sliderOpts1);
    $("#slider2").slider(sliderOpts2);
    $("#slider3").slider(sliderOpts3);
    $("#slider4").slider(sliderOpts4);

    // Update sliders based on form input, and repopulate mult table
    $("#num1").blur(function() {
        $("#slider1").slider("value", parseInt($("#num1").val()));
        $("#multTable").remove();
        populateTable(lowerX, higherX, lowerY, higherY);
        sub();
    });

    $("#num2").blur(function() {
        $("#slider2").slider("value", parseInt($("#num2").val()));
        $("#multTable").remove();
        populateTable(lowerX, higherX, lowerY, higherY);
        sub();
    });

    $("#num3").blur(function() {
        $("#slider3").slider("value", parseInt($("#num3").val()));
        $("#multTable").remove();
        populateTable(lowerX, higherX, lowerY, higherY);
        sub();
    });

    $("#num4").blur(function() {
        $("#slider4").slider("value", parseInt($("#num4").val()));
        $("#multTable").remove();
        populateTable(lowerX, higherX, lowerY, higherY);
        sub();
    });

})(jQuery);

// This function runs whenever the forms are valid to generate the main mult table
// originally this function was called by a submit button but now it's just called
// whenever the form values update
function sub(){
    var num1, num2, num3, num4;
    var allNums = document.getElementsByClassName("inputNum");

    if (no_submit == false){
    // set the input values to newly created variables and use parseInt to make sure they are used as integers
        lowerX = parseInt(allNums[0].value, 10);
        higherX = parseInt(allNums[1].value, 10);
        lowerY = parseInt(allNums[2].value, 10);
        higherY = parseInt(allNums[3].value, 10);

        createTable(lowerX, higherX, lowerY, higherY); // call function to actually create the table with the correct size for populating with numbers
        populateTable(lowerX, higherX, lowerY, higherY); // Call function to populate the table with the proper multiplied values
    }
    else{
        return false;
    }
}

// This function creates the tabs and then puts the generated mult table into the tab created
// This function is based on code written by Jason Downing, and edited to work with my own code
// Credit: Jason Downing - jdowning@cs.uml.edu or jason_downing@student.uml.edu
function generateTabs(){
    var numTabs = $("#tableTabs li").length + 1;

    if (numTabs > 20){
        alert("Tab Count Cannot Be Greater Than 20. Please Delete Some Tabs To Create More");
        return false;
    }

    var tabs = $("#tableTabs").tabs();

    tabIndex++;

    var title = "<li class='tab'><a href='#tab-" + tabIndex +
    "'>" + "Table: " + lowerX + " to " + higherX + " by " + lowerY +
    " to " + higherY + "</a>" +
    "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";

    $("div#tableTabs ul").append(title);

    $("div#tableTabs").append('<div id="tab-' + tabIndex + '">' + $("#mTContainer").html() + '</div>');
    $("#tableTabs").tabs("refresh");
    $("#tableTabs").tabs("option", "active", -1);

    tabs.on( "click", "span.ui-icon-close", function() {
        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
    });
}

// Creates an empty table ready to be populated with numbers
function createTable(lx, hx, ly, hy){
    var table = $("<table></table>").attr("id", "multTable_" + tabIndex.toString());
    table.attr("class", "multTable");
    var colLength = Math.abs(ly - hy) + 1;
    var rowLength = Math.abs(lx - hx) + 1;

    // This code should create a table with enough space to fit the input ranges
    // as well as the actual multiplied values
    for(i = 0; i <= colLength; i++){
        row = $("<tr></tr>");
        for(j = 0; j <= rowLength; j++){
            col = $("<td></td>");
            row.append(col);
        }
        table.append(row);
    }
    $("#mTContainer").empty();
    $("#mTContainer").append(table);
}

// Go through the created table and adds the title row and column, then adds the multiplied values
function populateTable(lx, hx, ly, hy){

    var rows = $("#multTable_" + tabIndex.toString() +" tr");
    var numOfRows = rows.length;

    // If user entered values out of order, just swap them so that the multiplication table goes from
    // the smaller value to the larger value
    if((hy - ly) < 0){
        [hy, ly] = [ly, hy];
    }
    if((hx - lx) < 0){
        [hx, lx] = [lx, hx];
    }

    // Populate the first row with the multiplier range
    $("#multTable_" + tabIndex.toString() + " tr:first-child td").each( function(index, elem){
        if(index != 0){
            $(elem).html(lx + index - 1);
            $(elem).css({
                "border-style" : "solid",
                "border-width" : "4px",
                "border-color" : "cyan",
                "background-color" : "black",
                "color" : "cyan",
                "padding" : "5px"
            });
        }else{
            $(elem).css({
                "border-style" : "solid",
                "border-width" : "4px",
                "border-color" : "cyan",
                "background-color" : "black",
                "color" : "cyan",
                "padding" : "5px"
            });
        }
    });

    // Go through the table, and add each of the values
    rows.each(function(rIndex, rVal){
        var cols = $(this).find("td");
        var numOfCols = cols.length;

        cols.each(function(cIndex, cVal){
            // Populate first column with the multiplicand range
            if(rIndex != 0 && cIndex == 0){
                $(this).html(ly + rIndex - 1);
                $(this).css({
                    "border-style" : "solid",
                    "border-width" : "4px",
                    "border-color" : "cyan",
                    "background-color" : "black",
                    "color" : "cyan",
                    "padding" : "5px"
                });
            }
            else if(rIndex != 0){
                var val = ($(rVal).find("td:first-child").html() * $(rows[0]).find("td:nth-child(" + (cIndex + 1) + ")").html());
                $(this).html(val);
            }
        });
    });

}
