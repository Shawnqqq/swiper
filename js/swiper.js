const PAGE ={
    data:{
        itemlength:5,  //图片数量
        itemImgScr:['./img/img-1.jpg','./img/img-2.jpg','./img/img-3.jpg','./img/img-4.jpg','./img/img-5.jpg'],
        itemImgWidth:[0]  //位移距离
    },
    init:function(){
        this.bind()
        this.render()
    },
    bind:function(){
        let swiperList =document.getElementById('swiper-list');
        let container =document.getElementById('container');
        window.onload=this.heightLight
        this.addEvent(container,'click','swiper-btn-left',this.leftTransform)
        this.addEvent(container,'click','swiper-btn-right',this.rightTransform)
        this.addEvent(swiperList,'click','swiper-item',this.swiperToggle)
    },
    addEvent:function(parents,active,child,callback){
        parents.addEventListener(active,function(e){
            e.target.className.indexOf(child)>= 0 && callback(e)
        })
    },
    heightLight:function(){              
        let swiperItems=document.getElementsByClassName('swiper-item'); 
        let swiperImg = PAGE.data.itemImgWidth[0] / 1024;
        for(let i=0;i<swiperItems.length;i++){
            let swiperItem = swiperItems[i]
            if(i==swiperImg){
                swiperItem.className ='swiper-item active'
            }else{
                swiperItem.className ='swiper-item'
            }
        }
    },
    render:function(){
        let imageSection=document.getElementById('image-section');
        let imageElement=PAGE.data.itemImgWidth.map(item =>{
            return `
            <ul class="swiper-img" id="swiper-img" style='transform:translateX(-${item}px)'>
            </ul>`
        }).join('')
        imageSection.innerHTML=imageElement;
        let swiperImg =document.getElementById('swiper-img');
        let itemElement=PAGE.data.itemImgScr.map(item =>{
            return`
            <li class="img-item"><img src="${item}"></li>`
        }).join('')
        swiperImg.innerHTML=itemElement;
    },
    leftTransform:function(){
        PAGE.data.itemImgWidth[0] = PAGE.data.itemImgWidth[0] -= 1024
        if(PAGE.data.itemImgWidth[0]<0){
            PAGE.data.itemImgWidth[0]=(PAGE.data.itemlength-1) * 1024 //最后一张图片位移距离
        }
        let itemImgWidth = PAGE.data.itemImgWidth[0] 
        PAGE.data.itemImgWidth[0] = itemImgWidth;
        PAGE.heightLight();
        PAGE.render();
    },
    rightTransform:function(){
        PAGE.data.itemImgWidth[0] = PAGE.data.itemImgWidth[0] += 1024
        let itemImgWidths = PAGE.data.itemImgWidth[0]
        let imglenth = PAGE.data.itemlength * 1024; //最后一张图片位移距离 
        let itemImgWidth = itemImgWidths % imglenth;  
        PAGE.data.itemImgWidth[0] = itemImgWidth
        PAGE.heightLight();
        PAGE.render();
    },
    swiperToggle:function(e){
        let item = e.target.dataset.item-1
        PAGE.data.itemImgWidth[0] = item*1024
        PAGE.heightLight();
        PAGE.render();
    },
}
PAGE.init()