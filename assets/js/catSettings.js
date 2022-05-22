
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 10,
    "mouthcolor" : 13,
    "eyescolor" : 96,
    "earcolor" : 10,
    "dotcolor" : 13,
    "pawcolor" : 10,
    "tailcolor" : 10,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 1,
    "decorationSidescolor" : 1,
    "animation" :  1,
    "lastNum" :  1
    }
    
    var randomDNA;

    function random(){
    randomDNA = {
      "headcolor" : getRandomInt(10, 98),
      "mouthcolor" : getRandomInt(10, 98),
      "eyescolor" : getRandomInt(10, 98),
      "earcolor" : getRandomInt(10, 98),
      "dotcolor" : getRandomInt(10, 98),
      "pawcolor" : getRandomInt(10, 98),
      "tailcolor" : getRandomInt(10, 98),
      //Cattributes
      "eyesShape" : getRandomInt(1, 7),
      "decorationPattern" : getRandomInt(1, 3),
      "decorationMidcolor" : getRandomInt(1, 3),
      "decorationSidescolor" : getRandomInt(1, 3),
      "animation" :  getRandomInt(1, 4),
      "lastNum" :  1
      }
    }
    var collectionDNA;
    function collectionDNA(items){


      collectionDNA = {
        "headcolor" : 11,
        "mouthcolor" : 11,
        "eyescolor" : 11,
        "earcolor" : 11,
        "dotcolor" : 11,
        "pawcolor" : 11,
        "tailcolor" : 11,
        //Cattributes
        "eyesShape" : 2,
        "decorationPattern" : 2,
        "decorationMidcolor" : 2,
        "decorationSidescolor" : 2,
        "animation" :  2,
        "lastNum" :  1
        }
      }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);
  $('#dnadots').html(defaultDNA.dotColor);
  $('#dnapaws').html(defaultDNA.pawColor);
  $('#dnatail').html(defaultDNA.tailColor);
    
   $('#dnashape').html(defaultDNA.eyesShape)
   $('#dnadecoration').html(defaultDNA.decorationPattern)
   $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
   $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
   $('#dnaanimation').html(defaultDNA.animation)
   $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //Barrier ints are inclusive
}

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnadots').html()
    dna += $('#dnapaws').html()
    dna += $('#dnatail').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headcolor],dna.headcolor)
    $('#bodycolor').val(dna.headcolor)
    earColor(colors[dna.earcolor],dna.earcolor)
    $('#earcolor').val(dna.earcolor)
    mouthColor(colors[dna.mouthcolor],dna.mouthcolor)
    $('#mouthcolor').val(dna.mouthcolor)
    eyesColor(colors[dna.eyescolor],dna.eyescolor)
    $('#eyescolor').val(dna.eyescolor)
    dotColor(colors[dna.dotcolor],dna.dotcolor)
    $('#dotcolor').val(dna.dotcolor)
    pawColor(colors[dna.pawcolor],dna.pawcolor)
    $('#pawcolor').val(dna.pawcolor)
    tailColor(colors[dna.tailcolor],dna.tailcolor)
    $('#tailcolor').val(dna.tailcolor)
    eyeVariation(dna.eyesShape)
    $('#eyeshape').val(dna.eyesShape)
    decorationVariation(dna.decorationPattern)
    $('#dotdec').val(dna.decorationPattern)
    decorationVariationMid(dna.decorationMidcolor)
    $('#middec').val(dna.decorationMidcolor)
    decorationVariationSide(dna.decorationSidescolor)
    $('#sidedec').val(dna.decorationSidescolor)
    animations(dna.animation)
    $('#animationdec').val(dna.animation)
}

// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})
$('#earcolor').change(()=>{
  var colorVal = $('#earcolor').val()
  earColor(colors[colorVal],colorVal)
})
$('#mouthcolor').change(()=>{
  var colorVal = $('#mouthcolor').val()
  mouthColor(colors[colorVal],colorVal)
})
$('#eyescolor').change(()=>{
  var colorVal = $('#eyescolor').val()
  eyesColor(colors[colorVal],colorVal)
})
$('#dotcolor').change(()=>{
  var colorVal = $('#dotcolor').val()
  dotColor(colors[colorVal],colorVal)
})
$('#pawcolor').change(()=>{
  var colorVal = $('#pawcolor').val()
  pawColor(colors[colorVal],colorVal)
})
$('#tailcolor').change(()=>{
  var colorVal = $('#tailcolor').val()
  tailColor(colors[colorVal],colorVal)
})
$('#eyeshape').change(()=>{
  var shape = parseInt($('#eyeshape').val())
  eyeVariation(shape)
})
$('#dotdec').change(()=>{
  var shape = parseInt($('#dotdec').val())
  decorationVariation(shape)
})
$('#middec').change(()=>{
  var shape = parseInt($('#middec').val())
  decorationVariationMid(shape)
})
$('#sidedec').change(()=>{
  var shape = parseInt($('#sidedec').val())
  decorationVariationSide(shape)
})
$('#animationdec').change(()=>{
  var animationVal = parseInt($('#animationdec').val())
  animations(animationVal)
})

//$('#defaultKitty').button();
$('#defaultKitty').click(function() {
  renderCat(defaultDNA);
});

$('#randomKitty').click(function() {
  random();
  
  $('#dnabody').html(randomDNA.headColor);
  $('#dnamouth').html(randomDNA.mouthColor);
  $('#dnaeyes').html(randomDNA.eyesColor);
  $('#dnaears').html(randomDNA.earsColor);
  $('#dnadots').html(randomDNA.dotColor);
  $('#dnapaws').html(randomDNA.dotColor);
  $('#dnatail').html(randomDNA.dotColor);
    
   $('#dnashape').html(randomDNA.eyesShape)
   $('#dnadecoration').html(randomDNA.decorationPattern)
   $('#dnadecorationMid').html(randomDNA.decorationMidcolor)
   $('#dnadecorationSides').html(randomDNA.decorationSidescolor)
   $('#dnaanimation').html(randomDNA.animation)
   $('#dnaspecial').html(randomDNA.lastNum)
  renderCat(randomDNA);
});

