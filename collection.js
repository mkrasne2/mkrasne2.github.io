var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xc530488a5ba73DeA4db6b7D990438532146ACEC9";
var marketAddress = "0x89346827c5EDa6C6cBc8Be2e38937aee6940CC84";
let breedCats = [];
let breedCatsId = [];
let genID = [];
let birthK = false;
let idK = 0;
let newId = 0;



$('#collect').click(function() {
    window.location.reload();
  });

  function goBack(){
    window.location.reload();               
}


$(document).ready(function(){
    
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi.kittyContract, contractAddress, {from: accounts[0]});
        marketInstance = new web3.eth.Contract(abi.marketplace, marketAddress, {from: accounts[0]});
        user = accounts[0];
        birthK = false;
        idK = 0;
        newId = 0;
        let isApproved = false;
                var dna = document.getElementById("attributes");
                    dna.style.display = "none";

        console.log(instance);
        console.log(marketInstance);

        instance.methods.isApprovedForAll(accounts[0], marketAddress).call({}, function(error, value){
             if (value==true) {
                isApproved = true;
                console.log(value);
                doThis(isApproved);
            } if (value == false){
                isApproved = false;
                console.log(value);
                doThis(isApproved);
            }
            
        })

        $('#authMarket').click(function() {
            let input = false;
            if (isApproved == false){
                input = true;
            }
            instance.methods.setApprovalForAll(marketAddress, input).send({}, function(error, value){
                if (!error){
                console.log(value);
                
                    window.location.reload();
            
                 } else {
                     console.log(error);
                 }
          
              })


          });

          function doThis(item){
            if (item == true){
                $("#authMessage").html("You can click the button below to remove selling authorization from the marketplace at any time.")
                $("#authMarket").html("Remove Authorization")
                let element = document.getElementById("authMarket");
                element.style.backgroundColor = "red";
                $("#sellcat").attr("style","display:block")
          } else if (item == false){
                $("#authMessage").html("You cannot sell your kitties until you have authorized the marketplace to do so. Would you like to authorize now?")
                $("#authMarket").html("Authorize Marketplace")
                let element = document.getElementById("authMarket");
                element.style.backgroundColor = "green";
                $("#sellcat").attr("style","display:none")
          }
          }
          
        
        
        var num;
        var arr = [];
        var totalSupply;



        instance.methods.balanceOf(user).call({}, function(error, value){
            if (error){
                console.log(err);
            }
            else {
                console.log(value);
                num = value;
            }
        })

        instance.methods.totalSupply().call({}, function(error, supply){
            if (error){
                console.log(err);
            }
            else {
                console.log(supply);
                totalSupply = supply;
                for (let i = 0; i < totalSupply; i++){

                    instance.methods.ownerOf(i).call({}, async function(error, owner){
                        if (error){
                            console.log(err);
                        }
                        else {
                            arr.push((owner.toLowerCase() == user)? i : null);
                            if(owner.toLowerCase() == user){
                                
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
                                        var isActive = false;
                                        var activePrice;
                                        
                                        marketInstance.methods.getOffer(i).call({}, function(error, offer){
                                            if (!error){
                                                console.log(offer.active);
                                                isActive = offer.active;
                                                activePrice = offer.price;
                                                if (isActive == true){
                                                    changeThis(activePrice);
                                                }
                                            }
                                           
                                        })
                                    
                                        function changeThis(price){
                                            $("#sellcat" + `${i}`).html("For Sale");
                                            $("#sellcat" + `${i}`).attr("style", "border-color: red; color: red");
                                            
                                            console.log(price);
                                        }
                                            
                                       
                                        
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
                                       
                                       
                                        
                                        
                                        

                                        
                                    }
                                })
                               
                            }
                            
                        }
                    })

                       
                   
                }
            }
        })

        instance.events.Birth().on('data', async function(event){
            
            console.log(event);
            birthK = true;
            idK = event.returnValues.genes;
            newId = event.returnValues.kittenId;
            
            sessionStorage.setItem("newCat", idK);
            sessionStorage.setItem("newCatId", newId);
            window.location.href = "breeding.html";
                                    
        })

        
        
        
        
        
        
    })

     
        
    })

    function viewKitty(id){
        
        
        console.log(id);
        const element = document.getElementById("collapse1");
        element.remove();  
        
        var detail = document.getElementById("kittyDetail");
        detail.style.display = "block";

                    var dna = document.getElementById("attributes");
                    dna.style.display = "block";

        window.ethereum.enable().then(function(accounts){
            instance = new web3.eth.Contract(abi.kittyContract, contractAddress, {from: accounts[0]});
            user = accounts[0];

            instance.methods.getKitty(id).call({}, function(error, value){
                if(!error){

                    console.log(value.genes);
                   
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

                    

                    var eyesh = Number(last.slice(0, 1));
                    console.log(eyesh);
                    var decpatsh = Number(last[1]);
                    var decmidsh = Number(last[2]);
                    var decsidesh = Number(last[3]);
                    var animationsh = value.genes.slice(18, 19);
                    console.log(animationsh);
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
                    $("#kittyDetail").find("#dnaanimation1").html(`${Number(animationsh)}`)
                    
                    $("#kittyDetail").find("#dnaspecial").html(`${lastnumsh}`)

                    
                    $("#kittyDetail").find('.cat__head, .cat__chest').css('background', '#' + head)
                    $("#kittyDetail").find('.cat__ear--left, .cat__ear--right').css('background', '#' + ear)
                    $("#kittyDetail").find('.cat__mouth-contour').css('background', '#' + mouth)
                    $("#kittyDetail").find('.cat__eye span.pupil-left, .cat__eye span.pupil-right').css('background', '#' + eye)
                    $("#kittyDetail").find('.cat__head-dots, .cat__head-dots_first, .cat__head-dots_second').css('background', '#' + dot)
                    $("#kittyDetail").find('.cat__paw-left, .cat__paw-right').css('background', '#' + paw)
                    $("#kittyDetail").find('.cat__tail').css('background', '#' + tail)
                    eyeVariant(eyesh, "kittyDetail");
                    
                    
                    
                    
                    
                    
                    

                    
                    console.log(animationsh);
                   
                    
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

                    
                    $("#kittyDetail").find('.dnaDiv').text('DNA: '+ value.genes)
                    
                    
                    

                    
                }
            })
        })
        
    }

    async function breedKitty(event){
        
        console.log(event);
        
        
        
        window.ethereum.enable().then(function(accounts){
            instance = new web3.eth.Contract(abi.kittyContract, contractAddress, {from: accounts[0]});
            user = accounts[0];

            instance.methods.getKitty(event).call({}, async function(error, value){
                if(!error){
                            if (breedCatsId[breedCatsId.length - 1] != event){

                                breedCatsId.push(event);
                                breedInit();
                            } else {
                                $('#myModal').modal('show')
                                $('#exampleModalLongTitle').text('Cats cannot breed themselves, silly!')
                                $('#dontSell').text('Start over')
                                $('#dontSell').click(function() {
                                    window.location.reload();
                                  });
                                  $('#myModal').on('hidden.bs.modal', function () {
                                    window.location.reload();
                                  })
                            }
                            
                            
                }
            })
        })
        
    }

    function breedInit(){
        
        
        if((breedCatsId.length) % 2 == 0){
            
            
                
    
            instance.methods.breedKitty(breedCatsId[breedCatsId.length - 1], breedCatsId[breedCatsId.length - 2]).send({}, async function(error, value){
                if (error){
                    console.log(err);
                }
                else {
                    console.log(value);
                    
                    
                    
                }
            })
            
        } else {
            $('#myModal').modal('show')
        }
        
    }
    
    function sellcat(id){
        
        
        
        const element = document.getElementById("collapse1");
        element.remove();  
        
        var detail = document.getElementById("kittyDetail");
        detail.style.display = "block";

        window.ethereum.enable().then(function(accounts){
            instance = new web3.eth.Contract(abi.kittyContract, contractAddress, {from: accounts[0]});
            marketInstance = new web3.eth.Contract(abi.marketplace, marketAddress, {from: accounts[0]});
            console.log(marketInstance);
            user = accounts[0];

            instance.methods.getKitty(id).call({}, async function(error, value){
                if(!error){

                    console.log(value.genes);
                    var dna = document.getElementById("catDNA");
                    dna.style.display = "none";

                    var form = document.getElementById("form");
                    form.style.display = "block";
                    $("#form").find('#geneK').text('Cat ID: ' + id)
                    
                   
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
                    eyeVariation(eyesh, id)

                    
                    
                    
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
                        
                        $("#kittyDetail").find("#head").addClass("movingHead")

                    } if(animationsh==3){
                        
                        $("#kittyDetail").find('#nose').addClass("eyeSide")
                    }
                    
                    if(animationsh==4){
                        
                        $("#kittyDetail").find('#tail').addClass("tailMove")
                    }


                    $("#kittyDetail").find('.dnaDiv').text(value.genes)

                    marketInstance.methods.getOffer(id).call({}, function(error, value){
                        if (!error){
                            console.log(value.active);
                            
                            if (value.active == true){
                                
                                cancelOption(value.price);
                            }
                        }
                       
                    })
                    let offerActive = false;

                    function cancelOption(price){
                        $("#sellingA").html("You are already selling this cat. Click the button below to remove your offer for: "+ price + " Ether.")
                        $("#sellingA").attr("style", "display:block; margin-top: 10px")
                        $("#catPrice").attr("style", "display:none")
                        $("#moneySign").attr("style", "display:none")
                        $("#submitSale").attr("style", "border-color: red; color: red");
                        $("#submitSale").html("Remove from Sale");
                        offerActive = true;
                    }
                    
                    
                        $('#submitSale').click(function() {
                            if(offerActive == true){
                                marketInstance.methods.removeOffer(id).send({}, function(error, value){
                                    if (!error){
                                        console.log(value);
                                        window.location.reload();
                                        
                                    }
                                   
                                })
                            }
                            if (offerActive == false){
                                var price = document.getElementById('catPrice').value;
                                var amount = web3.utils.toWei(price, "ether");
                                if (amount > 0){
                                
                                marketInstance.methods.setOffer(amount, id).send({}, function(error, value){
                                    if (!error){
                                        console.log(value);
                                        window.location.reload();
                                        
                                    }
                                   
                                })
                            }
                            
                            }
                            
                          });
                    
                    
                    
                    
                    
                     
                    
                }
            })
        })
        
    }
