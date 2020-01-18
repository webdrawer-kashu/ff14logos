const vm = new Vue({
  el: '#app',
  data: {
    /*search_list: [
        { name: '領収書を準備する',isGet: true},
        { name: 'Vue.jsハンズオンの資料を作る',isGet: false},
        { name: '参加者の人数を確認する',isGet: false},
        { name: 'ピザを注文する',isGet: false},
    ],*/
    search_list: [],
    sort_list: {},
    isAtt: false,
  },
  methods: { 
    attOpen: function(){
      this.isAtt = !this.isAtt
    },
	  toggle: function(index){ 
	    this.search_list[index].isGet = !this.search_list[index].isGet;

      /*素材を減らす処理
        クリックした要素の素材を取得
        ソート配列から上記をへらす
      */
      var clickItem = this.search_list[index];
      var clickItemNum = clickItem.materialNum;
      //console.log(clickItemNum)
      for(var l =1; l < clickItemNum + 1; l++){
        var cutItemList = eval("this.search_list[" + index + "]." + "material" + String(l));
        
        if(this.search_list[index].isGet){
          Vue.set(this.sort_list, Object.keys(cutItemList), this.sort_list[Object.keys(cutItemList)[0]] - cutItemList[Object.keys(cutItemList)[0]])
        }else {
          Vue.set(this.sort_list, Object.keys(cutItemList), this.sort_list[Object.keys(cutItemList)[0]] + cutItemList[Object.keys(cutItemList)[0]])
        }

        //console.log(cutItemList[Object.keys(cutItemList)[0]])
      }
      this.saveList();
    },
    saveList: function(){
      localStorage.setItem('logos_list', JSON.stringify(this.search_list));
      localStorage.setItem('logos_sort_list', JSON.stringify(this.sort_list));
    },
    loadList: function(){
      this.search_list = JSON.parse( localStorage.getItem('logos_list'));
      this.sort_list = JSON.parse( localStorage.getItem('logos_sort_list'));
      //console.log(this.sort_list.length);
      if( !this.search_list || this.search_list === null ||
      !this.sortList || this.sort_list === null){
          search_list = []
          this.sort_list = {}
          axios.get("data.json").then(response => {this.search_list = response.data.action
          this.setJson()
          this.sortList()
        })

      }/*else if( !this.sortList || this.sort_list === null) {
        this.sort_list = {}
        this.sortList()
      }*/else {
      }
    },
    setJson: function(){
        for(var i=0; i < this.search_list.length ;i++){
            //this.search_list[i]["isGet"] = Boolean(false);
            //this.search_list[i] = Object.assign({}, this.search_list[i], {e, isGet: false})
            //this.search_list.$set(this.search_list[i], 'b', 2)
            Vue.set(this.search_list[i], 'isGet', false)
        }
        //console.log(this.search_list[0].name);
        //return this.search_list;
    },
    sortList: function(){
      //console.log(this.sort_list)
      for(var i = 0; i < this.search_list.length; i++){//search_list全体
        var materialNum = this.search_list[i].materialNum;
        for(var m = 1; m < materialNum + 1; m++){//serchi_list.material[x]
          var mateTxt = 0;
          mateTxt = eval("this.search_list[" + i + "]." + "material" + String(m));
          for(var s = 0;s < Object.keys(mateTxt).length;s++){//serch_list.material1[x]
            if(Object.keys(this.sort_list).length === 0){
                Vue.set(this.sort_list, Object.keys(mateTxt)[s], mateTxt[Object.keys(mateTxt)[s]])
            }else {
                var sortText = Object.keys(mateTxt)[s];
                if(sortText in this.sort_list){
                  //console.log("同じ")
                  Vue.set(this.sort_list, Object.keys(mateTxt)[s], this.sort_list[Object.keys(this.sort_list)[0]] + mateTxt[Object.keys(mateTxt)[s]])
                }else {
                  //console.log("違う")
                  Vue.set(this.sort_list, Object.keys(mateTxt)[s], mateTxt[Object.keys(mateTxt)[s]])
                }
            }
          }
        }
      }

      //Vue.set(this.sort_list, i,{"あああ": 1,"いいい":2})
    },
    resetBtn: function(){
        localStorage.removeItem('logos_list')
        localStorage.removeItem('logos_sort_list')
    },
  },
  computed: {
      
  },
  /*created: function (){
      
  },*/
  mounted: function(){
    this.loadList();
  },
})

/*const vm3 = new Vue({
  el: '#remaining',
  data: {
    search_list3: [],
    sort_list: [],
  },
  methods: {
    sortList: function(){

      for(var i = 0; i < this.search_list3.length; i++){
        Vue.set(this.sort_list, i,{"あああ": 1,"いいい":2})
      }
      //素材を全て配列にいれる
      //同じものは数字を足していく
      //並べる
    },
  },
  computed: {
    //sortList: function(){
    },
  },
  mounted: function(){
    axios.get("data.json")
      .then(response => {
        this.search_list3 = response.data.action
        this.sortList()
      })

  },
})
*/

function boxHeight(){
  var elements = document.getElementsByClassName("box") ;
  if (window.matchMedia( "(max-width: 750px)" ).matches) {
    var elementsWidth = elements[0].clientWidth;
    for(i = 0; i < elements.length; i++) {
      elements[i].style.height = elementsWidth + "px";
    }
  }else {
    for(i = 0; i < elements.length; i++) {
      elements[i].style.height = "44px";
    }
  }
}

window.onload = function() {
  boxHeight();
};

window.onresize = function () {
  boxHeight();
};