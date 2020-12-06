jQuery(function ($) {
  // サイドメニュー(開発時)
  var isOpened = false;
  var SIDE_MENU_MIN_WIDTH = 56;
  var SIDE_MENU_MAX_WIDTH = 232;
  var SIDE_MENU_DURATION = 300; //動作時間(ms)

  $('.accordionMenuWrapper').css('opacity', '0');
  $('.openMenuBtn img').bind('click', function(){
    if(!isOpened){
      $('.sideMenu').animate({
          width: SIDE_MENU_MAX_WIDTH
      }, SIDE_MENU_DURATION);
      $('.main-content').animate({
          marginLeft: SIDE_MENU_MAX_WIDTH
      }, SIDE_MENU_DURATION);
      $('.accordionMenuWrapper').css('display', 'block').animate({
          opacity: 1
      }, SIDE_MENU_DURATION);
    } else{
      $('.sideMenu').animate({
          width: SIDE_MENU_MIN_WIDTH
      }, SIDE_MENU_DURATION);
      $('.main-content').animate({
          marginLeft: SIDE_MENU_MIN_WIDTH
      }, SIDE_MENU_DURATION);
      $('.accordionMenuWrapper').animate({
          opacity: 0
      }, SIDE_MENU_DURATION, '', function(){ $(this).css('display', 'none');});
    }
    isOpened = !isOpened;
  });

  /**
   * 検索処理
   */
  try{
    // var SEARCH_DURATION = 300; //動作時間(ms)
    //
    // var loadingElm = new LoadingProgress(); //くるくるするCanvas
    // var $loadingElm = $('<div class="loadingWrapper"></div>').append(loadingElm);

    var $resultElm = null; //結果リストと詳細
  }catch(e){alert(e);}
  $('.searchBtn').bind('click', function(){
    try {
      // 操作対象のフォーム要素、及び挿入対象の親要素を取得
      var fname = $(this).attr("data-form");
      var rname = $(this).attr("data-result");
      var $form = $('#' + fname);
      var $searchResult = $('#' + rname);

      // 検索ボタンの親要素を取得
      var $btnDiv = $(this).closest("div");

      //フォームデータをJSONに変換
      var param = {};
      $($form.serializeArray()).each(function(i, v) {
        param[v.name] = v.value;
      });
      var data = jQuery.toJSON(param);

      //検索結果取得
      $.ajax({
        type: "POST",
        url: $form.attr('action'),
        contentType: "application/json;charset=UTF-8",
        data: data,
        dataType: "json",
        //送信前
        beforeSend: function(xhr, settings) {
          // ボタンを非表示にし、二重送信を防止
          $btnDiv.css('visibility', 'hidden');
        },
        //応答後
        complete: function(xhr, textStatus) {
          // ボタンを再表示し、再送信を許可
          $btnDiv.css('visibility', 'visible ');
        },
        //通信成功時の処理
        success: function(data){
          alert(data);
        },
        //通信失敗時の処理
        error:function(XMLHttpRequest, textStatus, errorThrown){
          // エラーのタイプ（timeout, error, notmodified, parsererror）
          alert("textStatus=" + textStatus);
          // エラーメッセージ
          alert("errorThrown=" + errorThrown);
        }
      });
    }catch(e){alert(e);}
    return false;
  });

  /**
  * あいまい検索項目「＊」付与
  */
  $('.txtAimai').on('change', function () {
    //alert('1');
    //        var val = trim( this.value);
    //        var mlen = $(this).prop('maxlength');
    //        var len = val.length;
    //        var ret = '';
    //        if(val != '' && len <= mlen) {
    //            if(len == mlen) {
    //                ret = val;
    //            }
    //            else if(len == mlen -1) {
    //                if(val.substr(val.length -1, 1) != '*') {
    //                    ret = val + '*';
    //                }
    //            }
    //            else {
    //                ret = val;
    //                if(ret.substr(0, 1) != '*') {
    //                    ret = '*' + ret;
    //                }
    //                if(ret.substr(ret.length -1, 1) != '*') {
    //                    ret = ret + '*';
    //                }
    //            }
    //        }
    //              $(this).val(ret);
  });

  // エンターキーでポストされる不具合対応 参考URL⇒ttp://qiita.com/awakia/items/17457d6b1809dd803413
  $(document).on("keypress", "input:not(.allow_submit)", function(event) {
      return event.which !== 13;
  });

});

//空白除去
function trim(str) {
  return str.replace(/^[ 　\t\r\n]+|[ 　\t\r\n]+$/g, "");
};

