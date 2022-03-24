
 let player = new Vue({
     el:'#player',
     data:{
         query:'',
         musicList:[],
         musicUrl:'',
         imgUrl:'',
         hotComments:[],
         isPlaying: false,
         isShow:false,
         mvUrl:''
     },
     methods: {
         searchMusic:function() {
             let that = this;
             axios.get('https://autumnfish.cn/search?keywords=' + this.query)
             .then(function(response){
                that.musicList = response.data.result.songs;
             }, function(err) {
                 console.log(err);
             })
         },
         playMusic:function(musicId) {
             let that = this;
            axios.get('https://autumnfish.cn/song/url?id='+musicId)
            .then(function(response) {
                that.musicUrl = response.data.data[0].url;
            }, function(err) {
                alert('暂时无法播放');
            });

            axios.get('https://autumnfish.cn/song/detail?ids='+musicId)
            .then(function(response) {
                that.imgUrl = response.data.songs[0].al.picUrl;
            }, function(err) {
                console.log(err);
            });

            axios.get('https://autumnfish.cn/comment/hot?type=0&id='+musicId)
            .then(function(response) {
                that.hotComments = response.data.hotComments;
            }, function(err) {})
         },
         play:function() {
            this.isPlaying = true;
         },
         pause:function() {
            this.isPlaying = false;
         },
         playMV:function(mvid) {
            let that = this;
            axios.get('https://autumnfish.cn/mv/url?id='+mvid)
            .then(function(response) {
                that.isShow = true;
                that.mvUrl = response.data.data.url;
                this.isPlaying = false;
                let audio = document.querySelector('audio');
                audio.pause();
            }, 
            function(err) { alert('看不了')},
            );
         },
         hide:function() {
             this.isShow = false;
             this.mvUrl='';
         }
     },
 })