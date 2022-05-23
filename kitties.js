

var web3 = new Web3(Web3.givenProvider);

var instance;
var marketInstance;
var user;
var contractAddress = "0xc530488a5ba73DeA4db6b7D990438532146ACEC9";
var marketAddress = "0x89346827c5EDa6C6cBc8Be2e38937aee6940CC84";

$('#kitties').click(function() {
    window.location.reload();
  });

  $('#enterApp').click(function() {
    window.location.href = "index.html";
  });

$(document).ready(function(){

    
        let displayArr = ["67753260358383412221", "80834860864121611231", "92389278598215233241"];
        let rotate = -15;
                for (let i = 0; i < 3; i++){

                                
                                let value = displayArr[i];
                                

                                        var last = value.slice(value.length - 6, value.length);
                                        var first = value.slice(0, value.length - 7);

                                        
                                        //var color = value.genes.slice(12, 14);
                                        var headcolor = value.slice(0, 2);
                                        var mouthcolor = value.slice(2, 4);
                                        var eyescolor = value.slice(4, 6);
                                        var earcolor = value.slice(6, 8);
                                        var dotcolor = value.slice(8, 10);
                                        var pawcolor = value.slice(10, 12);
                                        var tailcolor = value.slice(12, 14);

                                        var head = colors[headcolor];
                                        var mouth = colors[mouthcolor];
                                        var eye = colors[eyescolor];
                                        var ear = colors[earcolor];
                                        var dot = colors[dotcolor];
                                        var paw = colors[pawcolor];
                                        var tail = colors[tailcolor];

                                        

                                        var eyesh = last.slice(0, 1);
                                        var decpatsh = Number(last[1]);
                                        var decmidsh = Number(last[2]);
                                        var decsidesh = Number(last[3]);
                                        var animationsh = value.slice(18, 19);
                                        var lastnumsh = value.slice(19, 20);
                                        
                                        
                                       
                                        $("#creatable").clone().appendTo(".row").attr("id", i).attr("style","display:block");
                                        $(`#${i}`).find("#viewcat").attr("id", "viewcat"+i);
                                        $(`#${i}`).find("#viewcat"+i).attr("onclick", "viewKitty("+i+")");
                                        $(`#${i}`).find("#breedcat").attr("id", "breedcat"+i);
                                        $(`#${i}`).find("#breedcat"+i).attr("onclick", "breedKitty("+i+")");
                                        $(`#${i}`).find("#sellcat").attr("id", "sellcat"+i);
                                        $(`#${i}`).find("#sellcat"+i).attr("onclick", "sellcat("+i+")");
                                        $(`#${i}`).find('.cat__head, .cat__chest').css('background', '#' + head)
                                        $(`#${i}`).find('.cat__ear--left, .cat__ear--right').css('background', '#' + ear)
                                        $(`#${i}`).find('.cat__mouth-contour').css('background', '#' + mouth)
                                        $(`#${i}`).find('.cat__eye span.pupil-left, .cat__eye span.pupil-right').css('background', '#' + eye)
                                        $(`#${i}`).find('.cat__head-dots, .cat__head-dots_first, .cat__head-dots_second').css('background', '#' + dot)
                                        $(`#${i}`).find('.cat__paw-left, .cat__paw-right').css('background', '#' + paw)
                                        $(`#${i}`).find('.cat__tail').css('background', '#' + tail)
                                        $(`#${i}`).find('.cat').attr("style","transform:rotate("+`${rotate}`+"deg)").css("margin-top", "50%");
                                        if(i == 2){
                                            $(`#${i}`).find('.cat__eye').find('span').css('border-left', '15px solid').css('border-right', '15px solid').css('border-radius', '50%')
                                        }
                                        if(i == 1){
                                            $(`#${i}`).find('.cat').attr("style","transform:scale(1.3)").css("margin-top", "25%");
                                            $(`#${i}`).find('.cat__eye').find('span').css('border-top', '15px solid').css('border-bottom', '15px solid').css('border-radius', '50%')
                                        }
                                        rotate += 15;
                                        eyeVariant(eyesh, i)

                                        
                                        
                                        
                                        if(decpatsh == 1){
                                            
                                            $(`#${i}`).find('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%"})
                                            $(`#${i}`).find('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
                                            $(`#${i}`).find('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
                                            
                                        }if(decpatsh==2){
                                            
                                            $(`#${i}`).find('.cat__head-dots').css({  "width": "16px"})
                                            $(`#${i}`).find('.cat__head-dots_first').css({ "width": "16px" })
                                            $(`#${i}`).find('.cat__head-dots_second').css({ "width": "16px" })
                                        } if(decpatsh==3){
                                            
                                            $(`#${i}`).find('.cat__head-dots').css({  "width": "8px"})
                                            $(`#${i}`).find('.cat__head-dots_first').css({ "width": "8px" })
                                            $(`#${i}`).find('.cat__head-dots_second').css({ "width": "8px" })
                                        }

                                        if(decmidsh == 1){
                                            
                                            $(`#${i}`).find('.cat__head-dots').css({ "height": "48px"})
                                            
                                        }if(decmidsh==2){
                                            
                                            $(`#${i}`).find('.cat__head-dots').css({ "height": "55px"})
                                        } if(decmidsh==3){
                                            
                                            $(`#${i}`).find('.cat__head-dots').css({ "height": "30px"})
                                        }
                                        
                                        if(decsidesh == 1){
                                            
                                            $(`#${i}`).find('.cat__head-dots_first').css({ "height": "35px"})
                                            $(`#${i}`).find('.cat__head-dots_second').css({ "height": "35px"})
                                            
                                        }if(decsidesh==2){
                                            
                                            $(`#${i}`).find('.cat__head-dots_first').css({ "height": "65px"})
                                            $(`#${i}`).find('.cat__head-dots_second').css({ "height": "65px"})
                                        } if(decsidesh==3){
                                            
                                            $(`#${i}`).find('.cat__head-dots_first').css({ "height": "15px"})
                                            $(`#${i}`).find('.cat__head-dots_second').css({ "height": "15px"})
                                        }
                                        
                                        if(animationsh == 1){
                                            
                                            $(`#${i}`).find("#head").removeClass("movingHead")
                                            $(`#${i}`).find("#nose").removeClass("eyeSide")
                                            $(`#${i}`).find('#tail').removeClass("tailMove")
                                            
                                        }if(animationsh==2){
                                            
                                            $(`#${i}`).find("#head").addClass("movingHead")

                                        } if(animationsh==3){
                                            
                                            $(`#${i}`).find('#nose').addClass("eyeSide")
                                        }
                                        
                                        if(animationsh==4){
                                            
                                            $(`#${i}`).find('#tail').addClass("tailMove")
                                        }

                                        
                                       
                                       
                                        
                                        
                                        

                                        
                                 
                               
                            

                       
                   
                }
        
        
        
        
        
   
})





  