//日付のフォーマット(yyyy/MM/dd)変更
function getFormattedDate(date) {
    var year  = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month     = month.length > 1 ? month : '0' + month;
    var day   = date.getDate().toString();
    day       = day.length > 1 ? day : '0' + day;
    return year + '/' + month + '/' + day;
};

//品目マスタサブウインドウ呼出関数
//selectMode:Mが指定された場合複数選択、S時は単体選択
function showHinmokuSubSearch(cd, nm, selectMode) {
  var param = "?paramcd=" + cd +"&paramnm=" + nm + "&mode=" + selectMode + "&funcMode=0";
  // TODO 画面サイズは暫定(ウィンドウ名は問題あれば変更)
  window.open("/johso/NSX0001/NSX0001D01" + param,"hmSubSearch","width=1024,height=800");
};
//品目マスタサブウインドウ(単体選択モード)呼出
//↓↓↓パラメータについて↓↓↓
//cd:親ウィンドウの設定先のコード(単体選択時使用)
//nm:親ウィンドウの設定先の名称(単体選択時使用)
function showHmSubWindowSingleSelect(cd, nm) {
  showHinmokuSubSearch(cd, nm, 'S');
}
//品目マスタサブウインドウ(複数選択モード)呼出
function showHmSubWindowMultiSelect() {
  showHinmokuSubSearch('', '', 'M');
}

function showHmSubWindowSingleSelectFunc(cd, nm,funcMode) {
  //showHinmokuSubSearch(cd, nm, 'S');
  var param = "?paramcd=" + cd +"&paramnm=" + nm + "&mode=S&funcMode=" + funcMode;
  // TODO 画面サイズは暫定(ウィンドウ名は問題あれば変更)
  window.open("/johso/NSX0001/NSX0001D01" + param,"hmSubSearch","width=1024,height=800");
}


// 仕入先サブウィンドウの呼出
function shiiresakiSearchSubWindowOpen(shiiresakiCodeId, shiiresakiNameId) {
  var param = "?shiiresakiCodeId=" + shiiresakiCodeId +"&shiiresakiNameId=" + shiiresakiNameId +"&funcMode=0";
  window.open("/johso/NSX0002/NSX0002D01" + param,"shiiresakiSearchSubWindow","width=1024,height=800");
}

function shiiresakiSearchSubWindowOpenFunc(shiiresakiCodeId, shiiresakiNameId,funcMode) {
  var param = "?shiiresakiCodeId=" + shiiresakiCodeId +"&shiiresakiNameId=" + shiiresakiNameId +"&funcMode=" + funcMode;
  window.open("/johso/NSX0002/NSX0002D01" + param,"shiiresakiSearchSubWindow","width=1024,height=800");
}

//顧客サブウィンドウの呼出
function kokyakuSearchSubWindowOpen(kokyakuCodeId, kokyakuNameId) {
  var param = "?kokyakuCodeId=" + kokyakuCodeId +"&kokyakuNameId=" + kokyakuNameId;
  window.open("/johso/NSX0003/NSX0003D01" + param,"kokyakuSearchSubWindow","width=1024,height=800");
}

// 担当者サブウィンドウの呼出
function tantoshaSearchSubWindowOpen(tantoshaCodeId, tantoshaNameId) {
  var param = "?tantoshaCodeId=" + tantoshaCodeId +"&tantoshaNameId=" + tantoshaNameId;
  window.open("/johso/NSX0004/NSX0004D01" + param,"tantoshaSearchSubWindow","width=1024,height=800");
}

// 出荷先サブウィンドウの呼出
function shukkasakiSearchSubWindowOpen(shukkasakiCodeId, shukkasakiNameId) {
  var param = "?shukkasakiCodeId=" + shukkasakiCodeId +"&shukkasakiNameId=" + shukkasakiNameId;
  window.open("/johso/NSX0005/NSX0005D01" + param,"shukkasakiSearchSubWindow","width=1024,height=800");
}

//受注検索サブウィンドウの呼出
function jyuchuSearchSubWindowOpen(jyuchuNoCodeId) {
  var param = "?jyuchuNoCodeId=" + jyuchuNoCodeId;
  window.open("/johso/NSX0006/NSX0006D01" + param,"jyuchuSearchSubWindow","width=1024,height=800");
}

//製番マスタサブウインドウ呼出関数
//selectMode:Mが指定された場合複数選択、S時は単体選択
function showSeibanSubSearch(cd, nm, selectMode) {
  var param = "?paramcd=" + cd +"&paramnm=" + nm + "&mode=" + selectMode;
  // TODO 画面サイズは暫定(ウィンドウ名は問題あれば変更)
  window.open("/johso/NSX0007/NSX0007D01" + param,"SeibanMSubSearch","width=1024,height=800");
};

