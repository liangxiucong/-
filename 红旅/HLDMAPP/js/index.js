$(function(){
//    1.点击菜单的时候，主页往右移动，左侧菜单也往右移动
//    2.获取点击菜单这个元素
//    3.添加点击事件
//    4.把主页往右移动200px,同时显示遮罩层
//    5.左侧菜单往右移动200px
//    6.点击遮罩层的任意位置，让左侧菜单往左移动200px
//    7.主页往左移动200px,让遮罩层隐藏

    //主页左侧的菜单
    var menu=$('.icon-menu');
    //点击主页菜单后显示出来的左侧菜单
    var leftMenu=$('.left-menu');
    //获取主页容器
    var layout=$('.layout');
    var mask=$('.mask');
    //var api = 'http://127.0.0.1:9091/api/gettopics'

//    给菜单添加点击事件
    menu.on('click',function(){
        layout.css('transform','translateX(200px)');
        mask.addClass('show');
        leftMenu.css('transform','translateX(0px)');
    });
    //点击遮罩层，左侧菜单回到-200px位置，主页容器回到0px，遮罩层隐藏
    mask.on('click',function(){
        leftMenu.css('transform','translateX(-200px)');
        layout.css('transform','translateX(0px)');
        mask.removeClass('show');
    });

   //1.请求轮播图的API
   // 2.将请求到的轮播图数据，给模板去生成html
    //3.把生成好的html渲染到轮播图每一项的容器里面
    getSlide();
    function getSlide(){
        //请求轮播图api
        //发送一个请求
        //参数：第一个是请求的API地址，第二个success是请求成功的回调函数
        $.ajax({
            url:'http://127.0.0.1:9091/api/getlunbo',
            success:function(data){

                //如果执行了success的回调函数，说明请求成功
                //将请求回来的数组包到一个对象的list属性身上
                data={'list':data};
            //    给模板生成html
                //调用template方法，第一个参数是模板的id,第二个参数是数据
                var html=template('slideTmp',data);
                //console.log(html);
                //把html放到carousel-inner容器中
                //注意：如果直接替换里面的每一项轮播，可能会出现轮播图看不见
                $('.carousel-inner').html(html);
                //给轮播项的每一项添加一个active类名
                //获取给轮播项的第一张轮播图
                $('.carousel-inner .item').eq(0).addClass('active');
            }
        })
    }
    //1.实现轮播图的滑动
    //当手指从左往右滑动的时候，轮播图要切换到上一张
    //档手指从右往左滑动的时候，轮播图要切换下一张
    //添加滑动事件
    //获取滑动开始的位置
    //获取滑动结束的位置
    //用滑动结束的位置-开始的位置=滑动的距离
    //通过滑动的距离判断，是从左往右还是从右往左
    //从左往右滑动的时候，轮播图要切换到上一张
    //从右往左滑动的时候，轮播图要切换到下一张
    //获取轮播图容器
    var slide=$('#slide');
//    给轮播图容器添加滑动事件
//    滑动开始的位置
    var startX=0;
    //滑动结束的位置
var endX=0;
    //给轮播图添加滑动开始事件
    slide.on('touchstart',function(e){
        startX= e.originalEvent.touches[0].clientX;
    });
    //给轮播图添加滑动结束事件
slide.on('touchend',function(e){
    endX= e.originalEvent.changedTouches[0].clientX;
    //如果滑动的距离是负值，表示是从右往左滑
    //滑动的距离是正值，表示是从左往右滑
    if(endX-startX>0){
        //正值 表示是从左往右滑 切换到上一张
        //切换到上一张 调用轮播图的carousel("prev")
        $('.carousel').carousel('prev');
    }else{
        // 负值 表示是从右往左滑 切换到下一张
        // 切换到下一张 调用轮播图的 carousel("next")
        $('.carousel').carousel('next');
    }
});

    var tabTitle=$('#cartoon>.nav-tabs>li>a');
    tabTitle.on('click',function(){
        getCartoonList($(this).data('type'),$(this).attr('href'));
    });
    getCartoonList(1,'#home');
    //获取动漫列表的函数
    function getCartoonList(type,href){
        $.ajax({
            url:'http://127.0.0.1:9091/api/gethometab/'+type,
            success:function(data){
                var html=template('cartoonListTmp',{
                    'list':data
                });
                $(href).html(html);
            }
        })
    }
});

