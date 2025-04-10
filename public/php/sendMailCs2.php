<?php
// Reporting
// TError-Reporting deaktiviern vor Live-Gang
/* error_reporting(E_ALL|E_STRICT); 
*/
error_reporting(0);

if(empty($_POST) || $_POST == "") {
  exit;
};
$formName = $_POST["cs2formname"];
$anrede = $_POST["cs2Anrede"];
$name = $_POST["cs2Name"];
$plz = $_POST["cs2PLZ"];
$email = $_POST["cs2Email"];
$rueckruf = $_POST["cs2RR"];
$phone_number = $_POST["cs2PhoneNum"];
$bewerbungsgrund = $_POST["cs2BwGrund"];
$zeitspanne_moeglicher_beginn = $_POST["cs2Start"];
$datum_moeglicher_beginn = $_POST["cs2StartDate"];
$fuehrungszeugnis = $_POST["cs2Fz"];
$geburtsjahr = $_POST["cs2BirthYear"];
$nation = $_POST["cs2Nation"];
$sprache = $_POST["cs2language"];
$fuehrerschein = $_POST["cs2Fs"];
$gewuenschtes_engagement = $_POST["cs2StdAz"];
$lohnvorstellung_art_der_angabe = $_POST["cs2lohnangabe"];
$lohnvorstellung_hoehe_monatsbrutto = $_POST["cs2Monatsbrutto"];
$lohnvorstellung_hoehe_stundenlohn = $_POST["cs2Stundenlohnangabe"];
$videocall = $_POST["cs2Videocall"];
$bestaetigung_datenschutz = $_POST['cs2Datenschutz'];
$setReCaptcha = $_POST["cs2Recaptcha"];


/* var_dump($_POST);
echo "RESPOSE = ".$setReCaptcha; */

// Verify reCaptcha
// Get user's response and your site key
$response = $_POST['cs2Recaptcha'];
$secret = 'inser_the_secret_key';

// Verify the user's response
$verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$response}");
$captcha_success = json_decode($verify);

if (!$captcha_success->success) {
    // handle your request here
    echo "Bitte bestätigen Sie am Ende des Formulars, dass dieses Formular nicht von einem Roboter abgesendet wurde.<br>Vielen Dank für Ihre Mühe";
    exit;
} 



if (empty($anrede) || empty($name)  || empty($plz)  || empty($email)  || empty($rueckruf)  || empty($bewerbungsgrund)  || empty($zeitspanne_moeglicher_beginn)  || empty($fuehrungszeugnis)  || empty($bestaetigung_datenschutz)  ) {
  echo "Es wurden nicht alle Pflichtfelder übermittelt";
  exit;
}



$formValues = array(
  "Formular" => $formName,
  "Anrede" => $anrede,
  "Name" => $name,
  "PLZ" => $plz,
  "Email" => $email,
  "Rückruferlaubnis" => $rueckruf,
  );

if (!empty($phone_number)) {$formValues["Telefon"] = $phone_number;};
$formValues["Bewerbungsgrund"] = $bewerbungsgrund;
$formValues["Möglicher Beginn"] = $zeitspanne_moeglicher_beginn;
if (!empty($datum_moeglicher_beginn)) {$formValues["Datum möglicher Beginn"] = $datum_moeglicher_beginn;};
$formValues["Führungszeugnis"] = $fuehrungszeugnis;
if (!empty($geburtsjahr)) {$formValues["Geburtsjahr"] = $geburtsjahr;};
if (!empty($nation)) {$formValues["Nationalität"] = $nation;};
if (!empty($sprache)) {$formValues["Sprache(n)"] = $sprache;};
if (!empty($fuehrerschein)) {$formValues["Führerschein"] = $fuehrerschein;};
if (!empty($gewuenschtes_engagement)) {$formValues["Art des Engagements"] = $gewuenschtes_engagement;};
if (!empty($lohnvorstellung_art_der_angabe)) {$formValues["Art der Lohnangabe"] = $lohnvorstellung_art_der_angabe;};
if (!empty($lohnvorstellung_hoehe_monatsbrutto)) {$formValues["Monatsbrutto"] = $lohnvorstellung_hoehe_monatsbrutto;};
if (!empty($lohnvorstellung_hoehe_stundenlohn)) {$formValues["Stundenlohn"] = $lohnvorstellung_hoehe_stundenlohn;};
if (!empty($videocall)) {$formValues["Videocall-Möglichkeit"] = $videocall;};
$formValues["Bestätigung Datenschutz"] = $bestaetigung_datenschutz;

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
    $mail->setFrom('info@haushaltshilfeservice.de', 'Onlinebewerbung || Karin Guth');
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
    $mail->Subject = $formName . " von " . $name;
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
