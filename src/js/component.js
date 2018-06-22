jQuery.cookie = function (name, value, options) {
  if (typeof value != 'undefined') { // name and value given, set cookie
    options = options || {};
    if (value === null) {
      value = '';
      options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
        date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
      } else {
        date = options.expires;
      }
      expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
    }
    // CAUTION: Needed to parenthesize options.path and options.domain
    // in the following expressions, otherwise they evaluate to undefined
    // in the packed version for some reason...
    var path = options.path ? '; path=' + (options.path) : '';
    var domain = options.domain ? '; domain=' + (options.domain) : '';
    var secure = options.secure ? '; secure' : '';
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
  } else { // only name given, get cookie
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
};

/**
 * @name		jQuery Countdown Plugin
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://tutorialzine.com/2011/12/countdown-jquery/
 * @license		MIT License
 */

(function ($) {

  // Количество секунд в каждом временном отрезке
  var days = 24 * 60 * 60,
    hours = 60 * 60,
    minutes = 60;

  // Создаем плагин
  $.fn.countdown = function (prop) {

    var options = $.extend({
      callback: function () {},
      timestamp: 0
    }, prop);

    var left, d, h, m, s, positions;

    // инициализируем плагин
    init(this, options);

    positions = this.find('.position');

    (function tick() {

      // Осталось времени
      left = Math.floor((options.timestamp - (new Date())) / 1000);

      if (left < 0) {
        left = 0;
      }

      // Осталось дней
      d = Math.floor(left / days);
      updateDuo(0, 1, d);
      left -= d * days;

      // Осталось часов
      h = Math.floor(left / hours);
      updateDuo(2, 3, h);
      left -= h * hours;

      // Осталось минут
      m = Math.floor(left / minutes);
      updateDuo(4, 5, m);
      left -= m * minutes;

      // Осталось секунд
      s = left;
      updateDuo(6, 7, s);

      // Вызываем возвратную функцию пользователя
      options.callback(d, h, m, s);

      // Планируем следующий вызов данной функции через 1 секунду
      setTimeout(tick, 1000);
    })();

    // Данная функция обновляет две цифоровые позиции за один раз
    function updateDuo(minor, major, value) {
      switchDigit(positions.eq(minor), Math.floor(value / 10) % 10);
      switchDigit(positions.eq(major), value % 10);
    }

    return this;
  };


  function init(elem, options) {
    elem.addClass('countdownHolder');

    // Создаем разметку внутри контейнера
    $.each(['Days', 'Hours', 'Minutes', 'Seconds'], function (i) {
      $('<span class="count' + this + '">').html(
        '<span class="position">\
					<span class="digit static">0</span>\
				</span>\
				<span class="position">\
					<span class="digit static">0</span>\
				</span>'
      ).appendTo(elem);

      if (this != "Seconds") {
        elem.append('<span class="countDiv countDiv' + i + '"></span>');
      }
    });

  }

  // Создаем анимированный переход между двумя цифрами
  function switchDigit(position, number) {

    var digit = position.find('.digit')

    if (digit.is(':animated')) {
      return false;
    }

    if (position.data('digit') == number) {
      // Мы уже вывели данную цифру
      return false;
    }

    position.data('digit', number);

    var replacement = $('<span>', {
      'class': 'digit',
      css: {
        top: '-2.1em',
        opacity: 0
      },
      html: number
    });

    // Класс .static добавляется, когда завершается анимация.
    // Выполнение идет более плавно.

    digit
      .before(replacement)
      .removeClass('static')
      .animate({
        top: '2.5em',
        opacity: 0
      }, 'fast', function () {
        digit.remove();
      })

    replacement
      .delay(100)
      .animate({
        top: 0,
        opacity: 1
      }, 'fast', function () {
        replacement.addClass('static');
      });
  }
})(jQuery);


