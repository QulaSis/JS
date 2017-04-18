window.onload = function() {
	var tabs = document.querySelectorAll('#btn li');
	var tabsLine = document.querySelector('#btn span');
	
	var tabsBgImg = document.querySelectorAll('#imgWrap li');
	var tabsImg = document.querySelectorAll('#imgWrap img');
	var tabsSpan = document.querySelectorAll('#imgWrap span');
	
	var footer = document.querySelector('.footer')
	var n = 0;
	var timer = null;
	
	for(var i=0;i<tabs.length;i++) {
		tabs[i].index = i;
		tabsImg[i].t = tabsImg[i].offsetTop;
		tabs[i].onmouseover = function() {
			n = this.index;
			change();
		}
	}
	function change() {
		for(var i=0;i<tabs.length;i++) {
//			tabsBgImg[i].style.opacity = 0;
//			tabsImg[i].style.opacity = 0;
//			tabsSpan[i].style.opacity = 0;
			clearInterval(tabsImg[i].timer);
			clearInterval(tabsSpan[i].timer);
			
			move(tabsBgImg[i],{'opacity':0},500,'linear');
			
			changeStyle(tabsImg[i],'opacity',0);
			changeStyle(tabsImg[i],'top',tabsImg[i].t+'px');
			changeStyle(tabsSpan[i],'opacity',0);
		}
//		tabsLine.style.left = this.offsetLeft+'px'; //线条运动
//		tabsBgImg[n].style.opacity = 1;
//		tabsImg[n].style.opacity = 1;
//		tabsImg[n].style.top=tabsImg[n].t+30+'px';
//		tabsSpan[n].style.opacity = 1;
//		changeStyle(tabsLine,'left',this.offsetLeft+'px')
//		changeStyle(tabsBgImg[n],'opacity',1);
//		changeStyle(tabsImg[n],'opacity',1);
//		changeStyle(tabsImg[n],'top',tabsImg[n].t+30+'px');
//		changeStyle(tabsSpan[n],'opacity',1);
		
		move(tabsLine,{'left':n*65},200,'linear');
		move(tabsBgImg[n],{'opacity':1},500,'linear',function() {
			move(tabsImg[n],{'opacity':1,'top':tabsImg[n].t+30},500,'linear',function() {
				move(tabsSpan[n],{'opacity':1},500,'linear');
			});
		});
		
	}
	function changeStyle(ele,attr,value) {
		ele.style[attr]=value;
	}
	function autoPlay() {
		timer = setInterval(function() {
			n++;
			if(n == tabsBgImg.length) {
				n=0;
			}
			tab();
		},5000)
	}
	autoPlay();
	
	tab()
	function tab() {

		for(var i=0; i<tabsBgImg.length;i++) {
			clearInterval(tabsImg[i].timer);
			clearInterval(tabsSpan[i].timer)
			
//			tabsBgImg[i].style.opacity = 0;
			move(tabsBgImg[i],{'opacity':0},500,'linear');
			tabsImg[i].style.opacity = 0;
			tabsImg[i].style.top = tabsImg[i].t + 'px';
			tabsSpan[i].style.opacity = 0;
		}
		tabsBgImg[n].style.opacity = 1;
		tabsImg[n].style.opacity = 1;
		move(footer,{'bottom':-90},200,'linear');
		move(tabsLine,{'left':n*65},200,'linear');
		move(tabsBgImg[n],{'opacity':1},500,'linear',function() {
			move(tabsImg[n],{'opacity':1,'top':tabsImg[n].t+30},500,'linear', function() {
				move(tabsSpan[n],{'opacity':1},500,'linear');
			})
		});
		
	}
	//页脚
	scroll(document,function() {
		move(footer,{'bottom':0},200,'linear');
	},function() {
		move(footer,{'bottom':-90},200,'linear');
	})
	function scroll(obj,callBackUp,callBackDown) {
		obj.onmousewheel = fn;
		obj.addEventListener('DOMMouseScroll',fn);
		
		function fn(ev) {
			if(ev.wheelDelta==120||ev.detail==-3) {
				callBackUp.call(obj,ev);
			}else {
				callBackDown.call(obj,ev);
			}
			ev.preventDefault();
			return false;
		}
	}
	
	//更多
	var more = document.getElementById('more');
	var nav  = document.getElementById('nav');
	var span = document.querySelector('#nav span');
	var li = document.querySelectorAll('#nav li');
	var index ;
	for(var i=0;i<li.length;i++) {
		li[i].onmouseover = function() {
			span.style.display = 'block';
			move(span,{'top':this.offsetTop+6},200,'linear');
		}
	}
	more.onmouseenter = nav.onmouseenter = function() {
//		nav.style.right = 0;
		move(nav,{'right':0},200,'linear');
		
	}
	more.onmouseleave = nav.onmouseleave = function() {
		move(nav,{'right':-162},200,'linear');
		span.style.display = 'none';
		span.style.top = '108px';
	}
}


