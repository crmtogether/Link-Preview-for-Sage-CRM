//******************************************************************************
//******************************************************************************
/*
* CRM Together - crmtogether.com (2020)
* Open Source - link preview code for Sage CRM
* install on CRM server in the "WWWRoot\js\custom" folder
* EG
*      C:\Program Files (x86)\Sage\CRM\CRM\WWWRoot\js\custom
*/
//******************************************************************************
function lplog(msg)
{
	if (true)
		console.log("linkpreview:"+msg);
}
function cs_debug(msg)
{
	lplog(msg)
}
function _CustomOnload()
{
	lplog('_CustomOnload');
  attachTagEvent("A","mouseover",_linkPreview);
}
function attachTagEvent(tagName, event, functionPtr)
{
  var tagList=document.getElementsByTagName(tagName);
    cs_debug("tagList="+tagList);
  for(i=0;i<tagList.length;i++)
  {
    var obj=tagList[i];

	if (typeof obj.addEventListener === 'function') {
	      cs_debug("addEventListener:");
		// Check for addEventListener first, since IE9/10 have both,
		// but you should use the standard over the deprecated IE-specific one
		obj.addEventListener(event, functionPtr);
	} else if (typeof obj.attachEvent === 'function') {
	      cs_debug("attachEvent:");
		obj.attachEvent(event, functionPtr);
	}	
	//http://stackoverflow.com/questions/20180046/attachevent-doesnt-work-in-ie-8-0
    //obj.attachEvent(event, functionPtr);
  }
}

function _linkPreview(e)
{
	lplog('_linkPreview init');
  if(!event.ctrlKey) 
    return;

  if (!e) var e = window.event;
  	var relTarg = e.relatedTarget || e.toElement;
  var p_obj=null;
  if ( (relTarg!=null) && (relTarg.tagName=="A"))
  {
    p_obj=relTarg;
  }else{
    p_obj=relTarg.childNodes[0];
  }
  if ( (p_obj!=null) && (p_obj.tagName=="A") )
  {
    if (p_obj.href.indexOf("javascript")==-1){
		lplog('_linkPreview preview');
        _toggleDivObj(0,p_obj.href);
	}
  }
}

function _toggleDivObj(idx,url)
{
	lplog('_toggleDivObj');
	lplog(url);
	if ($("#lpiframe").length==0){
	    lpframe = document.createElement('iframe');
		lpframe.name='lpiframe';
		lpframe.id='lpiframe';
		lpframe.style.width = "90%";
		lpframe.style.height = "80%";
		lpframe.style.left = "5%";
		lpframe.style.top = "5vh";
		lpframe.style.position = "fixed";
		lpframe.style.zIndex = "9999";
		lpframe.style.boxShadow = "0 0 0 100vw rgba(0,0,0,0.75)";
		document.body.appendChild(lpframe);
	}
	lpframe.src = url;
	
	$("#lpiframe").show();

	$(document).on("click", function(e) {
		//If you click on document it will close the iframe.
		$("#lpiframe").hide();
	});
		
}



$(document).ready(function () {

_CustomOnload();

});

lplog('loaded');