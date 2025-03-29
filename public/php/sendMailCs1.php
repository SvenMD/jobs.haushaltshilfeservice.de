<?php
// Reporting
// Error-Reporting deaktiviern vor Live-Gang
/* error_reporting(E_ALL|E_STRICT); 
*/
error_reporting(0);

if(empty($_POST) || $_POST == "") {
  exit;
};
$formName = $_POST["cs1formname"];
$name = $_POST["cs1Name"];
$phoneNumber = $_POST["cs1PhoneNum"];
$email = $_POST["cs1Email"];
$bestaetigung_datenschutz = $_POST["cs1datenschutzbestaetigung"];

if (empty($name)  || empty($email)  ||  empty($bestaetigung_datenschutz) || empty($formName) || empty($phoneNumber)) {
  echo "Es wurden nicht alle Pflichtfelder übermittelt";
  exit;
}

$formValues = array(
  "Formular" => $formName,
  "Name" => $name,
  "Email" => $email,
  "Telefon" => $phoneNumber,
  "Zustimmung Datenschutz" => $bestaetigung_datenschutz,
  );


// Empfänger-Email festlegen
$emailTo = 'info@haushaltshilfeservice.de';


$bodyText = '<h2 style="padding: 5 15px; font-family:Arial, sans-serif;">'. $formName . ' von ' . $name . '</h2><hr><br><table style="font-family:Arial, sans-serif;">';
foreach($formValues as $key => $value){
  /* $key=Filterdata($key); $value=Filterdata($value); */
  if ($key == "Formular") continue; // Dienst dazu, den Key (0) (Formularname nicht mit in die  Mail ainzubinden)
 /*  $bodyText .= ('<span style="font-weight: bold; text-transform: uppercase;">' . $key ."</span> : " .$value. "<br>"); */
 $bodyText .=
 ('<tr><td style="padding: 0 15px 5px 0; font-weight: bold; text-transform: uppercase">' . $key . ': </td><td  style="padding: 0 15px 5px 0;">' . $value . '</td></tr>');
};
$bodyText .= ('</table>');

$bodyTextNonHtml = "";
foreach($formValues as $key => $value){
  if ($key == "Formular") continue; // Dienst dazu, den Key (0) (Formularname nicht mit in die  Mail ainzubinden)
  $bodyTextNonHtml .= ($key ." : " .$value. "\n");
}

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require_once '../../vendor/autoload.php';
require '../../classes/Config.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->setLanguage('de', '../vendor/phpmailer/phpmailer/language/phpmailer.lang-de.php');
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = ConfigMail::SMTP_HOST;                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = ConfigMail::SMTP_USERNAME;                     //SMTP username
    $mail->Password   = ConfigMail::SMTP_PASSWORD;                 //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = ConfigMail::SMTP_PORT;                                    // 465 for TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    $mail->CharSet    = "UTF-8";

    //Recipients
    $mail->setFrom('info@haushaltshilfeservice.de', 'Rückruf-Formular || Karin Guth');
    $mail->addAddress($emailTo, 'Karin Guth');     //Add a recipient
    // $mail->addAddress('ellen@example.com');               //Name is optional
    $mail->addReplyTo('info@haushaltshilfeservice.de', 'Karin Guth');
    // $mail->addCC('cc@example.com');
    $mail->addBCC($email, $name);

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = $formName . " von " . $name . " an Karin Guth";
    $mail->Body    = $bodyText;
    $mail->AltBody = $bodyTextNonHtml;

    $mail->send();
    $successMessage = 'success';
    // Rückgabe der $successMessage an ajax zum Erstellen der Message
    if ($successMessage){
      echo "success";
      }else{
          echo "invalid";
      }
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

