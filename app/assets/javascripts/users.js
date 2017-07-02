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
    
    //Collect credit card fields
    var ccNum = $('#card_number').val(), 
        cvcNum = $ ('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
    //Send info to Stripe
    Stripe.createToken({
      number: ccNum, 
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  });
  
  //Stripe will return a card token
  //Inject card token as hidden field into form
  //Submit form to our rails app
  });