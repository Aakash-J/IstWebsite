/*

Author: Aakash Jain

Date: 4/13/2017


*/

$(document).ready(function () {


    $(function () {
        $("#tabs").tabs();
    });

	//Loads the about section which is a short introduction to IST website.
    loadAbout();

	//Loads the degrees’ section which lists out the type of graduate and undergraduate degrees offered by the department.
	loadDegree();

	//Loads the employment map.
    loadMap();

	//Loads employment section which refers to the history of co-op and full-time employment information of the current and past students in the department.
    loadEmployment();

    //Loads the people section which includes all information about the faculty and staff of the department.
    loadPeople();

    //Add a contact form to IST website.
    loadContact();

	//Loads all information included in the Footer section.
    loadFooter();



});

function loadAbout()
{

	  $.ajax({url: "https://people.rit.edu/~sarics/web_proxy.php?path=about", success: function(result){

        var obj = jQuery.parseJSON( result );
        $("#aboutContent").html(obj.description);
		$("#aboutHeading").html(obj.title);
		var quote = '"' + obj.quote + '"';
		$("#aboutQuote").append(quote);
		$("#aboutQuoteAuthor").append(obj.quoteAuthor);

    }});


}

function loadDegree() {


    $.getJSON("https://people.rit.edu/~sarics/web_proxy.php?path=degrees", function (json) {


        $.each(json.undergraduate, function (index, value) {

            var concentration = "<b> Concentrations: </b>" + "<br>";
            var len = value.concentrations.length;

            for (var i = 0; i < len; i++) {
                concentration = concentration + value.concentrations[i] + "<br>";
            }

            $('<div>', {
                'class': 'col-sm-4 text-center',
                'html': $('<div>', {
                    'class': 'service-box',
                    'html': $('<h4>').html(value.title)
                }).add($('<div>', {
                    'class': 'service-box',
                    'html': $('<p class="text-muted">').html(value.description)
                })).add($('<div>', {
                    'class': 'service-box',
                    'html': $('<p class="text-muted">').html(concentration)
                }))
            }).appendTo("#undergrad");
        });



        $.each(json.graduate, function (index, value) {

            var concentration = "<b> Concentrations: </b>" + "<br>";
            if (value.concentrations != undefined)
            var len = value.concentrations.length;
            for (var i = 0; i < len; i++)
            {
                concentration = concentration + value.concentrations[i] + "<br>";
            }
            $('<div>', {
                'class': 'col-sm-4 text-center',
                'html': $('<div>', {
                    'class': 'service-box',
                    'html': $('<h4>').html(value.title)
                }).add($('<div>', {
                    'class': 'service-box',
                    'html': $('<p class="text-muted">').html(value.description)
                })).add($('<div>', {
                    'class': 'service-box',
                    'html': $('<p class="text-muted">').html(concentration)
                }))
            }).appendTo("#grad");


        });

    });


}


function loadMap() {


    $("#workmap").attr('src', "https://www.ist.rit.edu/api/map/");

}

function loadContact() {



    $("#contact").load("https://people.rit.edu/~sarics/web_proxy.php?path=contactForm");



}

$(document).ajaxStop(function () {




});

