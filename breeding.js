var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x075796d08D0d9d2Be09589b0c046D70C5C1fc542";


$('#breeders').click(function() {
    window.location.reload();
  });

$(document).ready(function(){
    
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi.kittyContract, contractAddress, {from: accounts[0]});
        user = accounts[0];
        let arr = [];
        let newArr = [];
        let num;
        let id;
        $("#createable2").attr("style", "display:none");
        $("#newKittyDisplay").attr("style", "display:block");
        $("#containerFill").attr("style", "display:none");
        
        
   

    instance.methods.balanceOf(user).call({}, function(error, value){
        if (error){
            console.log(err);
        }
        else {
            console.log(value);
            num = value;
            
        }
    })
    

    instance.methods.totalSupply().call({}, function(error, value){
        
        if (error){
            console.log(err);
        }
        else {
            
            console.log(value - 1);
            
            totalSupply = value - 1;
            for (let i = 1; i <= totalSupply; i++){

                instance.methods.ownerOf(i).call({}, function(error, value){
                    if (error){
                        console.log(err);
                    }
                    else {
                        arr.push((value.toLowerCase() == user)? i : null);
                        
                        
                        if(arr.length == num){
                            
                            id = arr[arr.length - 1];
                            console.log(id);
                            instance.methods.getKitty(id).call({}, async function(error, value){
                                if(!error){
                                    
                                    var d = new Date();
                                    d.setMinutes(d.getMinutes()-15);
                                    
                                    if(Math.round(Number(d)/1000) < Number(value.birthTime)){
                                        

                                        var last = value.genes.slice(value.genes.length - 6, value.genes.length);
                                        var first = value.genes.slice(0, value.genes.length - 7);

                                        
                                        //var color = value.genes.slice(12, 14);
                                        var headcolor = value.genes.slice(0, 2);
                                        var mouthcolor = value.genes.slice(2, 4);
                                        var eyescolor = value.genes.slice(4, 6);
                                        var earcolor = value.genes.slice(6, 8);
                                        var dotcolor = value.genes.slice(8, 10);
                                        var pawcolor = value.genes.slice(10, 12);
                                        var tailcolor = value.genes.slice(12, 14);

                                        var head = colors[headcolor];
                                        var mouth = colors[mouthcolor];
                                        var eye = colors[eyescolor];
                                        var ear = colors[earcolor];
                                        var dot = colors[dotcolor];
                                        var paw = colors[pawcolor];
                                        var tail = colors[tailcolor];

                                        //"headcolor" 
                                        //"mouthcolor" 
                                        //"eyescolor" 
                                        //"earcolor"
                                        //"dotcolor" 
                                        //"pawcolor" 
                                        //"tailcolor" 
                                        
                                        //"eyesShape" 
                                        //"decorationPattern" 
                                        //"decorationMidcolor" 
                                        //"decorationSidescolor" 
                                        //"animation" 
                                        //"lastNum"

                                        var eyesh = last.slice(0, 1);
                                        var decpatsh = Number(last[1]);
                                        var decmidsh = Number(last[2]);
                                        var decsidesh = Number(last[3]);
                                        var animationsh = value.genes.slice(18, 19);
                                        var lastnumsh = value.genes.slice(19, 20);
                                        
                                    
                                        $("#containerFill").attr("style", "display:block");
                                        $("#creatable2").clone().appendTo(".row").attr("id", i).attr("style","display:block");
                                        $("#newKittyDisplay").attr("style", "display:none");
                                        $(`#${i}`).find("#viewcat").attr("id", "viewcat"+i);
                                        $(`#${i}`).find("#viewcat"+i).attr("onclick", "viewKitty("+i+")");
                                        $(`#${i}`).find("#breedcat").attr("id", "breedcat"+i);
                                        $(`#${i}`).find("#breedcat"+i).attr("onclick", "breedKitty("+i+")");
                                        $(`#${i}`).find('.cat__head, .cat__chest').css('background', '#' + head)
                                        $(`#${i}`).find('.cat__ear--left, .cat__ear--right').css('background', '#' + ear)
                                        $(`#${i}`).find('.cat__mouth-contour').css('background', '#' + mouth)
                                        $(`#${i}`).find('.cat__eye span.pupil-left, .cat__eye span.pupil-right').css('background', '#' + eye)
                                        $(`#${i}`).find('.cat__head-dots, .cat__head-dots_first, .cat__head-dots_second').css('background', '#' + dot)
                                        $(`#${i}`).find('.cat__paw-left, .cat__paw-right').css('background', '#' + paw)
                                        $(`#${i}`).find('.cat__tail').css('background', '#' + tail)
                                        eyeVariation(eyesh, i)

                                        
                                        
                                        
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

                                        $(`#${i}`).find('.card-text').text('Kitten ID: ' + `${i}` )
                                        var a = new Date(value.birthTime * 1000);
                                        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                                        var year = a.getFullYear();
                                        var month = months[a.getMonth()];
                                        var date = a.getDate();
                                        var hour = a.getHours();
                                        var min = a.getMinutes();
                                        var sec = a.getSeconds();
                                        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;

                                        let mom;
                                        if (value.generation == 0){
                                            mom = 'The creater purrrrself'
                                        } else {
                                            mom = value.mumId;
                                        }
                                        let dad;
                                        if (value.generation == 0){
                                            dad = 'The creater purrrrself'
                                        } else {
                                            dad = value.dadId;
                                        }

                                        $(`#${i}`).find('#gen').text('Generation: ' + value.generation)
                                        $(`#${i}`).find('#gene').text('Genes: '+ value.genes)
                                        $(`#${i}`).find('#father').text('Father: ' + dad)
                                        $(`#${i}`).find('#mother').text('Mother: ' + mom)
                                        $(`#${i}`).find('#birthtime').text('Birth Time: ' + time)
                                    } 
                                }
                            })
                        }
                        
                    }
                })

                   
               
            }
        }
    })
    
        
    })

    
})



