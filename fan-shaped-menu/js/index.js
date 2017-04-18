/**
 * Created by Administrator on 2016/9/8.
 */
    //扇形效果
    var  nav = document.getElementById("nav");
    var  lis = document.querySelectorAll("li");

    //给封面添加点击事件
    var clicked = true;   //判断是否第一次点击
    lis[lis.length-1].onclick = function(){
        /*
         *   i ： 0   1   2 ....  11
         *   n : -6  -5  -4 ...   5
         * 度数 ；-90  -75 -60 ... 75
         */

        for(var i=0;i<lis.length;i++){
            //拿i的值减去lis/2就能算出n的值  然后拿n的再乘以15就能算出对应度数
            var n = i-lis.length/2;

            if(clicked){
                n = n*15;
            }else{
                n = 360;
            }

            lis[i].style.transform = 'rotate('+n+'deg)';
        }
        clicked = !clicked;  //循环点击
    };

    //给每个li添加点击事件
    for(var i=0;i<lis.length-1;i++){
        lis[i].index = i;
        lis[i].onclick = function(){
            /*
             *点击时候要做的事
             * 1，点击的那个img要转到0deg
             * 2，点击img左边的依次减去15deg
             * 3, 点击img右边的依次加上15deg（紧挨着的那个img要加上deg）
             */

            var leftDeg = 0;    //左边初始值的度数
            var rightDeg = 15;  //右边初始值的度数

            //点击图片旋转
            this.style.transform = 'rotate(0deg)';

            //左边图片旋转
            for(var i=this.index-1;i>=0;i--){
                leftDeg -= 15;
                lis[i].style.transform = 'rotate('+leftDeg+'deg)';
            }

            //右边图片旋转
            for(var i=this.index+1;i<lis.length;i++){
                rightDeg += 15;
                lis[i].style.transform = 'rotate('+rightDeg+'deg)';
            }
        };
    }