//製番マスタサブウインドウ(単体選択モード)呼出
//↓↓↓パラメータについて↓↓↓
//cd:親ウィンドウの設定先のコード(単体選択時使用)
//nm:親ウィンドウの設定先の名称(単体選択時使用)
function showSeibanMSubWindowSingleSelect(cd, nm) {
  showSeibanSubSearch(cd, nm, 'S');
}

//製番マスタサブウインドウ(複数選択モード)呼出
function showSeibanMSubWindowMultiSelect() {
  showSeibanSubSearch('', '', 'M');
}

//サブミット前チェック
var commitFlg = false;
//function preSubmitCheck() {
//  preSubmitCheck("", true);
//}
//function preSubmitCheck(msg) {
//  preSubmitCheck(msg, true);
//}
function preSubmitCheck(msg) {
  if (commitFlg) {
    // NGを返す
    return false;
  }
  else {
    if (msg != null && msg != '') {
      if (!window.confirm(msg)) {
        // NGを返す
        return false;
      }
    }
    // 処理中表示
    var crtpath = location.pathname.substr(1);
    var hostname = crtpath.split("/");
    var srcPath = "/" + hostname[0] + "/images/loading.gif";
    /* ウィンドウ全体にマスクをかける */
    var masker = $(window).maskAll("#FFFFFF", 0.6);
    /* 処理メッセージ画像を追加 */
    masker.append("<img src='" + srcPath + "' alt='処理中' id='waitting_img' />");
    /* 処理メッセージ画像をウィンドウ中央に表示 */
    $("#waitting_img").centerView();
    /* リクエスト開始。処理完了まで処理中メッセージが表示される */

    // フラグをONにする
    commitFlg = true;
    // OKを返す
    return true;
  }
}

function clearFlg() {
  commitFlg = false;
}
//ページング処理 BEGIN ////////////////////////////

var rowsCount; // 一ページに表示されるデータ数を設定
var oneDataTrSize; //  一データの行数を設定
var lastPageIndex;

var nowPageIndex = 0;
var page1st = 0;
var page2nd = 0;
var page3rd = 0;
var page4th = 0;
var page5th = 0;

function drawList() {
 // 前へと次への表示、非表示処理
 if (nowPageIndex == 0) {
   $('#prevPage').hide();
 } else {
   $('#prevPage').show();
 }
 if (nowPageIndex == lastPageIndex) {
   $('#nextPage').hide();
 } else {
   $('#nextPage').show();
 }

 // ページ番号を表示
 if (nowPageIndex == 0 || nowPageIndex == 1) {
   page1st = 0;
   page2nd = 1;
   page3rd = 2;
   page4th = 3;
   page5th = 4;

 } else if (nowPageIndex == lastPageIndex || nowPageIndex == lastPageIndex - 1) {
   page1st = lastPageIndex - 4;
   page2nd = lastPageIndex - 3;
   page3rd = lastPageIndex - 2;
   page4th = lastPageIndex - 1;
   page5th = lastPageIndex;

 } else {
   page1st = nowPageIndex - 2;
   page2nd = nowPageIndex - 1;
   page3rd = nowPageIndex;
   page4th = nowPageIndex + 1;
   page5th = nowPageIndex + 2;
 }

 if (page1st == nowPageIndex) {
     $('#page1st').html(page1st + 1);
 } else {
     $('#page1st').html('<a href="#">' + (page1st + 1) +  '</a>');
 }
 if (page2nd == nowPageIndex) {
     $('#page2nd').html(page2nd + 1);
 } else {
     $('#page2nd').html('<a href="#">' + (page2nd + 1) +  '</a>');
 }
 if (page3rd == nowPageIndex) {
     $('#page3rd').html(page3rd + 1);
 } else {
     $('#page3rd').html('<a href="#">' + (page3rd + 1) +  '</a>');
 }
 if (page4th == nowPageIndex) {
     $('#page4th').html(page4th + 1);
 } else {
     $('#page4th').html('<a href="#">' + (page4th + 1) +  '</a>');
 }
 if (page5th == nowPageIndex) {
     $('#page5th').html(page5th + 1);
 } else {
     $('#page5th').html('<a href="#">' + (page5th + 1) +  '</a>');
 }

 // 存在しないページのリンクは非表示する
 $('#page1st').show();
 $('#page2nd').show();
 $('#page3rd').show();
 $('#page4th').show();
 $('#page5th').show();

 if ((page1st < 0) ||  (page1st > lastPageIndex)) {
     $('#page1st').hide();
 }
 if ((page2nd < 0) || (page2nd > lastPageIndex)) {
     $('#page2nd').hide();
 }
 if ((page3rd < 0) || (page3rd > lastPageIndex)) {
     $('#page3rd').hide();
 }
 if ((page4th < 0) || (page4th > lastPageIndex)) {
     $('#page4th').hide();
 }
 if ((page5th < 0) || (page5th > lastPageIndex)) {
     $('#page5th').hide();
 }

 // 各ページに該当するデータだけ表示する
 $('table#paging tr').hide();
 $('table#paging tr:first').show();
 var dataStartIdxOnGT = oneDataTrSize - 1;
 if (dataStartIdxOnGT > 0) {
     $('table#paging tr:gt(0):lt(' + dataStartIdxOnGT + ')').show();
 }
 $('table#paging tr:gt(' + (dataStartIdxOnGT + nowPageIndex * rowsCount * oneDataTrSize) + '):lt(' + (rowsCount * oneDataTrSize) + ')').show();

// console.log("gt:" + (dataStartIdxOnGT + nowPageIndex * rowsCount * oneDataTrSize));
// console.log("lt:" + (rowsCount * oneDataTrSize));
// console.log("the current page:" + (nowPageIndex + 1));
}

