"use strict";$(function(){var n=getCookie("username");n?($(".info .user>span").html(""+n),$(".logout1").addClass("logout"),$(".logout1 ul li").eq(5).click(function(){removeCookie("username"),$(".logout1").removeClass("logout"),location.reload()})):$(".login").click(function(){location.href="./login.html"});var t=localStorage.getItem("data");if(Boolean(t)){$(".empty").css({display:"none"}),$(".product").css({display:"block"});var o=(t=JSON.parse(t)).map(function(n,t){return n.id});o=o.join(","),$.ajax({type:"post",url:"/nav",data:{id:o},dataType:"json",success:function(l){200===l.status&&function(){for(var a=JSON.parse(localStorage.getItem("data")),i=l.data,n=i.length,e=0,c=0,t=function(t){var n=a.findIndex(function(n){return n.id==i[t].id});e+=a[n].num,c+=a[n].num*i[t].price;var o=$("\n                        <li>\n                            <img src="+i[t].imgpath+' alt="">\n                            <div>\n                                <h4>'+i[t].name+"</h4>\n                                <p>"+i[t].introduce+'</p>\n                                <p class="price">\n                                    <span>￥'+i[t].price+"</span>× <span>"+a[n].num+"</span>\n                                </p>\n                            </div>\n                        </li>\n                        ");$(".product ul").append(o)},o=0;o<n;o++)t(o);$(".totalPrice span").text(e),$(".totalPrice i").text("￥"+c)}()}})}else $(".empty").css({display:"block"}),$(".product").css({display:"none"});$(".total button").click(function(){location.href="./shoppingcart.html"}),$(".shop").click(function(){location.href="./shoppingcart.html"})});