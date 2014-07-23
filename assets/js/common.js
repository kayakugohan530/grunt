(function() {
  var bullet, bulletImages, bulletIndex, bulletLoad, bulletPre, bulletRe, count, index, init, isClicked, loadEnd, none, playarea, pre, start, timer, totalImages, url;

  isClicked = 0;

  totalImages = 1800;

  bulletImages = 30;

  url = 'http://shim.fdev.jp/b/img/';

  count = totalImages;

  pre = 1000 / 24;

  bulletPre = 1000 / 18;

  timer = null;

  index = 1;

  bulletIndex = 1;

  none = $('#none');

  playarea = $('#playarea').on('click', function() {
    return isClicked = 1;
  });

  init = function() {
    var i, img, src, _i, _results;
    _results = [];
    for (i = _i = 1; 1 <= totalImages ? _i <= totalImages : _i >= totalImages; i = 1 <= totalImages ? ++_i : --_i) {
      if (!(i % 2 === 0)) {
        continue;
      }
      img = new Image;
      src = url + 'main/' + ('00000' + i).slice(-5) + '.jpg';
      img.onload = loadEnd;
      img.error = loadEnd;
      img.src = src;
      _results.push(none.append($(img)));
    }
    return _results;
  };

  loadEnd = function() {
    --count;
    if (!--count) {
      return timer = setInterval(start, pre);
    }
  };

  start = function() {
    if (index % 2 !== 0) {
      index++;
      return;
    }
    playarea.css('background', function() {
      return 'url(' + url + 'main/' + ('00000' + index++).slice(-5) + '.jpg)';
    });
    if (isClicked && index % 15 === 0) {
      isClicked = 0;
      clearInterval(timer);
      return bulletLoad(bullet);
    } else if (index > totalImages) {
      return clearInterval(timer);
    }
  };

  bullet = function() {
    playarea.css('background', function() {
      return 'url(' + url + ('00000' + index).slice(-5) + '/' + ('00000' + bulletIndex++).slice(-5) + '.jpg)';
    });
    if (bulletIndex > bulletImages) {
      bulletIndex = bulletImages;
      return bulletRe();
    } else {
      return setTimeout(bullet, bulletPre);
    }
  };

  bulletRe = function() {
    playarea.css('background', function() {
      return 'url(' + url + ('00000' + index).slice(-5) + '/' + ('00000' + bulletIndex--).slice(-5) + '.jpg)';
    });
    if (bulletIndex < 1) {
      bulletIndex = 1;
      return timer = setInterval(start, pre);
    } else {
      return setTimeout(bulletRe, bulletPre);
    }
  };

  bulletLoad = function(f) {
    var bulletLoadEnd, i, img, src, _i, _results;
    count = bulletImages;
    bulletLoadEnd = function() {
      if (!--count) {
        return f();
      }
    };
    _results = [];
    for (i = _i = 1; 1 <= bulletImages ? _i <= bulletImages : _i >= bulletImages; i = 1 <= bulletImages ? ++_i : --_i) {
      img = new Image;
      src = url + ('00000' + index).slice(-5) + '/' + ('00000' + i).slice(-5) + '.jpg';
      img.onload = bulletLoadEnd;
      img.error = bulletLoadEnd;
      img.src = src;
      _results.push(none.append($(img)));
    }
    return _results;
  };

  init();

}).call(this);

//# sourceMappingURL=common.js.map