jQuery(function ($) {

  $('#nextPage').click(function() {
      if (nowPageIndex < lastPageIndex) {
          nowPageIndex++;
          drawList();
      }
  });

  $('#prevPage').click(function() {
      if (nowPageIndex > 0) {
          nowPageIndex--;
          drawList();
      }
  });

  $('#page1st').click(function() {
      nowPageIndex = page1st;
      drawList();
  });
  $('#page2nd').click(function() {
      nowPageIndex = page2nd;
      drawList();
  });
  $('#page3rd').click(function() {
      nowPageIndex = page3rd;
      drawList();
  });
  $('#page4th').click(function() {
      nowPageIndex = page4th;
      drawList();
  });
  $('#page5th').click(function() {
      nowPageIndex = page5th;
      drawList();
  });

});

//ページング処理 END   ////////////////////////////
// ショートカットキー割当
jQuery(function ($) {
  $(window).keydown(function(e){// キーボードが押されたときにイベントが発生
    if(e.keyCode == 113){ // F2
      $('.buttonKeyF2').trigger("click");
    }else if(e.keyCode == 114){ // F3
      $('.buttonKeyF3').trigger("click");
    }else if(e.keyCode == 115){ // F4
      $('.buttonKeyF4').trigger("click");
    }else if(e.keyCode == 116){ // F5
      $('.buttonKeyF5').trigger("click");
    }else if(e.keyCode == 117){ // F6
      $('.buttonKeyF6').trigger("click");
    }else if(e.keyCode == 118){ // F7
      $('.buttonKeyF7').trigger("click");
    }else if(e.keyCode == 119){ // F8
      $('.buttonKeyF8').trigger("click");
    }else if(e.keyCode == 120){ // F9
      $('.buttonKeyF9').trigger("click");
    }else if(e.keyCode == 121){ // F9
      $('.buttonKeyF10').trigger("click");
    }else if(e.keyCode == 122){ // F9
      $('.buttonKeyF11').trigger("click");
    }else if(e.keyCode == 123){ // F9
      $('.buttonKeyF12').trigger("click");
    }else if(e.keyCode == 27){ // Esc
      $('.buttonKeyEsc').trigger("click");
    }
    else {
      return true;
    }

    return false;
  });
});

// テキストボックス全選択
$(document).ready(function(){
  $('.textIn')
    .focus(function(){
      $(this).select();
    });
  $('.textInReq')
  .focus(function(){
    $(this).select();
  });
});

// セレクトボックス並び替え
function SortSelect(strSelect, blnAsc){
  objSelect = document.getElementById(strSelect)
  for (i = 1; i < objSelect.length; i++) {
    strInsert = objSelect.options[i].text;
    for (j = 0; j <= i; j++ ) {
      strCurrent = objSelect.options[j].text;
      if (((blnAsc && strInsert <= strCurrent) || (!blnAsc && strInsert >= strCurrent)) && (i != j) ) {
         objInsert = objSelect.options[i];
         objWalk = objSelect.options[j];
         objSelect.insertBefore(objInsert, objWalk);
         j = i;
      }
    }
  }
}

// サブミットボタン押下時にダイアログメッセージで確認する関数
// formId:サブミットの対象フォームIdを文字列で渡す
// buttonId:サブミットするボタンIdを文字列で渡す
// blnDialogDisp:ダイアログを表示するかフラグ(基本システム全体で管理する) true:表示する false:表示しない
function beforeDispDialogInsert(formId,buttonId,blnDialogDisp){

  beforeDispDialog(formId,buttonId,blnDialogDisp,'登録');

}

