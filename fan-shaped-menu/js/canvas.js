/**
 * Created by Administrator on 2016/9/9.
 */

//canvas气泡效果
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight+200;
var ctx = canvas.getContext('2d');
var balls = [];
var colors = ['#69d2d7','#a7dbd8','#e0e4cc','#69d2d7','#fa6900','#ff4e50','#f9d423'];
var timer;

/*
 * 一个圆  半径 颜色 位置 速度都不同
 * var ball={
 * x:x轴的位置
 * y:y轴的位置
 * r:圆的半径
 * vx:x轴的速度
 * vy:y轴的速度
 * corlor:颜色
 * }
 *
 * 角度转弧度
 *   角度*π/180
 *   360*π/180
 */

//在画布上画圆
function draw(ball){
    ctx.beginPath();   //开始路径
    ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);  //arc(x轴的位置,y轴的位置,半径,起始弧度，结束弧度)
    ctx.fillStyle = ball.corlor;  //给原填充颜色
    ctx.globalCompositeOperation = 'lighter';  //合成
    ctx.fill();    //
}

//随机函数  取x到y之间的随机数：Math.round(Math.random()*(y-x)+x)
function random(min,max){
    return Math.round(Math.random()*(max-min)+min);
}

//添加鼠标移动事件
var on = true;   //用来让鼠标移动的时候定时器也可以跑
canvas.onmousemove = function(ev){
    //在移动的时候创建两个圆
    for(var i=0;i<2;i++){
        var ball = {
            x:random(-5,5)+ev.clientX,
            y:random(-5,5)+ev.clientY+window.pageYOffset,
            r:random(10,45),
            xv:Math.random()-0.5,
            yv:Math.random()-0.5,
            corlor:colors[random(0,colors.length-1)]   //随机颜色
        };

        balls.push(ball);
        if(balls.length > 300){
            balls.shift();  //删除
        }
        //console.log(balls.length);
    }

    //让定时器只开启一次
    if(on){
        clearInterval(timer);
        timer = setInterval(drallBall,30);
        on =false;
    }

    function drallBall(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(var i=0;i<balls.length;i++){
            //需要在画的时候八球的位置半径全都改变，这样才能形象看到球在动
            balls[i].x += balls[i].xv*8;   //通过速度改变x轴位置
            balls[i].y += balls[i].yv*8;
            balls[i].r = balls[i].r*0.94;  //改变求的半径

            balls[i].index = i;  //添加这个索引为了在下面找到它并删除

            //如果小球的半径小雨1，就不让Canvas在画
            if(balls[i].r<1){
                balls.splice(balls[i].index,1);
                continue;   //如果小球已经被删除 下面的代码就不用执行
            }

            draw(balls[i]);

            //如果 balls的数组里面没有东西，酒吧定时器清除
            if(!balls.length){
                clearInterval(timer);
                on = true;  //on的值预定时期保持一致
            }
        }
    }
};