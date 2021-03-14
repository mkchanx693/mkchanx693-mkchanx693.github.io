var highlightEvent;
var eventIndex = 0;

AOS.init({
    easing: 'ease-in-out-back',
    debounceDelay: 100,
    mirror: true,
    anchorPlacement: "center-bottom",
    });


$(document).ready(function(){
    var banners = JSON.stringify(mockData_banner);
    homebanner(banners);
    preparePartners(mockData_partner.partners);
    prepareAnnouncement(mockData_announcement.d.announcement);

    var selectedLi = $('.annPagination li:contains("1")');
    selectedLi.addClass("active");
    
    highlightEvent = mockData_highlight.events;
    $("#eventBtnGo").attr("href",highlightEvent[eventIndex].event_go_url);
    $("#eventIndexText").text("0"+ (eventIndex + 1) + " / 0"+ highlightEvent.length);

    $(".menu-icon-wrap").click(function(){
        $(".menu-line.active").removeClass("active");
        $(".menu-icon-wrap").removeClass("active");
        var data = $(this).data("menu");
        var lineSelector = ".menu-line." + data;
        $(lineSelector).addClass("active");
        $('.menu-icon-wrap[data-menu="'+ data+'"]').addClass("active");
        $(".menu-screen-display").attr("src","assets/img/VN/"+data+"-VN.png");
        $("#btnGoNow").attr("href",$(this).data("menu-link"));
    });
    
    $('.tilt-div').tilt({
        axis: "x",
        maxTilt: 5,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        speed: 300,
    });
});

function preparePartners(data){
     var list ="<div class='main-page-subtitle'>ĐẠI SỨ & CỘNG TÁC</div>";
    $.each(data, function(index, value) {   
        list += drawPartners(value);
    });
    $('.main-ambassador').html(list);
}

function drawPartners(value){
    var partnerRow = 
    "<div class='amb-wrap' data-aos='fade-right' data-aos-easing='linear' data-aos-delay='"+ value.data_aos_delay +"'>" +
		"<img class='amb-bg' src='"+ value.partner_img +"'/>" +
		"<div class='amb-desc'>" +
            "<div class='amb-desc-wrap'>" +
                "<span class='amb-desc-name'>"+ value.partner_name + "</span>&nbsp;<span class='amb-desc-name highlight'>" + value.partner_name_cn + "</span><br/>" +
                "<span class='amb-desc-short'>"+ value.partner_desc + "</span><br/>" +
                "<span class='desc amb-desc-fb' style='display:" + (value.partner_fb ? "inline-block" : "none") +"'><img class='facebook-icon' src='assets/img/ENG/Facebook_Icon.png' alt='icon-fb'/><span>" +value.partner_fb + "</span></span>" +
                "<span style='display:" + (value.partner_fb_name ? "block" : "none") +"'>" +value.partner_fb_name + "</span>" +
                "<span class='desc amb-desc-inst' style='display:" + (value.partner_ins ? "inline-block" : "none") +"'><img class='instagram-icon' src='assets/img/ENG/Instagram-Icon.png' alt='icon-ins'/>" + value.partner_ins+ "</span><br/>" +
                "<span style='display:" + (value.partner_ins_name ? "block" : "none") +"'>" +value.partner_ins_name + "</span>" +
                "<span class='desc amb-desc-youtube' style='display:"+ (value.partner_yout ? "inline-block" : "none") +"'><img class='video-icon' src='assets/img/ENG/Youtube-Icon.png' alt='icon-video'/>" + value.partner_yout + "</span><br/>" +
            "</div>" +
		"</div>" +
		"<img class='img-amb-divider' src='assets/img/ENG/Partner-_-Ambassador_Divider-Line.png' alt='divider'/>" +
	"</div>";
    return partnerRow;
}

function eventTraverse(direction){
    var videoSelector = $(".event-section-wrap .main-youtube-frame iframe");
    if(direction == "left" && eventIndex > 0){
        eventIndex = eventIndex - 1;
        videoSelector.attr("src", highlightEvent[eventIndex].event_url);
        $("#eventIndexText").text("0"+ (eventIndex + 1) + " / 0"+ highlightEvent.length);
        $("#eventBtnGo").attr("href",highlightEvent[eventIndex].event_go_url);
    }
    else if(direction == "right" && eventIndex < highlightEvent.length - 1){
        eventIndex = eventIndex + 1;
        videoSelector.attr("src", highlightEvent[eventIndex].event_url);
        $("#eventIndexText").text("0"+ (eventIndex + 1) + " / 0"+ highlightEvent.length);
        $("#eventBtnGo").attr("href",highlightEvent[eventIndex].event_go_url);
    }
    if(eventIndex == 0){
        $(".link-btn-left").removeClass("active").addClass("inactive");
    }
    else if(eventIndex == highlightEvent.length - 1){
        $(".link-btn-right").removeClass("active").addClass("inactive");
    }
    else{
        $(".link-btn-left").removeClass("inactive").addClass("active");
        $(".link-btn-right").removeClass("inactive").addClass("active");
    }
    
}
function convertDate(stringDate){
    var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    var arrayDate = stringDate.match(pattern);
    return new Date(arrayDate[3], arrayDate[2] - 1, arrayDate[1]);
}

function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }

  function reDrawAnnToTable(currentPage) {
    $('#main-news-table').append(annContentTgt);
    $('.annPage').hide();
    $('#annPage-1').show();
    currentPage = parseInt(currentPage);
    console.log(currentPage);
    if(currentPage + 1 < countPage){
        $('.annPagination li.active').removeClass("active");
        var annPaginationDisplay = '<ul class="pagination pagination-sm annPagination">';
        var prev = (currentPage - 1);
        if(prev > 0){
            annPaginationDisplay += '<li><a href="javascript:void(0);" onclick="openAnnPage(\'' + prev + '\');">' + '<' + '</a></li>'
        }
        for (var i = currentPage; i <= currentPage + 2; i++) {
            annPaginationDisplay += '<li><a href="javascript:void(0);" onclick="openAnnPage(\'' + i + '\');">' + i + '</a></li>'
        }
        var next = (currentPage + 3);
        if(next < countPage){
            annPaginationDisplay += '<li><a href="javascript:void(0);" onclick="openAnnPage(\'' + next + '\');">' + '>' + '</a></li>'
        }
        annPaginationDisplay += '</ul>';
        $('#annPagination-wrap').empty().html(annPaginationDisplay);
        if (countPage == 1) {
            $('#annPagination-wrap').hide();
        }
        var selectedLi = $('.annPagination li:contains("'+currentPage.toString()+'")');
        selectedLi.addClass("active");
    }
    
}