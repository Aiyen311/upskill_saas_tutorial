/* global $, Stripe */ // <-- Says jQuery is defined somewhere else
// Document Key
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-signup-btn');
  
  // Set Stripe key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content')) ;
  
  // Listen for a click in the submit button
  submitBtn.click(function(event){
    
    // Prevent submission behaviour
    event.preventDefault();
    
    // Grey's out the submit button while user is filling the form
    submitBtn.val("Processing...").prop('disabled', true);
  
    // Collect the info in credit card fields
    var ccNum = $('#card_number').val(),
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
      
    // Validate the credit card forms via Stripe JS lib
    var error = false;
    
    // Validate card number, only run if card is valid
    if(!(Stripe.card.validateCardNumber(ccNum))){
      error = true;
       alert('The credit card number appears to be invalid');
    }
    
    //Validate CVC number
    if(!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC number appears to be invalid');
    }
    
    //Validate expiration date.
    if(!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert('The expiration date appears to be invalid');
    }
    
    // Decide whether or not the info collected is sent to stripe
    if(error) {
      //If there are card errors, don't send to Stripe.
      submitBtn.prop('disabled', false).val("Sign Up");
    } else {
      // Send card info to stripe and call the response handler
      Stripe.createToken({
          number: ccNum,
          cvc: cvcNum,
          exp_month: expMonth,
          exp_year: expYear
      }, stripeResponseHandler); 
      
    }
    
    // Exit out the function
    return false;
  });
  
  // Stripe will then return the token
  function stripeResponseHandler(status, response){
    // Get the token from the response
    var token = response.id;
    
    // Inject the card token as a hidden field into the form
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    // Then submit the form to our rails app
    // We are getting the first item in the array 
    theForm.get(0).submit();
  }

});