function loadEmployment()
{



    $.ajax({
        url: "https://people.rit.edu/~sarics/web_proxy.php?path=employment/introduction", success: function (result) {

            var obj = jQuery.parseJSON(result);
             $("#titleHeading").html(obj.introduction.title);
             $("#empHeading").html(obj.introduction.content[0].title);
             $("#empContent").html(obj.introduction.content[0].description);
             $("#coopHeading").html(obj.introduction.content[1].title);
             $("#coopContent").html(obj.introduction.content[1].description);

        }
    });

    $('#coopTable').dataTable({
            "ajax": {
                "url": "https://people.rit.edu/~sarics/web_proxy.php?path=employment/coopTable/coopInformation/",
                "dataSrc": "coopInformation"
            },
            "columns": [
                { "data": "employer" },
                { "data": "degree" },
                { "data": "city" },
                { "data": "term" }
            ]

        });

    $('#coopDialog').dialog({
            autoOpen: false,
            title: "Co-op Table",
            show: "blind",
            hide: "explode",
            modal: true,
            width: 1000,
            height: 500
        });
        $('#selectCoop').click(function () {
            var target = $(this);
            $('#coopDialog').dialog("open");
            $('#coopDialog').dialog("widget").position({
                my: 'left top',
                at: 'left bottom',
                of: target
            });
        });


        $('#empTable').dataTable({
            "ajax": {
                "url": "https://people.rit.edu/~sarics/web_proxy.php?path=employment/employmentTable/professionalEmploymentInformation/",
                "dataSrc": "professionalEmploymentInformation"
            },
            "columns": [
                { "data": "employer" },
                { "data": "degree" },
                { "data": "city" },
                { "data": "title" },
                 { "data": "startDate" }
            ]

        });

        $('#empDialog').dialog({
            autoOpen: false,
            title: "Professional Employment Table",
            show: "blind",
            hide: "explode",
            modal: true,
            width: 1000,
            height: 500
        });
        $('#selectEmp').click(function () {
            var target = $(this);
            $('#empDialog').dialog("open");
            $('#empDialog').dialog("widget").position({
                my: 'left top',
                at: 'left bottom',
                of: target
            });
        });
        $(".ui-dialog").find(".ui-widget-header").css("background", "#F05F40");

        $('.ui-dialog-titlebar-close').addClass('ui-icon ui-icon-closethick');


}

function loadPeople() {

    $.getJSON("https://people.rit.edu/~sarics/web_proxy.php?path=people", function (json) {

        $.each(json.faculty, function (index, value) {
            var web = value.website;

            if (web != "") {

                if (web[web.length - 1] == "/") {

                    web = web.substr(0, web.length-1);

                    console.log(web);
                }

                var link = "<a href =" + web + " target='_blank' + " + ">" + value.name + '<br>' + value.title + "</a>";
            } else {
                var link = value.name + '<br>' + value.title;
            }


            $('<div>', {
                'class': 'col-sm-3 text-center',
                'html': $('<div>', {
                    'class': 'service-box row',
                    'html': $('<img class="img-circle center-block"  width="90" height="90">').attr("src", value.imagePath)
                }).append($('<div>', {
                    'class': 'service-box text-center',
                    'html': $('<p class="text-muted">').html(link)
                }))
            }).appendTo("#people");
        });


        $.each(json.staff, function (index, value) {



            $('<div>', {
                'class': 'col-sm-3 text-center',
                'html': $('<div>', {
                    'class': 'service-box row',
                    'html': $('<img class="img-circle center-block"  width="90" height="90">').attr("src", value.imagePath)
                }).append($('<div>', {
                    'class': 'service-box text-center',
                    'html': $('<p class="text-muted">').html(value.name + '<br>' + value.title)
                }))
            }).appendTo("#staff");
        });

    });

 }

function loadFooter() {

    $.getJSON("https://people.rit.edu/~sarics/web_proxy.php?path=footer", function (json) {


        link1 = "<a href =" + json.quickLinks[0].href + " target='_blank' + " + ">" + json.quickLinks[0].title + "</a>";
        link2 = "<a href =" + "https://securelb.imodules.com/s/1624/index-giving.aspx?sid=1624&gid=1&pgid=705&dids=161&appealcode=IST-website" + " target='_blank' + " + ">" + json.quickLinks[2].title + "</a>";
        link3 = "<a href =" + "http://www.istlabs.rit.edu/" + " target='_blank' + " + ">" + json.quickLinks[3].title + "</a>";


       $('<div>', {
                'class': 'col-sm-12 ',

                'html': $('<div class = "col-sm-12 text-center">').html(link1 + "&nbsp &nbsp &nbsp" + link2 + "&nbsp &nbsp &nbsp" + link3 + "<br>" + "<br>" + json.copyright.html)

            }).appendTo("#footer");

    });
}


