window.onload = function() {
	var aLis = document.querySelectorAll('#nav li');
	
	var clickd = true;
	//第一次点击展开
	aLis[aLis.length-1].onclick = function() {
		//每个li旋转相应角度
		var n = 0;
		for(var i=0;i<aLis.length;i++) {
			n = i - aLis.length/2;
			if(clickd) {
				n = n*15;
			}else {
				n=360;
			}
			aLis[i].style.transform = "rotate("+n+"deg)";
		}
		clickd=!clickd;
	}
	
	//点击每个li旋转到0deg 左边的每个li旋转-15deg 右边的每个li旋转15deg(除去第一个)
	for(var i=0;i<aLis.length-1;i++) {
		aLis[i].index = i;
		aLis[i].onclick = function() {
			var leftDeg = 0;
			var rightDeg = 15;
			for(var i=this.index-1;i>=0;i--) {
				leftDeg-=15;
				aLis[i].style.transform = "rotate("+leftDeg+"deg)";
			}
			for(var i=this.index+1;i<aLis.length;i++) {
				rightDeg+=15;
				aLis[i].style.transform = "rotate("+rightDeg+"deg)";
			}
			this.style.transform = "rotate(0deg)" ;
		}
	}
}