function beforeDispDialogUpdate(formId,buttonId,blnDialogDisp){

  beforeDispDialog(formId,buttonId,blnDialogDisp,'更新');

}

function beforeDispDialogDelete(formId,buttonId,blnDialogDisp){

  beforeDispDialog(formId,buttonId,blnDialogDisp,'削除');

}

function beforeDispDialog(formId,buttonId,blnDialogDisp,strMsg){

  // ダイアログ表示判定
  if (blnDialogDisp == true){

    // ダイアログ文言用タグ追加
      $("#" + formId).append("<div id='dispDialog'></div>");

      // 画面ロード時にダイアログ表示を回避
    $("#dispDialog").dialog({autoOpen:false});

    // ダイアログの設定
    $("#dispDialog").dialog({
      height:200,
      width:450,
      modal:true,
      title:'確認',
      buttons:{
        "OK":function(){
          $("#" + formId).submit();
        },
        "Cancel":function(){
          $("#dispDialog").dialog("close");
        }
      }
    });

    // サブミット用ボタンクリックイベントを登録する
    $("#" + buttonId).click(function(e){
      $("#dispDialog").get(0).innerText = strMsg + "しますがよろしいですか？";
      e.preventDefault();
      $("#dispDialog").dialog("open");
    });
  };
}


// 処理後メッセージダイアログ表示
// infoDivId:後メッセージ表示用DivのId
// blnDialogDisp:ダイアログを表示するかフラグ(基本システム全体で管理する) true:表示する false:表示しない
function afterDispDialog(infoDivId,blnDialogDisp){
  // ダイアログ表示判定
  if (blnDialogDisp == true){
    if ($("#" + infoDivId).get(0).firstChild != undefined) {
      $("#" + infoDivId).dialog({
        height:200,
        width:450,
        modal:true,
        title:'情報',
        buttons:{
          'OK':function () {
            $(this).dialog('close');
          }
        }
      })
    }
  };
}

// テーブルの列を折り返し整形
// selector:対象テーブルのID
// lineItmecount:列数
function tableTagReshape(selector,lineItmecount){
  var data = [];
    var tr = $('#' + selector + ' tbody > tr');
    for( var i=0,l=tr.length;i<l;i++ ){
      var cells = tr.eq(i).children();
      data[i] = cells;
    }

    // テーブルレイアウトをクリア
    $('#' + selector + ' tbody > tr').remove();
    // tbodyのオブジェクト取得
    body = $('#' + selector + ' tbody');
    $.each(data,function(i,val){
      if ((i + 1 ) % lineItmecount == 1){
        // 改行挿入
        body.append($("<tr>"));
      }

      // tdデータ設定
      $.each(val,function(j,val){
        $('#' + selector + ' tbody > tr:last').append(val.outerHTML );
      });
    });

    var mod = data.length % lineItmecount;
    if (mod != 0){
      for( var i=0;i < (lineItmecount - mod);i++){
        // 1セットの空tdデータ設定
        $.each(data[0],function(i,val){
          val.textContent = "";
          $('#' + selector + ' tbody > tr:last').append(val.outerHTML);
        });
      };
    };
}

function callCommonajaxController(method,pData,clearFunc,setFunc){

  var token = $("meta[name='_csrf']").attr("content");
  var header = $("meta[name='_csrf_header']").attr("content");
  $(document).ajaxSend(function(e, xhr, options) {
      xhr.setRequestHeader(header, token);
  });
  $.ajax({
    type: "post",
    url: "../COM/" + method,
    cache: false,
    dataType:"json",
    data:pData,
    statusCode: {
        401: function() {
            window.location.href = /*[[@{/login?timeout}]]*/"";
        }
    }
  }).done(function(response){

    // クリア処理
    if (clearFunc != undefined){
      clearFunc();
    }
    // 検索結果設定処理
    if (setFunc != undefined){
      setFunc(response);
    }

  // 例外処理
  }).fail(function(XMLHttpRequest,status){

    // 例外コンテンツ表示
    $('body').append("<div id='dummy' />"); // dummyタグを追加
    $('#dummy').html(XMLHttpRequest.responseText);  // dummyタグに内容を出力
    var bodyInnerHTML = $('#dummy').html(); // htmlを退避
    $('#dummy').remove();
    $('.container').remove();
    $('body').append("<div class='container' />");
    $('.container').html(bodyInnerHTML);

  });

}
