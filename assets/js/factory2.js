

function eyeVariation(num, iteration) {

    if(num == 1){
        normalEyes(iteration);
    }else if(num==2){
        eyesType1(iteration);
    } else if(num==3){
        eyesType2(iteration);
    } else if(num==4){
        eyesType3(iteration);
    } else if(num==5){
        eyesType4(iteration);
    } else if(num==6){
        eyesType5(iteration);
    }else if(num==7){
        eyesType6(iteration);
    }
}

function eyeVariant(num, iteration) {

    if(num == 1){
        normalEyes(iteration);
    }else if(num==2){
        eyesType1(iteration);
    } else if(num==3){
        eyesType2(iteration);
    } else if(num==4){
        eyesType3(iteration);
    } else if(num==5){
        eyesType4(iteration);
    } else if(num==6){
        eyesType5(iteration);
    }else if(num==7){
        eyesType6(iteration);
    }
}

function decVariation(num, iteration) {
    if(num === 1){
        
        $(`#${iteration}`).find('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%"})
        $(`#${iteration}`).find('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
        $(`#${iteration}`).find('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
        
    }else if(num===2){
        $(`#${iteration}`).find('.cat__head-dots').css({  "width": "16px"})
        $(`#${iteration}`).find('.cat__head-dots_first').css({ "width": "16px" })
        $(`#${iteration}`).find('.cat__head-dots_second').css({ "width": "16px" })
    } else if(num===3){
        $(`#${iteration}`).find('.cat__head-dots').css({  "width": "8px"})
        $(`#${iteration}`).find('.cat__head-dots_first').css({ "width": "8px" })
        $(`#${iteration}`).find('.cat__head-dots_second').css({ "width": "8px" })
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

function normalEyes(iteration) {
    $(`#${iteration}`).find('.cat__eye').find('span').css('border', 'none').css('border-radius', '50%')
}

function eyesType1(iteration) {
    $(`#${iteration}`).find('.cat__eye').find('span').css('border-top', '15px solid').css('border-radius', '50%')
}
function eyesType2(iteration) {
    $(`#${iteration}`).find('.cat__eye').find('span').css('border-left', '15px solid').css('border-right', '15px solid').css('border-radius', '50%')
}
function eyesType3(iteration) {
    $(`#${iteration}`).find('.cat__eye').find('span').css('border-top', '15px solid').css('border-bottom', '15px solid').css('border-radius', '50%')
    
}
function eyesType4(iteration) {
    $(`#${iteration}`).find('.cat__eye').find('span').css('border', '10px solid').css('border-radius', '25%')
}
function eyesType5(iteration) {
    $(`#${iteration}`).find('.cat__eye').find('span').css('border-bottom', '15px solid').css('border-radius', '50%')
}
function eyesType6(iteration) {
    $(`#${iteration}`).find('.cat__eye').find('span').css('border', '5px solid').css('border-radius', '50%')
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