$(document).ready(function () {
  var myDate = new Date();

  function returnEndDate(d, h, m) {
    myDate.setDate(myDate.getDate() + d);
    myDate.setHours(myDate.getHours() + h);
    myDate.setMinutes(myDate.getMinutes() + m);
    return myDate;
  }
  if ($.cookie("timer")) {
    var dateEnd = $.cookie("timer");
  } else {
    var dateEnd = returnEndDate(4, 0, 0);
    $.cookie("timer", dateEnd, {
      expires: 4
    });
  }


  var note = $('#note'),
    ts = new Date(dateEnd),
    newYear = true;

  if ((new Date()) > ts) {
    ts = (new Date()).getTime() + 10 * 24 * 60 * 60 * 1000;
    newYear = false;
  }

  $('#countdown').countdown({
    timestamp: ts,
    callback: function (days, hours, minutes, seconds) {

    }
  });

  $('#countdown_1').countdown({
    timestamp: ts,
    callback: function (days, hours, minutes, seconds) {

    }
  });
  $('.countDays').append('<span class="timer-title">days</span>');
  $('.countHours').append('<span class="timer-title">hours</span>');
  $('.countMinutes').append('<span class="timer-title">minutes</span>');
  $('.countSeconds').append('<span class="timer-title">seconds</span>');
  
  if ($(window).width() > 1200) {

    setTimeout(function () {
      $('.reviews-item').css({
        'max-height': $('.reviews-img').height() - 30,
      })

    }, 1000)
    $('.section_1').viewportChecker({
      classToAdd: 'visible', // Class to add to the elements when they are visible,
      classToAddForFullView: 'full-visible', // Class to add when an item is completely visible in the viewport
      offset: '100%', // The offset of the elements (let them appear earlier or later). This can also be percentage based by adding a '%' at the end
      invertBottomOffset: false, // Add the offset as a negative number to the element's bottom
      repeat: true, // Add the possibility to remove the class if the elements are not visible
      callbackFunction: function (elem, action) {
        $('.section_2').removeClass('visible');
        $('.section_1').removeClass('fixbottom');
      }
    });
    $('.section_1 .container').viewportChecker({
      classToAdd: 'visible', // Class to add to the elements when they are visible,
      classToAddForFullView: 'full-visible', // Class to add when an item is completely visible in the viewport
      offset: '0%', // The offset of the elements (let them appear earlier or later). This can also be percentage based by adding a '%' at the end
      invertBottomOffset: false, // Add the offset as a negative number to the element's bottom
      repeat: true, // Add the possibility to remove the class if the elements are not visible
      callbackFunction: function (elem, action) {
        $('.section_2').removeClass('visible');
        $('.section_1').removeClass('fixbottom');
      }
    });

    $('.section_2').viewportChecker({
      classToAdd: 'visible', // Class to add to the elements when they are visible,
      classToAddForFullView: 'full-visible', // Class to add when an item is completely visible in the viewport
      offset: '100%', // The offset of the elements (let them appear earlier or later). This can also be percentage based by adding a '%' at the end
      invertBottomOffset: false, // Add the offset as a negative number to the element's bottom
      repeat: true, // Add the possibility to remove the class if the elements are not visible
      callbackFunction: function (elem, action) {
        $('.section_1').removeClass('visible');
        $('.section_1').addClass('fixbottom');
        $('.section_2').removeClass('fixbottom');
      }
    });

    $('.section_2 .container').viewportChecker({
      classToAdd: 'visible', // Class to add to the elements when they are visible,
      classToAddForFullView: 'full-visible', // Class to add when an item is completely visible in the viewport
      offset: '0%', // The offset of the elements (let them appear earlier or later). This can also be percentage based by adding a '%' at the end
      invertBottomOffset: false, // Add the offset as a negative number to the element's bottom
      repeat: true, // Add the possibility to remove the class if the elements are not visible
      callbackFunction: function (elem, action) {
        $('.section_1').removeClass('visible');
        $('.section_1').addClass('fixbottom');
      }
    });

    $('.section_3').viewportChecker({
      classToAdd: 'visible', // Class to add to the elements when they are visible,
      classToAddForFullView: 'full-visible', // Class to add when an item is completely visible in the viewport
      offset: '100%', // The offset of the elements (let them appear earlier or later). This can also be percentage based by adding a '%' at the end
      invertBottomOffset: false, // Add the offset as a negative number to the element's bottom
      repeat: true, // Add the possibility to remove the class if the elements are not visible
      callbackFunction: function (elem, action) {
        $('.section_2').removeClass('visible');
        $('.section_2').addClass('fixbottom');
        $('.section_3').removeClass('fixbottom');
      }
    });


    $('.section_3 .container').viewportChecker({
      classToAdd: 'visible', // Class to add to the elements when they are visible,
      classToAddForFullView: 'full-visible', // Class to add when an item is completely visible in the viewport
      offset: '0%', // The offset of the elements (let them appear earlier or later). This can also be percentage based by adding a '%' at the end
      invertBottomOffset: false, // Add the offset as a negative number to the element's bottom
      repeat: true, // Add the possibility to remove the class if the elements are not visible
      callbackFunction: function (elem, action) {
        $('.section_2').removeClass('visible');
        $('.section_2').addClass('fixbottom');
      }
    });

    $('.section_4').viewportChecker({
      classToAdd: 'visible', // Class to add to the elements when they are visible,
      classToAddForFullView: 'full-visible', // Class to add when an item is completely visible in the viewport
      offset: '0%', // The offset of the elements (let them appear earlier or later). This can also be percentage based by adding a '%' at the end
      invertBottomOffset: false, // Add the offset as a negative number to the element's bottom
      repeat: true, // Add the possibility to remove the class if the elements are not visible
      callbackFunction: function (elem, action) {
        $('.section_3').removeClass('visible');
        $('.section_3').addClass('fixbottom');
      }
    });


  }
  $('.nav-button').click(function (e) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;

    $('body,html').animate({
      scrollTop: top
    }, 1500);

  });
  $(window).scroll(function () {
    return $('nav, .social-fixed').toggleClass("fixed", $(window).scrollTop() > $('.head').height());
  });
  
  
  

  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      vars[key] = value;
    });
    return vars;
  }
  $('input[name="utm_source"]').val(getUrlVars()["utm_source"]);
  $('input[name="utm_campaign"]').val(getUrlVars()["utm_campaign"]);
  $('input[name="utm_medium"]').val(getUrlVars()["utm_medium"]);
  $('input[name="utm_term"]').val(getUrlVars()["utm_term"]);
  $('input[name="utm_content"]').val(getUrlVars()["utm_content"]);
  $('input[name="click_id"]').val(getUrlVars()["aff_sub"]);
  $('input[name="affiliate_id"]').val(getUrlVars()["aff_id"]);
  $('input[name="user_agent"]').val(navigator.userAgent);
  $('input[name="page_url"]').val(window.location.hostname);

  $('input[name="ref"]').val(document.referrer);
  $.get("https://ipinfo.io", function (response) {
    $('input[name="ip_address"]').val(response.ip);
    $('input[name="city"]').val(response.city + ' | ' + response.region + ' | ' + response.country);
    $('input[name="country"]').val();
    $('input[name="region"]').val();
  }, "jsonp");

  function readCookie(name) {
    var n = name + "=";
    var cookie = document.cookie.split(';');
    for (var i = 0; i < cookie.length; i++) {
      var c = cookie[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(n) == 0) {
        return c.substring(n.length, c.length);
      }
    }
    return null;
  }
  setTimeout(function () {
    $('.gclid_field').val(readCookie('gclid'));
    if ($('.gclid_field').val() == '') {
      $('.gclid_field').val(readCookie('_gid'));
    }
  }, 2000);

  /*db/registration.php*/

  /* form valid*/
  var alertImage = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="#E2574C"/></svg>';
  var error;
  $('.submit').click(function (e) {
    e.preventDefault();
    var ref = $(this).closest('form').find('[required]');
    $(ref).each(function () {
      if ($(this).val() == '') {
        var errorfield = $(this);
        if ($(this).attr("type") == 'email') {
          var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
          if (!pattern.test($(this).val())) {
            $("input[name=email]").val('');
            $(this).addClass('error').parent('span').append('<div class="allert"><p>Enter your best e-mail</p>' + alertImage + '</div>');
            error = 1;
            $(":input.error:first").focus();
          }
        } else if ($(this).attr("type") == 'tel') {
          var patterntel = /^()[- +()0-9]{9,18}/i;
          if (!patterntel.test($(this).val())) {
            $("input[name=phone]").val('');
            $(this).addClass('error').parent('span').append('<div class="allert"><p>Enter the phone number in the format +3809999999</p>' + alertImage + '</div>');
            error = 1;
            $(":input.error:first").focus();
          }
        } else if ($(this).attr("name") == 'mess') {
          var patterntel = /^()[- +()0-9]{9,18}/i;
          if (!patterntel.test($(this).val())) {
            $("input[name=phone]").val('');
            $(this).addClass('error').parent('span').append('<div class="allert"><p>Wright your questuion</p>' + alertImage + '</div>');
            error = 1;
            $(":input.error:first").focus();
          }
        } else {
          $(this).addClass('error').parent('span').append('<div class="allert"><p>Fill in the field</p>' + alertImage + '</div>');
          error = 1;
          $(":input.error:first").focus();
        }
        return;
      } else {
        error = 0;
        $(this).addClass('error').parent('span').find('.allert').remove();
      }
    });
    if (error !== 1) {
      $(this).unbind('submit').submit();
    }
  });

  /*end form valid*/


  $('form').on('submit', function (e) {
    e.preventDefault();
    $('.submit').addClass('inactive');
    $('.submit').prop('disabled', true);
    var $form = $(this);
    var $data = $form.find('input, textarea, select');
    $.ajax({
      type: 'POST',
      url: 'db/registration.php',
      dataType: 'json',
      data: $form.serialize(),
      success: function (response) {}
    });



    setTimeout(function () {
      window.location.href = "success.html";
    }, 1000);

  });
  
});