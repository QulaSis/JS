window.onload=function(){
	var tabs=document.querySelectorAll('#btn li');		//下边的按钮
	var tabLine=document.querySelector('#btn span');	//下边的按钮
	
	var lis=document.querySelectorAll("#imgWrap li");			//所有的图片
	var texts=document.querySelectorAll("#imgWrap img");		//所有的文字
	var versions=document.querySelectorAll("#imgWrap span");	//所有的版本按钮
	
	var n=0;		//对应每一个tab的索引值
	
	var tabWidth=tabs[0].offsetWidth;		//存一个tab的宽度，为了在运动线的时候，能够有一个正确的值
	
	for(var i=0;i<tabs.length;i++){
		tabs[i].index=i;	//给每一个标签添加一个索引值
		texts[i].t=texts[i].offsetTop;		//一上来的时候，先把它们默认的top值存一下
		tabs[i].onmouseover=function(){
			/*
			 * 鼠标移入的时候需要做的事情
			 * 1、tab对应的线条要运动
			 * 2、图片切换
			 * 		当前图片透明度变为1
			 * 3、文字往下运动（上面的运动走完了）
			 * 		位置移动，往下走30px
			 * 		同时透明度变为1
			 * 4、版本按钮显示（上面的运动走完了）
			 * 		透明度变为1
			 */
			
			
			n=this.index;		//让n的值与tab的索引对应起来	
			tab();
			
			
			/*for(var i=0;i<tabs.length;i++){
				//把所有的图片透明度设为0
				//lis[i].style.opacity=0;
				
				move(lis[i],{"opacity":0},500,'linear');
				
				texts[i].style.opacity=0;
				versions[i].style.opacity=0;
				
			}
			
			//move();
			
			move(tabLine,{"left":this.offsetLeft},200,'linear');			//让线条走到对应的位置
			
			//让大图切换
			move(lis[this.index],{"opacity":1},500,'linear',function(){
				//大图运动完了，开始运动文字
				move(texts[this.index],{"opacity":1,"top":texts[this.index].t+30},500,'linear');
			});
			
			versions[this.index].style.opacity=1;
			texts[this.index].style.opacity=1;								//让当前文字的透明度变为1
			texts[this.index].style.top=texts[this.index].t+30+'px';		//让当前文字的透明度变为1
			//lis[this.index].style.opacity=1;								//让当前的图片透明度变为1
			
			//tabLine.style.left=this.offsetLeft+'px';*/						
		};
		
		function tab(){
			//用来让所有的运动都回到最初的状态
			for(var i=0;i<tabs.length;i++){
				//把所有的图片透明度设为0
				//lis[i].style.opacity=0;
				
				clearInterval(texts[i].timer);
				clearInterval(versions[i].timer);
				
				move(lis[i],{"opacity":0},500,'linear');	//所有图片透明度先回到0
				
				texts[i].style.opacity=0;					//所有的文字透明度都回到0
				texts[i].style.top=texts[i].t+'px';			//让所有的文字的位置都回到最初的状态
				versions[i].style.opacity=0;				//让所有的版本按钮透明度都回到0
				
			}
			
			move(tabLine,{"left":n*65},200,'linear');
			
			//move(tabLine,{"left":this.offsetLeft},200,'linear');			//让线条走到对应的位置
			
			//让大图切换
			move(lis[n],{"opacity":1},500,'linear',function(){
				//大图运动完了，开始运动文字
				move(texts[n],{"opacity":1,"top":texts[n].t+30},500,'linear',function(){
					//文字运动走完了，开始运动版本按钮
					move(versions[n],{"opacity":1},500,'linear');
				});
			});
			
			//versions[n].style.opacity=1;
			//texts[n].style.opacity=1;								//让当前文字的透明度变为1
			//texts[n].style.top=texts[n].t+30+'px';				//让当前文字的透明度变为1
		}
		
	}
};
