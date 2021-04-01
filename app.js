$(function() {
  var $bannerItem = $('#banner_screen').find('.banner_item');
  var bannerCount = $('#banner_screen').find('.banner_item').length;
  var bannerLeftValue = [];
  var tempBannerLeftValue = [];
  var banner_obj = {};
  var carouselCount = 0;
  var setIntervalID = null;
  var carousel_Milliseconds = 5000;

  for (var i = 0; i < bannerCount; i++) {
    banner_obj[i] = '#banner' + i;
    bannerLeftValue.push($bannerItem.eq(i).css('left'));
    tempBannerLeftValue.push({left: $bannerItem.eq(i).css('left')});
  }

  var bannerSecondLast = bannerLeftValue[bannerCount-2];
  var bannerThirdLast = bannerLeftValue[bannerCount-3];

  $('#banner0').addClass('active');

  tempBannerLeftValue[bannerCount-2] = { left: bannerSecondLast, visibility: 'hidden' };
  tempBannerLeftValue[bannerCount-3] = { left: bannerThirdLast, visibility: 'inherit' };

  setIntervalID = setInterval(carouselBanner, carousel_Milliseconds);

  $('#banner_screen').mouseover(function() { clearInterval(setIntervalID); });
  $('#banner_screen').mouseout(function() { setIntervalID = setInterval(carouselBanner, carousel_Milliseconds); });

  function carouselBanner() {
    var nextCarouselCount = ( carouselCount + 1 ) % bannerCount; // 1 ~ bannerCount-1

    tempBannerLeftValue.unshift(tempBannerLeftValue.pop());

    $bannerItem.each(function(key) {
      $(banner_obj[key]).css(tempBannerLeftValue[key]);
    });

    $('#banner_screen').find('.banner_item').removeClass('active');
    $('#banner' + nextCarouselCount).addClass('active');
    carouselCount = nextCarouselCount;
  }

  // 146 , 906 , 1666 , -614
  // setInterval(function() {
  //   switch (carouselCount) {
  //     case 1:
  //       $('#banner1').css('left', '-614px');
  //       $('#banner2').css('left', '146px');
  //       $('#banner3').css(transfer_ThirdLastBanner);  // { left: '906px', visibility: 'inherit' }
  //       $('#banner4').css(transfer_SecondLastBanner); // { left: '1666px', visibility: 'hidden' }
  //       carouselCount++;
  //       $('#banner_screen').find('.banner_item').removeClass('active');
  //       $('#banner' + carouselCount).addClass('active');
  //       break;
  //     case 2:
  //       $('#banner1').css(transfer_SecondLastBanner);
  //       $('#banner2').css('left', '-614px');
  //       $('#banner3').css('left', '146px');
  //       $('#banner4').css(transfer_ThirdLastBanner);
  //       carouselCount++;
  //       $('#banner_screen').find('.banner_item').removeClass('active');
  //       $('#banner' + carouselCount).addClass('active');
  //       break;
  //     case 3:
  //       $('#banner1').css(transfer_ThirdLastBanner);
  //       $('#banner2').css(transfer_SecondLastBanner);
  //       $('#banner3').css('left', '-614px');
  //       $('#banner4').css('left', '146px');
  //       carouselCount++;
  //       $('#banner_screen').find('.banner_item').removeClass('active');
  //       $('#banner' + carouselCount).addClass('active');
  //       break;
  //     default:
  //       $('#banner1').css('left', '146px');
  //       $('#banner2').css(transfer_ThirdLastBanner);
  //       $('#banner3').css(transfer_SecondLastBanner);
  //       $('#banner4').css('left', '-614px');
  //       carouselCount = 1;
  //       $('#banner_screen').find('.banner_item').removeClass('active');
  //       $('#banner' + carouselCount).addClass('active');
  //       break;
  //   };
  // }, 3000);

});