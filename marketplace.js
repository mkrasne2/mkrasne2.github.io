var web3 = new Web3(Web3.givenProvider);

var personalInstance;
var marketInstance;
var pUser;
var mUser;
var kittyAddress = "0xc530488a5ba73DeA4db6b7D990438532146ACEC9";
var marketAddress = "0x89346827c5EDa6C6cBc8Be2e38937aee6940CC84";



$('#marketplace').click(function() {
    window.location.reload();
  });

  function goBack(){
    window.location.reload();               
}


$(document).ready(function(){
    
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi.kittyContract, kittyAddress, {from: accounts[0]});
        marketInstance = new web3.eth.Contract(abi.marketplace, marketAddress, {from: accounts[0]});

        
        
        
        console.log(instance);
        console.log(marketInstance);
        

        var num;
        var arr = [];
        var totalSupply;

        instance.methods.totalSupply().call({}, function(error, value){
            if (error){
                console.log(err);
            }
            else {
                console.log(value);
                totalSupply = value;
                for (let i = 0; i < totalSupply; i++){

                    marketInstance.methods.getOffer(i).call({}, async function(error, value){
                        if(!error){
                            if(value.active == true){

                            console.log(value);
                            let cost = Web3.utils.fromWei(value.price, 'ether');
                            let price = cost;
                
                                
                                instance.methods.getKitty(i).call({}, async function(error, value){
                                    if(!error){

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

                                        

                                        var eyesh = last.slice(0, 1);
                                        var decpatsh = Number(last[1]);
                                        var decmidsh = Number(last[2]);
                                        var decsidesh = Number(last[3]);
                                        var animationsh = value.genes.slice(18, 19);
                                        var lastnumsh = value.genes.slice(19, 20);
                                        
                                        
                                            
                                       
                                        
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

                                        $(`#${i}`).find('.card-text').text('Kitten ID: ' + `${i}` + ', Gen: ' + `${value.generation}`)
                                       
                                        $(`#${i}`).find('#salePrice').text('Cost: ' + price + ' Ether')
                                        
                                        
                                        

                                        
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

    function viewKitty(id){
        
        
        console.log(id);
        const element = document.getElementById("collapse1");
        element.remove();  
        
        var detail = document.getElementById("kittyDetail");
        detail.style.display = "block";

        window.ethereum.enable().then(function(accounts){
            instance = new web3.eth.Contract(abi.kittyContract, kittyAddress, {from: accounts[0]});
            user = accounts[0];
            let checkOwner;
            let buyPrice;

            marketInstance.events.MarketTransaction().on('data',  function(event){
                
                console.log(event);
                window.location.href = "collection.html";
                                        
            })

            instance.methods.getKitty(id).call({}, async function(error, value){
                if(!error){

                    console.log(value);

                    marketInstance.methods.getOffer(id).call({}, async function(error, success){
                        if(!error){
                            console.log(success);
                            let cost = Web3.utils.fromWei(success.price, 'ether');
                            let price = cost;
                            let owner = success.seller.toLowerCase();
                            console.log(owner);

                   
                    var last = value.genes.slice(value.genes.length - 6, value.genes.length);
                    var first = value.genes.slice(0, value.genes.length - 7);

                    
                    
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

                    

                    var eyesh = last.slice(0, 1);
                    var decpatsh = Number(last[1]);
                    var decmidsh = Number(last[2]);
                    var decsidesh = Number(last[3]);
                    var animationsh = value.genes.slice(18, 19);
                    var lastnumsh = value.genes.slice(19, 20);

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

                    $("#kittyDetail").find('#kittenK').text('Generation: ' + value.generation)
                    $("#kittyDetail").find('#geneK').text('ID: ' + id)
                    $("#kittyDetail").find('#fatherK').text('Father: ' + dad)
                    $("#kittyDetail").find('#motherK').text('Mother: ' + mom)
                    $("#kittyDetail").find('#birthtimeK').text('Birth Time: ' + time)
                    $("#kittyDetail").find('#ownK').text('Owner: ' + value.owner)
                    $("#kittyDetail").find('#priceK').text('Price: ' + price + ' Ether.')
                    if(user == owner){
                        $("#kittyDetail").find('#purchaseCat').text('You already own this cat. Remove offer?')
                        checkOwner = user;
                    }
                    buyPrice = price;
                    
                    $("#kittyDetail").find("#dnabody").html(`${headcolor}`)
                    $("#kittyDetail").find("#dnamouth").html(`${mouthcolor}`)
                    $("#kittyDetail").find("#dnaeyes").html(`${eyescolor}`)
                    $("#kittyDetail").find("#dnaears").html(`${earcolor}`)
                    $("#kittyDetail").find("#dnadots").html(`${dotcolor}`)
                    $("#kittyDetail").find("#dnapaws").html(`${pawcolor}`)
                    $("#kittyDetail").find("#dnatail").html(`${tailcolor}`)

                    $("#kittyDetail").find("#dnashape").html(`${eyesh}`)
                    $("#kittyDetail").find("#dnadecoration").html(`${decpatsh}`)
                    $("#kittyDetail").find("#dnadecorationMid").html(`${decmidsh}`)
                    $("#kittyDetail").find("#dnadecorationSides").html(`${decsidesh}`)
                    $("#kittyDetail").find("#dnaanimation").html(`${animationsh}`)
                    $("#kittyDetail").find("#dnaspecial").html(`${lastnumsh}`)

                    
                    $("#kittyDetail").find('.cat__head, .cat__chest').css('background', '#' + head)
                    $("#kittyDetail").find('.cat__ear--left, .cat__ear--right').css('background', '#' + ear)
                    $("#kittyDetail").find('.cat__mouth-contour').css('background', '#' + mouth)
                    $("#kittyDetail").find('.cat__eye span.pupil-left, .cat__eye span.pupil-right').css('background', '#' + eye)
                    $("#kittyDetail").find('.cat__head-dots, .cat__head-dots_first, .cat__head-dots_second').css('background', '#' + dot)
                    $("#kittyDetail").find('.cat__paw-left, .cat__paw-right').css('background', '#' + paw)
                    $("#kittyDetail").find('.cat__tail').css('background', '#' + tail)
                    eyeVariant(eyesh, "kittyDetail");
                    
                    
                    
                    
                    
                    if(decpatsh == 1){
                        
                        $("#kittyDetail").find('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%"})
                        $("#kittyDetail").find('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
                        $("#kittyDetail").find('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
                        
                    }if(decpatsh==2){
                        
                        $("#kittyDetail").find('.cat__head-dots').css({  "width": "16px"})
                        $("#kittyDetail").find('.cat__head-dots_first').css({ "width": "16px" })
                        $("#kittyDetail").find('.cat__head-dots_second').css({ "width": "16px" })
                    } if(decpatsh==3){
                        
                        $("#kittyDetail").find('.cat__head-dots').css({  "width": "8px"})
                        $("#kittyDetail").find('.cat__head-dots_first').css({ "width": "8px" })
                        $("#kittyDetail").find('.cat__head-dots_second').css({ "width": "8px" })
                    }

                    if(decmidsh == 1){
                        
                        $("#kittyDetail").find('.cat__head-dots').css({ "height": "48px"})
                        
                    }if(decmidsh==2){
                        
                        $("#kittyDetail").find('.cat__head-dots').css({ "height": "55px"})
                    } if(decmidsh==3){
                        
                        $("#kittyDetail").find('.cat__head-dots').css({ "height": "30px"})
                    }
                    
                    if(decsidesh == 1){
                        
                        $("#kittyDetail").find('.cat__head-dots_first').css({ "height": "35px"})
                        $("#kittyDetail").find('.cat__head-dots_second').css({ "height": "35px"})
                        
                    }if(decsidesh==2){
                        
                        $("#kittyDetail").find('.cat__head-dots_first').css({ "height": "65px"})
                        $("#kittyDetail").find('.cat__head-dots_second').css({ "height": "65px"})
                    } if(decsidesh==3){
                        
                        $("#kittyDetail").find('.cat__head-dots_first').css({ "height": "15px"})
                        $("#kittyDetail").find('.cat__head-dots_second').css({ "height": "15px"})
                    }
                    
                    if(animationsh == 1){
                        
                        $("#kittyDetail").find("#head").removeClass("movingHead")
                        $("#kittyDetail").find("#nose").removeClass("eyeSide")
                        $("#kittyDetail").find('#tail').removeClass("tailMove")
                        
                    }if(animationsh==2){
                        $("#kittyDetail").find("#nose").removeClass("eyeSide")
                        $("#kittyDetail").find('#tail').removeClass("tailMove")
                        $("#kittyDetail").find("#head").addClass("movingHead")
                        

                    } 
                    
                    if(animationsh==3){
                        $("#kittyDetail").find("#head").removeClass("movingHead")
                        $("#kittyDetail").find('#tail').removeClass("tailMove")
                        $("#kittyDetail").find('#nose').addClass("eyeSide")
                        
                    }
                    
                    if(animationsh==4){
                        $("#kittyDetail").find("#head").removeClass("movingHead")
                        $("#kittyDetail").find("#nose").removeClass("eyeSide")
                        $("#kittyDetail").find('#tail').addClass("tailMove")
                    }


                    $("#kittyDetail").find('.dnaDiv').text('DNA: ' + value.genes)
                    
                    
                    
                }
            })
                    
                } 
            })

            $('#purchaseCat').click(function() {
                
                console.log(checkOwner);
                if(checkOwner == user){

                    marketInstance.methods.removeOffer(id).send({}, function(error, value){
                        if (!error){
                            console.log(value);
                            window.location.reload();
                            
                        }
                       
                    })
                } else if (checkOwner != user){
                    var amount = web3.utils.toWei(buyPrice, "ether");
                    marketInstance.methods.buyKitty(id).send({value: amount}, function(error, value){
                        if (!error){
                            console.log(value);
                            
                            
                        }
                       
                    })

                }
                
              });

              
        })
        
    }

    

   
    
    
