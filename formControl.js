 // Live check for password validity
 var check = function() {
    const campoPassword = document.getElementById('password')
    const campoVerificaPassword = document.getElementById('password2')
    var divError = document.getElementById('warningToUserPasswordNotGood');
    var divRight = document.getElementById('warningToUserAppearPasswordGood');

    if (document.getElementById('password').value ==
      document.getElementById('password2').value && document.getElementById('password2').value.length >18 ) {
      //campoPassword.style.backgroundColor = "#baf5ba";
      //campoVerificaPassword.style.backgroundColor = "#baf5ba";
      divError.style.visibility = 'hidden';
      divRight.style.visibility = 'visible';
    } 
    
    else {
        // There's an error
        divError.style.visibility = 'visible';
        divRight.style.visibility = 'hidden';
    }
  }


  var checkWithdraw = function() {
    // Check the Withdraw panel data
    const passwordWithdraw = document.getElementById('passwordWithdraw')
    const verificationNumberWithdraw = document.getElementById('verificationNumberWithdraw')
    
    var divErrorWithdraw = document.getElementById('warningToUserPasswordNotGoodWithdraw');
    var divRightWithdraw = document.getElementById('warningToUserAppearPasswordGoodWithdraw');

    if (document.getElementById('passwordWithdraw').value.length >18 && verificationNumberWithdraw.value >= 1) {
    
      divErrorWithdraw.style.visibility = 'hidden';
      divRightWithdraw.style.visibility = 'visible';
    } 
    
    else {
        // There's an error
        divErrorWithdraw.style.visibility = 'visible';
        divRightWithdraw.style.visibility = 'hidden';
    }
  }
