
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

//This function code needs to modified so that it works with Your cat code.
function headColor(color,code) {
    $('.cat__head, .cat__chest').css('background', '#' + color)  //This changes the color of the cat
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function earColor(color,code) {
    $('.cat__ear--left, .cat__ear--right').css('background', '#' + color)  //This changes the color of the ears
    $('#earcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaears').html(code) //This updates the body color part of the DNA that is displayed below the cat
}
function mouthColor(color,code) {
    $('.cat__mouth-contour').css('background', '#' + color)  //This changes the color of the ears
    $('#mouthcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnamouth').html(code) //This updates the body color part of the DNA that is displayed below the cat
}
function eyesColor(color,code) {
    $('.cat__eye span.pupil-left, .cat__eye span.pupil-right').css('background', '#' + color)  //This changes the color of the ears
    $('#eyecode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaeyes').html(code) //This updates the body color part of the DNA that is displayed below the cat
}
function dotColor(color,code) {
    $('.cat__head-dots, .cat__head-dots_first, .cat__head-dots_second').css('background', '#' + color)  //This changes the color of the ears
    $('#dotcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnadots').html(code) //This updates the body color part of the DNA that is displayed below the cat
}
function pawColor(color,code) {
    $('.cat__paw-left, .cat__paw-right').css('background', '#' + color)  //This changes the color of the ears
    $('#pawcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnapaws').html(code) //This updates the body color part of the DNA that is displayed below the cat
}
function tailColor(color,code) {
    $('.cat__tail').css('background', '#' + color)  //This changes the color of the ears
    $('#tailcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnatail').html(code) //This updates the body color part of the DNA that is displayed below the cat
}


//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()
            $('#eyeName').html('Basic')
            break
        case 2:
            normalEyes()
            $('#eyeName').html('Chill')
            eyesType1()
            break
        case 3:
            normalEyes()
            $('#eyeName').html('Alien')
            eyesType2()
            break
        case 4:
            normalEyes()
            $('#eyeName').html('Tired')
            eyesType3()
            break
        case 5:
            normalEyes()
            $('#eyeName').html('Blocks')
            eyesType4()
            break
        case 6:
            normalEyes()
            $('#eyeName').html('Silly')
            eyesType5()
            break
        case 7:
        normalEyes()
        $('#eyeName').html('Red Shine')
        eyesType6()
        break
        default:
            break
    }
}

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            normaldecoration()    
            $('#dotDecName').html('Basic')
            break
        case 2:
            normaldecoration()
            $('#dotDecName').html('Thick')
            decoration1()
            break
        case 3:
            normaldecoration()
            $('#dotDecName').html('Thin')
            decoration2()
            break
            default:
            break
}
}

function decorationVariationMid(num) {
    $('#dnadecorationMid').html(num)
    switch (num) {
        case 1:
            normaldecorationMid()    
            $('#midDecName').html('Basic')
            break
        case 2:
            normaldecorationMid()
            $('#midDecName').html('Long')
            middecoration1()
            break
        case 3:
            normaldecorationMid()
            $('#midDecName').html('Short')
            middecoration2()
            break
            default:
            break
}
}

function decorationVariationSide(num) {
    $('#dnadecorationSides').html(num)
    switch (num) {
        case 1:
            normaldecorationSides()    
            $('#sideDecName').html('Basic')
            break
        case 2:
            normaldecorationSides()
            $('#sideDecName').html('Long')
            sidedecoration1()
            break
        case 3:
            normaldecorationSides()
            $('#sideDecName').html('Short')
            sidedecoration2()
            break
            default:
            break
}
}

function animations(num) {
    $('#dnaanimation').html(num)
    switch (num) {
        case 1:
            normalAnimation()    
            $('#animationName').html('None')
            break
        case 2:
            normalAnimation() 
            $('#animationName').html('Head Turn')
            animation1()
            break
        case 3:
            normalAnimation() 
            $('#animationName').html('Nose')
            animation2()
            break
        case 4:
            normalAnimation() 
            $('#animationName').html('Tail')
            animation3()
            break
            default:
            break
}
}

async function normalEyes() {
    await $('.cat__eye').find('span').css('border', 'none').css('border-radius', '50%')
}

async function eyesType1() {
    await $('.cat__eye').find('span').css('border-top', '15px solid').css('border-radius', '50%')
}
async function eyesType2() {
    await $('.cat__eye').find('span').css('border-left', '15px solid').css('border-right', '15px solid').css('border-radius', '50%')
}
async function eyesType3() {
    await $('.cat__eye').find('span').css('border-top', '15px solid').css('border-bottom', '15px solid').css('border-radius', '50%')
}
async function eyesType4() {
    await $('.cat__eye').find('span').css('border', '10px solid').css('border-radius', '25%')
}
async function eyesType5() {
    await $('.cat__eye').find('span').css('border-bottom', '15px solid').css('border-radius', '50%')
}
async function eyesType6() {
    await $('.cat__eye').find('span').css('border', '5px solid').css('border-radius', '50%')
}

async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    await $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%"})
    await $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    await $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
async function decoration1() {
    
    await $('.cat__head-dots').css({  "width": "16px"})
    await $('.cat__head-dots_first').css({ "width": "16px" })
    await $('.cat__head-dots_second').css({ "width": "16px" })
}

async function decoration2() {
    
    await $('.cat__head-dots').css({  "width": "8px"})
    await $('.cat__head-dots_first').css({ "width": "8px" })
    await $('.cat__head-dots_second').css({ "width": "8px" })
}

async function normaldecorationMid() {
    await $('.cat__head-dots').css({ "height": "48px"})
}
async function middecoration1() {
    
    await $('.cat__head-dots').css({ "height": "55px"})
}

async function middecoration2() {
    
    await $('.cat__head-dots').css({ "height": "30px"})
}

async function normaldecorationSides() {
    await $('.cat__head-dots_first').css({ "height": "35px"})
    await $('.cat__head-dots_second').css({ "height": "35px"})
}
async function sidedecoration1() {
    
    await $('.cat__head-dots_first').css({ "height": "65px"})
    await $('.cat__head-dots_second').css({ "height": "65px"})
}

async function sidedecoration2() {
    
    await $('.cat__head-dots_first').css({ "height": "15px"})
    await $('.cat__head-dots_second').css({ "height": "15px"})
}


async function normalAnimation() {
    $("#head").removeClass("movingHead");
    $("#nose").removeClass("eyeSide");
    $('#tail').removeClass("tailMove");
}
async function animation1() {
    
    $("#head").addClass("movingHead");
}

async function animation2() {
    $('#nose').addClass("eyeSide");
   
}

async function animation3() {
    $('#tail').addClass("tailMove");
   
}