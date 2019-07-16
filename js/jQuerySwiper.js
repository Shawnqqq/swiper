const PAGE={
    data:{
        index: 0 ,
        duration: 1000,      //动画时长
        islock: false,
        transLateX:0,     //位移距离
        itemNumber:null,  //图片数量
        itemWidth: null,  //图片长度
    },
    init:function(){
        this.clone();
        this.bind();
    },
    bind:function(){
        $('#swiper-prev').on('click',this.swiperPrev);
        $('#swiper-next').on('click',this.swiperNext);
        $('.swiper-btn-switch').on('click',this.swiperBtn);
    },
    clone:function(){
        let itemNumber = $('.swiper-item').length
        $($('.swiper-item')[0]).clone().appendTo('#swiper-list');
        $($('.swiper-item')[itemNumber-1]).clone().prependTo('#swiper-list')
        let index =PAGE.data.index; 
        let swiperItemWidth = $('#swiper-list').width()
        PAGE.data.itemNumber = itemNumber;
        PAGE.data.itemWidth = swiperItemWidth;
        PAGE.data.transLateX = -(swiperItemWidth+swiperItemWidth*index);
        PAGE.goIndex(index);
    },
    goIndex:function(index){
        let swiperDuration =PAGE.data.duration;
        let swiperWidth = PAGE.data.itemWidth;
        let swiperNumber = PAGE.data.itemNumber;
        let swipertransLateX = -(swiperWidth+swiperWidth*index);
        $('#swiper-list').animate({left:`${swipertransLateX}px`},swiperDuration,function(){
            if(index === -1){
                index = swiperNumber-1;
                $('#swiper-list').css('left',`-5120px`);
            }
            if(index === swiperNumber){
                index = 0
                $('#swiper-list').css('left',`-1024px`);
            }
            PAGE.data.index = index;
            PAGE.hightLight(index);
        })
    },
    hightLight:function(index){
        $('.swiper-btn-switch').eq(index).addClass('active').siblings().removeClass('active')
    },
    swiperPrev:function(){
        let index =PAGE.data.index;
        PAGE.goIndex(index-1); 
    },
    swiperNext:function(){
        let index =PAGE.data.index;
        PAGE.goIndex(index+1);
    },
    swiperBtn:function(e){
        let index = e.target.dataset.item-1
        PAGE.goIndex(index);
    }
}
PAGE.init()