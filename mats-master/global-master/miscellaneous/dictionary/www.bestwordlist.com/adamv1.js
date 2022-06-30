/* document.getElementById('pbfx').classList.remove('fxtp');*/
const width = window.innerWidth;
LastP1=null;LastS1=null;LastD1=null;LastP2=null;LastS2=null;LastD2=null;LastM=null;
pl='/20078922/bwlcmad/bwlcm_L';
pr='/20078922/bwlcmad/bwlcm_R';
pt='/20078922/bwlcmad/bwlcm_T';
pb='/20078922/bwlcmad/bwlcm_B';
dl='PLef';dr='PRig';dt='PTop';db='PBot';
s1=[[300,600],[160,600],[120,600],[300,50],[300,250],[250,250],[240,400],[180,150],[234,60],[125,125],[120,240],[120,90],[120,60]];
s2=[[160,600],[120,600],[125,125],[120,240],[120,90],[120,60]];
s3=[[120,600],[120,240],[120,90],[120,60]];
s4=[[728,90],[468,60],[300,50],[234,60],[120,90],[120,60]];
s5=[[300,50],[320,100],[234,60],[120,90],[120,60]];

!function(a9,a,p,s,t,A,g){if(a[a9])return;function q(c,r){a[a9]._Q.push([c,r])}a[a9]={init:function(){q("i",arguments)},fetchBids:function(){q("f",arguments)},setDisplayBids:function(){},targetingKeys:function(){return[]},_Q:[]};A=p.createElement(s);A.async=!0;A.src=t;g=p.getElementsByTagName(s)[0];g.parentNode.insertBefore(A,g)}("apstag",window,document,"script","//c.amazon-adsystem.com/aax2/apstag.js");
apstag.init({pubID:'7349cd56-bdd6-4073-864f-19d0e655c389',adServer:'googletag',bidTimeout:1e3});

function AssignSlot(p1,s1,d1,p2,s2,d2,m)
{
apstag.fetchBids({slots:[{slotID:d1,slotName:p1,sizes:s1},{slotID:d2,slotName:p2,sizes:s2}]},function(bids){googletag.cmd.push(function(){apstag.setDisplayBids();googletag.pubads().refresh();});});
}

RefreshTimer = null;
function RefreshAds(){
    if ( LastP1 != null )
    {
      AssignSlot(LastP1,LastS1,LastD1,LastP2,LastS2,LastD2,LastM);
    }
    clearTimeout(RefreshTimer);
    RefreshTimer = setTimeout(function(){ RefreshAds() }, 30000);
}

function start(Delay){
   RefreshTimer = setTimeout(function(){ RefreshAds() }, Delay);
}

function stop(){
   if ( RefreshTimer != null )
   {
        clearTimeout(RefreshTimer);
   }
}
function AssignPub(p1,s1,d1,p2,s2,d2,m) {
        LastP1=p1;LastS1=s1;LastD1=d1;LastP2=p2;LastS2=s2;LastD2=d2;LastM=m;
		googletag.cmd.push(function() {
		googletag.defineSlot(p1, s1, d1).addService(googletag.pubads());
		googletag.defineSlot(p2, s2, d2).addService(googletag.pubads());
		if ( m == 1 ){
			googletag.pubads().enableSingleRequest();}
		else{
			googletag.pubads().enableLazyLoad({ fetchMarginPercent: 2,  renderMarginPercent: 1,  mobileScaling: 1 });}
                googletag.pubads().disableInitialLoad();
		googletag.enableServices();
		googletag.cmd.push(function(){googletag.display(d1);});
		googletag.cmd.push(function(){googletag.display(d2);});
	});
        AssignSlot(pl,s1,dl,pr,s1,dr,m);
	start(30000);
}

DelayAssignTimer=null;
function DelayAssignPub(p1,s1,d1,p2,s2,d2,m, Delay) {
   if ( DelayAssignTimer != null ){clearTimeout(DelayAssignTimer);};
   DelayAssignTimer = setTimeout(function(){ AssignPub(p1,s1,d1,p2,s2,d2,m);}, Delay);
}

lPrevSize=0;
function adResize(event) {
  const width=window.innerWidth;
  // Find out new window size
  if(window.innerWidth >= 1328){
    lNewSize=1;
  } else if(window.innerWidth >= 1050 && window.innerWidth < 1328) {
    lNewSize=2;
  } else if(window.innerWidth >= 910 && window.innerWidth < 1050) {
    lNewSize=3;
  } else if(window.innerWidth >= 728 && window.innerWidth < 910) {
    lNewSize=4;
  }else if(window.innerWidth < 728) {
    lNewSize=5;
  }
  if ( lNewSize != lPrevSize  )
  {
     stop();
     if ( lPrevSize != 0 )
     {
        googletag.destroySlots();
		Delay = 3000;
     }
	 else
	 {
		Delay = 0;
	 }
     if ( lNewSize == 1 )
     {
        DelayAssignPub(pl,s1,dl,pr,s1,dr,1,Delay);
     }
     if ( lNewSize == 2 )
     {
        DelayAssignPub(pl,s1,dl,pr,s2,dr,1,Delay);
     }
     if ( lNewSize == 3 )
     {
        DelayAssignPub(pl,s2,dl,pr,s2,dr,1,Delay);
     }
     if ( lNewSize == 4 )
     {
        DelayAssignPub(pt,s4,dt,pb,s4,db,0,Delay);
     }
     if ( lNewSize == 5 )
     {
        DelayAssignPub(pt,s5,dt,pb,s5,db,0,Delay);
     }
     lPrevSize = lNewSize;
  }
}
adResize(null);window.addEventListener("load", adResize);window.addEventListener("resize", adResize);
document.addEventListener('visibilitychange', function() {if(document.hidden) {stop();}else {start(3000);}});