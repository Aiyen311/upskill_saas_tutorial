/* global $, Stripe */
//Document Ready
$(document).on('turbolinks:load', function (){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-signup-btn');
  //Set Stripe Public Key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') ); 
  
  //When user clicks submit btn, 
  submitBtn.click(function(event){
    //prevent deault submission behavior
    event.preventDefault();
    submitBtn.val("Processing...").prop('disabled', true);
    
    //Collect credit card fields
    var ccNum = $('#card_number').val(), 
        cvcNum = $ ('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    
    //Use Stripe js library to check card errors
    var error = false;
    
    //Validate card number
    if(!Stripe.card.validateCardNumber(ccNum)){
      error = true;
      alert("The credit card number appears to be invalid");
    }
    //Validate CVC number
    if(!Stripe.card.validateCVC(cvcNum)){
      error = true;
      alert("The CVC number appears to be invalid");
    }
    //Validate expiry date
    if(!Stripe.card.validateExpiry(expMonth, expYear)){
      error = true;
      alert("The expiration date appears to be invalid");
    }

    
    //Send info to Stripe
    if (error) {
      //If there are errors, don't send to stripe
      submitBtn.prop('disabled', false).val("Sign Up");
    } else {
      Stripe.createToken({
        number: ccNum, 
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    return false;
  
  });
  
  //Stripe will return a card token
  function stripeResponseHandler(status, response){
    //Get token from response
    var token = response.id;
    
    //Inject card token in hidden field
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    //Submit form to our rails app
    theForm.get(0).submit();
  }
});