jQuery.cookie=function(t,e,i){if("undefined"==typeof e){var n=null;if(document.cookie&&""!=document.cookie)for(var s=document.cookie.split(";"),a=0;a<s.length;a++){var o=jQuery.trim(s[a]);if(o.substring(0,t.length+1)==t+"="){n=decodeURIComponent(o.substring(t.length+1));break}}return n}i=i||{},null===e&&(e="",i.expires=-1);var l="";if(i.expires&&("number"==typeof i.expires||i.expires.toUTCString)){var r;"number"==typeof i.expires?(r=new Date,r.setTime(r.getTime()+24*i.expires*60*60*1e3)):r=i.expires,l="; expires="+r.toUTCString()}var c=i.path?"; path="+i.path:"",u=i.domain?"; domain="+i.domain:"",p=i.secure?"; secure":"";document.cookie=[t,"=",encodeURIComponent(e),l,c,u,p].join("")},function(t){function e(e,i){e.addClass("countdownHolder"),t.each(["Days","Hours","Minutes","Seconds"],function(i){t('<span class="count'+this+'">').html('<span class="position">\t\t\t\t\t<span class="digit static">0</span>\t\t\t\t</span>\t\t\t\t<span class="position">\t\t\t\t\t<span class="digit static">0</span>\t\t\t\t</span>').appendTo(e),"Seconds"!=this&&e.append('<span class="countDiv countDiv'+i+'"></span>')})}function i(e,i){var n=e.find(".digit");if(n.is(":animated"))return!1;if(e.data("digit")==i)return!1;e.data("digit",i);var s=t("<span>",{"class":"digit",css:{top:"-2.1em",opacity:0},html:i});n.before(s).removeClass("static").animate({top:"2.5em",opacity:0},"fast",function(){n.remove()}),s.delay(100).animate({top:0,opacity:1},"fast",function(){s.addClass("static")})}var n=86400,s=3600,a=60;t.fn.countdown=function(o){function l(t,e,n){i(f.eq(t),Math.floor(n/10)%10),i(f.eq(e),n%10)}var r,c,u,p,d,f,m=t.extend({callback:function(){},timestamp:0},o);return e(this,m),f=this.find(".position"),function v(){r=Math.floor((m.timestamp-new Date)/1e3),r<0&&(r=0),c=Math.floor(r/n),l(0,1,c),r-=c*n,u=Math.floor(r/s),l(2,3,u),r-=u*s,p=Math.floor(r/a),l(4,5,p),r-=p*a,d=r,l(6,7,d),m.callback(c,u,p,d),setTimeout(v,1e3)}(),this}}(jQuery),$(document).ready(function(){function t(t,e,i){return n.setDate(n.getDate()+t),n.setHours(n.getHours()+e),n.setMinutes(n.getMinutes()+i),n}function e(){var t={};window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(e,i,n){t[i]=n});return t}function i(t){for(var e=t+"=",i=document.cookie.split(";"),n=0;n<i.length;n++){for(var s=i[n];" "==s.charAt(0);)s=s.substring(1,s.length);if(0==s.indexOf(e))return s.substring(e.length,s.length)}return null}var n=new Date;if($.cookie("timer"))var s=$.cookie("timer");else{var s=t(4,0,0);$.cookie("timer",s,{expires:4})}var a=($("#note"),new Date(s)),o=!0;new Date>a&&(a=(new Date).getTime()+864e6,o=!1),$("#countdown").countdown({timestamp:a,callback:function(t,e,i,n){}}),$("#countdown_1").countdown({timestamp:a,callback:function(t,e,i,n){}}),$(".countDays").append('<span class="timer-title">days</span>'),$(".countHours").append('<span class="timer-title">hours</span>'),$(".countMinutes").append('<span class="timer-title">minutes</span>'),$(".countSeconds").append('<span class="timer-title">seconds</span>'),$(window).width()>1200&&(setTimeout(function(){$(".reviews-item").css({"max-height":$(".reviews-img").height()-30})},1e3),$(".section_1").viewportChecker({classToAdd:"visible",classToAddForFullView:"full-visible",offset:"100%",invertBottomOffset:!1,repeat:!0,callbackFunction:function(t,e){$(".section_2").removeClass("visible"),$(".section_1").removeClass("fixbottom")}}),$(".section_1 .container").viewportChecker({classToAdd:"visible",classToAddForFullView:"full-visible",offset:"0%",invertBottomOffset:!1,repeat:!0,callbackFunction:function(t,e){$(".section_2").removeClass("visible"),$(".section_1").removeClass("fixbottom")}}),$(".section_2").viewportChecker({classToAdd:"visible",classToAddForFullView:"full-visible",offset:"100%",invertBottomOffset:!1,repeat:!0,callbackFunction:function(t,e){$(".section_1").removeClass("visible"),$(".section_1").addClass("fixbottom"),$(".section_2").removeClass("fixbottom")}}),$(".section_2 .container").viewportChecker({classToAdd:"visible",classToAddForFullView:"full-visible",offset:"0%",invertBottomOffset:!1,repeat:!0,callbackFunction:function(t,e){$(".section_1").removeClass("visible"),$(".section_1").addClass("fixbottom")}}),$(".section_3").viewportChecker({classToAdd:"visible",classToAddForFullView:"full-visible",offset:"100%",invertBottomOffset:!1,repeat:!0,callbackFunction:function(t,e){$(".section_2").removeClass("visible"),$(".section_2").addClass("fixbottom"),$(".section_3").removeClass("fixbottom")}}),$(".section_3 .container").viewportChecker({classToAdd:"visible",classToAddForFullView:"full-visible",offset:"0%",invertBottomOffset:!1,repeat:!0,callbackFunction:function(t,e){$(".section_2").removeClass("visible"),$(".section_2").addClass("fixbottom")}}),$(".section_4").viewportChecker({classToAdd:"visible",classToAddForFullView:"full-visible",offset:"0%",invertBottomOffset:!1,repeat:!0,callbackFunction:function(t,e){$(".section_3").removeClass("visible"),$(".section_3").addClass("fixbottom")}})),$(".nav-button").click(function(t){event.preventDefault();var e=$(this).attr("href"),i=$(e).offset().top;$("body,html").animate({scrollTop:i},1500)}),$(window).scroll(function(){return $("nav, .social-fixed").toggleClass("fixed",$(window).scrollTop()>$(".head").height())}),$('input[name="utm_source"]').val(e().utm_source),$('input[name="utm_campaign"]').val(e().utm_campaign),$('input[name="utm_medium"]').val(e().utm_medium),$('input[name="utm_term"]').val(e().utm_term),$('input[name="utm_content"]').val(e().utm_content),$('input[name="click_id"]').val(e().aff_sub),$('input[name="affiliate_id"]').val(e().aff_id),$('input[name="user_agent"]').val(navigator.userAgent),$('input[name="page_url"]').val(window.location.hostname),$('input[name="ref"]').val(document.referrer),$.get("https://ipinfo.io",function(t){$('input[name="ip_address"]').val(t.ip),$('input[name="city"]').val(t.city+" | "+t.region+" | "+t.country),$('input[name="country"]').val(),$('input[name="region"]').val()},"jsonp"),setTimeout(function(){$(".gclid_field").val(i("gclid")),""==$(".gclid_field").val()&&$(".gclid_field").val(i("_gid"))},2e3);var l,r='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="#E2574C"/></svg>';$(".submit").click(function(t){t.preventDefault();var e=$(this).closest("form").find("[required]");$(e).each(function(){if(""!=$(this).val())l=0,$(this).addClass("error").parent("span").find(".allert").remove();else{$(this);if("email"==$(this).attr("type")){var t=/^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;t.test($(this).val())||($("input[name=email]").val(""),$(this).addClass("error").parent("span").append('<div class="allert"><p>Enter your best e-mail</p>'+r+"</div>"),l=1,$(":input.error:first").focus())}else if("tel"==$(this).attr("type")){var e=/^()[- +()0-9]{9,18}/i;e.test($(this).val())||($("input[name=phone]").val(""),$(this).addClass("error").parent("span").append('<div class="allert"><p>Enter the phone number in the format +3809999999</p>'+r+"</div>"),l=1,$(":input.error:first").focus())}else if("mess"==$(this).attr("name")){var e=/^()[- +()0-9]{9,18}/i;e.test($(this).val())||($("input[name=phone]").val(""),$(this).addClass("error").parent("span").append('<div class="allert"><p>Wright your questuion</p>'+r+"</div>"),l=1,$(":input.error:first").focus())}else $(this).addClass("error").parent("span").append('<div class="allert"><p>Fill in the field</p>'+r+"</div>"),l=1,$(":input.error:first").focus()}}),1!==l&&$(this).unbind("submit").submit()}),$("form").on("submit",function(t){t.preventDefault(),$(".submit").addClass("inactive"),$(".submit").prop("disabled",!0);var e=$(this);e.find("input, textarea, select");$.ajax({type:"POST",url:"db/registration.php",dataType:"json",data:e.serialize(),success:function(t){}}),setTimeout(function(){window.location.href="success.html"},1e3)})});