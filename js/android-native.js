(function(){
 const cap=window.Capacitor;
 if(!cap||!cap.isNativePlatform||!cap.isNativePlatform())return;
 const plugins=cap.Plugins||{};
 const App=plugins.App,StatusBar=plugins.StatusBar,ScreenOrientation=plugins.ScreenOrientation;
 document.documentElement.classList.add("is-native-android");
 const setStatusBar=async hidden=>{try{if(!StatusBar)return;if(hidden)await StatusBar.hide();else await StatusBar.show();}catch(error){console.warn("No se pudo actualizar la barra de estado",error);}};
 const setOrientation=async orientation=>{try{if(ScreenOrientation)await ScreenOrientation.lock({orientation});}catch(error){console.warn("La orientación solicitada no está disponible",error);}};
 const updateNativeUi=()=>{const player=!!document.getElementById("playerPage");setStatusBar(player);if(player)setOrientation("landscape");else if(ScreenOrientation?.unlock)ScreenOrientation.unlock().catch(()=>{});};
 const observer=new MutationObserver(updateNativeUi);observer.observe(document.body,{childList:true,subtree:true});
 document.addEventListener("astral:android-back",()=>{});
 if(App?.addListener){App.addListener("backButton",()=>document.dispatchEvent(new CustomEvent("astral:android-back")));App.addListener("appStateChange",({isActive})=>{if(!isActive)document.dispatchEvent(new Event("pagehide"));});}
 document.addEventListener("astral:android-exit-request",()=>{if(App?.exitApp)App.exitApp();});
 document.addEventListener("DOMContentLoaded",updateNativeUi,{once:true});
 const pickVideos=()=>{const input=document.getElementById("videoPicker");if(!input)return;input.multiple=true;input.accept="video/*";input.click();};
 window.astralNative={setStatusBar,setOrientation,pickVideos};
})();
