

var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xc530488a5ba73DeA4db6b7D990438532146ACEC9";

$('#home').click(function() {
    window.location.reload();
  });

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi.kittyContract, contractAddress, {from: accounts[0]});
        user = accounts[0];

        console.log(instance);

        

        
        
        instance.events.Birth().on('data', function(event){
            console.log(event);

            const element = document.getElementById("cattcollapse");
            element.remove();

            var confirmation = document.getElementById("confirmation");
            confirmation.style.display = "block";

            let owner = event.returnValues.owner;
            let kittenId = event.returnValues.kittenId;
            let mumId = event.returnValues.mumId;
            let dadId = event.returnValues.dadId;
            let genes = event.returnValues.genes;
            
            $("#ownerC").text("owner: " + owner)
            $("#IdC").text("kittenId: " + kittenId)
            $("#mIdC").text("mumId: " + mumId)
            $("#dIdC").text("dadId: " + dadId)
            $("#geneC").text("genes: " + genes)
                                    
        })
        
        
    })
})

function createKitty(){
    
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

    console.log(typeof(dna));
    instance.methods.createKittyGenZero(dna).send({}, function(error, txHash){
        if (error){
            console.log(err);
        }
        else {
            console.log(txHash);
        }
    })
}



  




