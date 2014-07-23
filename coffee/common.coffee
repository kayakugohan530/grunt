isClicked = 0
totalImages = 1800
bulletImages = 30
url = 'http://shim.fdev.jp/b/img/'
count = totalImages
pre = 1000 / 24
bulletPre = 1000 / 18
timer = null
index = 1
bulletIndex = 1
none = $('#none')


playarea = $('#playarea').on 'click', ->
  isClicked = 1

init = ->
  for i in [1..totalImages] when i % 2 == 0
    img = new Image
    src = url + 'main/' + ('00000' + i).slice(-5) + '.jpg'
    img.onload = loadEnd
    img.error = loadEnd
    img.src = src
    none.append $(img)


loadEnd = ->
  --count
  if !--count
    timer = setInterval start, pre


start = ->
  if index % 2 != 0
    index++
    return
  playarea.css 'background', ->
    return 'url(' + url + 'main/' + ('00000' + index++).slice(-5) + '.jpg)'
  if isClicked and index % 15 == 0
    isClicked = 0
    clearInterval timer
    bulletLoad bullet
  else if index > totalImages
    clearInterval timer

bullet = ->
  playarea.css 'background', ->
    return 'url(' + url + ('00000' + index).slice(-5) + '/' + ('00000' + bulletIndex++).slice(-5) + '.jpg)'
  if bulletIndex > bulletImages
    bulletIndex = bulletImages
    bulletRe()
  else
    setTimeout bullet, bulletPre

bulletRe = ->
  playarea.css 'background', ->
    return 'url(' + url + ('00000' + index).slice(-5) + '/' + ('00000' + bulletIndex--).slice(-5) + '.jpg)'
  if bulletIndex < 1
    bulletIndex = 1
    timer = setInterval start, pre
  else
    setTimeout bulletRe, bulletPre

bulletLoad = (f) ->
  count = bulletImages
  bulletLoadEnd = ->
    if !--count
      f()
  for i in [1..bulletImages]
    img = new Image
    src = url + ('00000' + index).slice(-5) + '/' + ('00000' + i).slice(-5) + '.jpg'
    img.onload = bulletLoadEnd
    img.error = bulletLoadEnd
    img.src = src
    none.append $(img)

init()
