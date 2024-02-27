
function hide() {
  x = document.getElementById('carou');
  btnShow = document.getElementById('button-show');
  btnHide = document.getElementById('button-hide');
  x.className = 'hide';
  btnShow.className = 'show button';
  btnHide.className = 'hide button';

}

function show() {
  x = document.getElementById('carou');
  btnShow = document.getElementById('button-show');
  btnHide = document.getElementById('button-hide');
  x.className = 'show';
  btnHide.className = 'show button';
  btnShow.className = 'hide button';
}

function openPopup() {
  var width = 620;
  var height = 425;
  var left = (screen.width/2)-(width/2);
  var top = (screen.height/2)-(height/2);
  window.open("pong.html", "Popup", "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top);
}

