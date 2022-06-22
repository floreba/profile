
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

console.log(location);

// let scroller = document.getElementById("scroller")
// scroller.addEventListener("scroll", function () {
//             // const scrollerWrapper = document.getElementById("scroller");
//             // // scrollPercent =
//             // //   (scrollerWrapper.scrollLeft /
//             // //     (scrollerWrapper.scrollWidth - scrollerWrapper.clientWidth)) *
//             // //   100;
//             // // document.getElementById("scroll-progress").style.width =
//             // //   scrollPercent + "%";
//           });

// lwindow.location;
