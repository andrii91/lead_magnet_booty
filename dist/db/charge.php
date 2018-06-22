<?php require_once('stripe/config.php');  

	$token  = $_POST['stripeToken'];
  $email  = $_POST['stripeEmail'];

  $customer = \Stripe\Customer::create(array(
      'email' => $email,
      'source'  => $token
  ));

  $charge = \Stripe\Charge::create(array(
      'customer' => $customer->id,
      'amount'   => 100,
      'currency' => 'usd'
  ));

  echo '<h1>Successfully charged $1.00!</h1>';