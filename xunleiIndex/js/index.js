/*
 * 1.图片的轮播
 * 2.图标跟随图片轮播
 * 3.文字出现
 * 4.版本按钮出现
 * 5.更多
 * 6.页脚
 * */
window.onload = function() {
	
	var tabs = document.querySelectorAll('#btn li'); //按钮下li
	var tabsLine = document.querySelector('#btn span'); //按钮下的线条span
	
	var lis = document.querySelectorAll('#imgWrap li'); //获取图片
	var img = document.querySelectorAll('#imgWrap img'); //获取文字
	var span = document.querySelectorAll('#imgWrap span'); //获取版本按钮
	
	var n=0;
	var timer = null;
	/*
	 * 鼠标移上去效果
	 * 1.图标下的线条动
	 * 2.图片动
	 * 3.文字下移
	 * 4.版本按钮出现
	 */
	
//	for(var i=0;i<tabs.length;i++) {
//		tabs[i].index = i;
//		img[i].t = img[i].offsetTop;
//		tabs[i].onmouseover = function() {
//			for(var i=0;i<lis.length;i++) {
//				lis[i].style.opacity = 0;
//				img[i].style.opacity = 0;
//				span[i].style.opacity = 0;
//			}
//			lis[this.index].style.opacity = 1;
//			tabsLine.style.left = this.offsetLeft + 'px';
//			img[this.index].style.opacity = 1;
//			img[this.index].style.top = img[this.index].t + 30 + 'px';
//			span[this.index].style.opacity = 1;
//		}
//	}
	
	for(var i=0;i<tabs.length;i++) {
		tabs[i].index = i;
		img[i].t = img[i].offsetTop;
		tabs[i].onmouseover = function() {
			clearInterval(timer);
			n = this.index;
			tab();
		}
		tabs[i].onmouseout = function() {
			autoPlay();
		}
	}
	
	function autoPlay() {
		timer = setInterval(function() {
			n++;
			if(n==tabs.length) {
				n=0;
			}
			tab();
		},3000);
	}
	autoPlay();
	
	tab();
	
	function tab() {

		for(var i=0;i<lis.length;i++) {
			clearInterval(img[i].timer);
			clearInterval(span[i].timer);
			
//			lis[i].style.opacity = 0;
			move(lis[i],{'opacity':0},500,'linear');
//			img[i].style.opacity = 0;
			move(img[i],{'opacity':0},500,'linear');
//			span[i].style.opacity = 0;
			move(span[i],{'opacity':0},500,'linear');
		}
//		lis[n].style.opacity = 1;
		move(lis[n],{'opacity':1},500,'linear',function() {
			move(img[n],{'opacity':1,'top':img[n].t + 30},500,'linear',function() {
				move(span[n],{'opacity':1},500,'linear');
			});
		});
//		img[n].style.opacity = 1;
//		img[n].style.top = img[n].t + 30 + 'px';
//		span[n].style.opacity = 1;
		tabsLine.style.left = tabs[n].offsetLeft + 'px';
	}
	
	//页脚
	var footer = document.querySelector('.footer');
	scroll(document,function() {
		move(footer,{'bottom':-90},200,'linear');
	},function() {
		move(footer,{'bottom':0},200,'linear');
	})
	function scroll(obj,callBackUp,callBackDown) {
		obj.onmousewheel = fn;
		obj.addEventListener('DOMMouseScoll',fn);
		
		function fn(ev) {
			if(ev.wheelDelta == 120 || ev.detail == -3) {
				callBackUp.call(obj,ev);
			}else {
				callBackDown.call(obj,ev);
			}
		}
	}
	
	//更多
	var more = document.getElementById('more');
	var nav = document.getElementById('nav');
	
	var subLis = document.querySelectorAll('#nav li');
	var subSpan = document.querySelector('#nav span');
	
	more.onmouseenter = nav.onmouseenter = function() {
//		nav.style.right = 0;
		move(nav,{'right':0},200,'linear');
	}
	more.onmouseleave = nav.onmouseleave = function() {
//		nav.style.right = -162 + 'px'
		move(nav,{'right':-162},200,'linear');
		subSpan.style.display = 'none';
		subSpan.style.top = '108px'
	}
	
	for(var i=0;i<subLis.length;i++) {
		subLis[i].onmouseover = function() {
			subSpan.style.display = 'block';
			move(subSpan,{'top':this.offsetTop+6},200,'linear');
		}
	}
	
}