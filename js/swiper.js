const PAGE={
    data:{
        index:0,  //当前第几个
        duration:500,  //滑动时长
        islock:false,
        translateX:0,  //偏移量
        defaultLength: null,  //图片数量
        itemWidth:null  //图片长度
    },
    init:function(){
        this.clone();
        this.bind();
    },
    clone:function(){
        let swiperItem = document.getElementsByClassName("swiper-item");
        let swiperList = document.getElementById('swiper-list')
        let swiperFirst = swiperItem[0].cloneNode(true)
        let swiperLast = swiperItem[swiperItem.length-1].cloneNode(true);
        let index = PAGE.data.index;
        let swiperItemWidth = swiperList.offsetWidth
        PAGE.data.itemWidth = swiperItemWidth;
        PAGE.data.defaultLength =swiperItem.length
        PAGE.data.translateX = -(swiperItemWidth+swiperItemWidth*index);
        swiperList.appendChild(swiperFirst);
        swiperList.prepend(swiperLast);
        PAGE.goIndex(index);
    },
    goIndex:function(index){
        let swiperDuration = PAGE.data.duration;
        let swiperWidth = PAGE.data.itemWidth;
        let beginTranslateX = PAGE.data.translateX;
        let endTranslateX = -(swiperWidth+swiperWidth*index);
        let swiperList = document.getElementById('swiper-list');
        let islock = PAGE.data.islock;
        if(islock){
            return
        }
        PAGE.data.islock =true;
        PAGE.animateTo(beginTranslateX,endTranslateX,swiperDuration,function(value){
            swiperList.style.transform = `translateX(${value}px)`;
        },function(value){
            let swiperLength= PAGE.data.defaultLength;
            if(index === -1){
                index = swiperLength-1;
                value = -(swiperWidth +swiperWidth *index);
            }
            if(index === swiperLength){
                index = 0;
                value = -(swiperWidth +swiperWidth*index);
            }
            swiperList.style.transform = `translateX(${value}px)`;
            PAGE.data.index=index;
            PAGE.data.translateX = value;
            PAGE.data.islock=false;
            PAGE.hightLight(index);
        })
    },
    animateTo:function(begin,end,duration,changeCallback,finishCallback){
        let startTime = Date.now();
        requestAnimationFrame(function update(){
            let dateNow = Date.now();
            let time = dateNow-startTime;
            let value = PAGE.linear(time,begin,end,duration)  //求当前位移距离
            typeof changeCallback === 'function' && changeCallback(value)
            if(startTime+duration>dateNow){
                requestAnimationFrame(update)
            }else{
                typeof finishCallback === "function" && finishCallback(end)
            }
        })
    },
    linear:function(time,begin,end,duration){
        return (end-begin)*time/duration+begin;
    },
    bind:function(){
        let swiperPrev = document.getElementById('swiper-prev');
        let swiperNext = document.getElementById('swiper-next');
        swiperPrev.addEventListener('click',this.swiperPrev);
        swiperNext.addEventListener('click',this.swiperNext);
        let swiperBtn = document.getElementsByClassName('swiper-btn-switch');
        for(let i=0;i<swiperBtn.length;i++){
            swiperBtn[i].setAttribute('data-index',i)
            swiperBtn[i].addEventListener('click',this.swiperSwitch);
        }
        window,addEventListener('resize',this.swiperReset)
    },
    swiperPrev:function(){
        let index = PAGE.data.index;
        PAGE.goIndex(index-1);
    },
    swiperNext:function(){
        let index = PAGE.data.index;
        PAGE.goIndex(index+1);
    },
    swiperSwitch:function(e){
        let index =e.target.dataset.index;
        index = Number(index);
        PAGE.goIndex(index);
    },
    hightLight:function(index){
        let swiperBtn = document.getElementsByClassName('swiper-btn-switch');
        for(let i=0;i<swiperBtn.length;i++){
            swiperBtn[i].className='swiper-btn-switch';
        }
        swiperBtn[index].className = 'swiper-btn-switch active';
    },
    swiperReset:function(){
        let swiperList =document.getElementById('swiper-list');
        let swiperWidth = swiperList.offsetWidth;
        let index =PAGE.data.index;
        let translateX = -(swiperWidth +swiperWidth*index);
        PAGE.data.itemWidth = swiperWidth;
        PAGE.data.translateX = translateX;
        swiperList.style.transform= `translateX(${translateX}px)`
    }
}
PAGE.init();