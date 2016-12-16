
//Catalog
var spreadsheetID = '1_AOS3qX58_yfJr_JP4psZ5g3hKOsSbQqna-_jdQF8bU',
url = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetID + '/od6/public/values?alt=json',
CatItem = function(){},
catalog = [];

$.getJSON(url, function(data) {
  var entry = data.feed.entry;
  $(entry).each(function(index, item){
    var catitem = new CatItem();
    catitem.photo= item.gsx$foto.$t;
    catitem.name= item.gsx$nombre.$t;
    catitem.desc= item.gsx$descripción.$t;
    catitem.notes= item.gsx$notas.$t;
    catitem.price= item.gsx$precio.$t;
    catitem.published= item.gsx$publicar.$t;
    catalog.push(catitem);
  });
  appendToCat();
});

function appendToCat() {
  $(catalog).each(function(index, item){
    var fancytitle = '<strong>'+item.name+'</strong>';
    if(item.desc) {
      fancytitle += ' <br>'+item.desc;
    }
    if(item.notes) {
      fancytitle += ' <br><small>'+item.notes+'</small>';
    }
    var newLi = '<li><a class="fancy" rel="catalog" href="img/portfolio/'+item.photo+'" title="'+fancytitle+'"><img src="img/portfolio/'+item.photo+'" alt="'+item.name+'" /><div class="text"><p>'+item.name+'</p><p class="price">'+item.price+'</p><p class="description">'+item.desc+'<br><small>'+item.notes+'</small></p></div></a></li>';
    if (item.published === 'si'){
      $("#portfolio ul").append(newLi);
    }
  });
  // niceScroll
  $("html").niceScroll();
  
  // Stick menu
  $(".menu").sticky({topSpacing:0});

  $(".preloader").delay(1000).fadeOut("slow")

  // Parallax
  if ($('.parallax-background').length) {
    $(".parallax-background").parallax();
  }

  // Parallax
  if ($('.parallax-background-partners').length) {
    $(".parallax-background-partners").parallax();
  } 
  // Fancybox
  $('.fancy').fancybox({
      helpers    : {
        title : { type : 'inside' },
        buttons : {}
      }
    });

  // Masonry
  var $container = $('.grid');

  $container.imagesLoaded( function(){
   $container.masonry({
     itemSelector : 'li'
   });
  });

  // Map
  var map = new GMaps({
    div: '#map',
    lat: -33.4442675,
    lng: -70.5459003
  });
  map.addMarker({
    lat: -33.4442675,
    lng: -70.5459003,
    title: 'Ecogris'
  });

};


// Menu Scroll to content and Active menu
var lastId,
  topMenu = $("#menu"),
  topMenuHeight = topMenu.outerHeight()+145,
  menuItems = topMenu.find("a"),
  scrollItems = menuItems.map(function(){
    var item = $($(this).attr("href"));
    if (item.length) { return item; }
  });

 $('a[href*=#]').bind('click', function(e) {
e.preventDefault();
     
var target = $(this).attr("href");
		

$('html, body').stop().animate({ scrollTop: $(target).offset().top-140 }, 1000, function() {

});
		
return false;
 });

$(window).scroll(function(){
 var fromTop = $(this).scrollTop()+topMenuHeight;
 var cur = scrollItems.map(function(){
   if ($(this).offset().top < fromTop)
     return this;
 });

 cur = cur[cur.length-1];
 var id = cur && cur.length ? cur[0].id : "";
 
 if (lastId !== id) {
     lastId = id;
     menuItems
       .parent().removeClass("active")
       .end().filter("[href=#"+id+"]").parent().addClass("active");
 }                   
});  


if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  
  $(".footer").css( "position", "relative" );
  $(".contact").css( "marginBottom", "0" );

}
else 
{

// FadeTo elements
if ( $(window).width() > 1023) {  

  tiles = $("h2, h3, .column-one, .column-two, .column-three, .grid li, .contact .content .form, .contact .content .contact-text ").fadeTo(0, 0);

  $(window).scroll(function(d,h) {
    tiles.each(function(i) {
        a = $(this).offset().top + $(this).height();
        b = $(window).scrollTop() + $(window).height();
        if (a < b) $(this).fadeTo(1000,1);
    });
  });

}

}



//Menu mobile click
$( ".icon" ).click(function() {
  $( " ul.menu-click" ).slideToggle( "slow", function() {
  // Animation complete.
  });
});


