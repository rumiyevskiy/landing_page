<?php

/* https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXXXX/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

header('Content-Type: text/html; charset=UTF-8');

/* my telegram_bot */
$token = "7648355172:AAE4jsw4ZfadhgoEezXJyy0X7U4EQwFkkbQ";
$chat_id = "-4588952109";

/* annamax telegram_bot */
// $token = "8197764205:AAE-XbNUdeNg39ufCTNgo5wLMP_8lp75eXw";
// $chat_id = "-1002295760352";




$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$request = $_POST['request'];
$select_type = $_POST['select_type'];
$select_services = $_POST['select_services'];
$privacy = $_POST['privacy'];



$arr = array(
  'Новий запит з сайту: ' => 'Autoelektrikmeister', 
  'Имя користувача: ' => $name,
  'Телефон: ' => $phone,
  'Email' => $email,
  'Повідомлення' => $request,
  'Тип авто' => $select_type,
  'Послуга' => $select_services,
  'Згода' => $privacy  
);

$txt = '';

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".urlencode($value)."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

/* якщо метод fopen даст помилку, то використовуємо нижче */
// $sendToTelegram = file_get_contents("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}");


// Відправка текстового листа на email
$to = "info.autodienst.at@gmail.com";  // Ваша електронна адреса
$subject = "Новий запит з сайту Autoelektrikmeister";  // Тема листа

// Формування текстового повідомлення
$message = "Новий запит з сайту Autoelektrikmeister \n";
$message .= "Ім'я користувача: ".$name."\n";
$message .= "Телефон: ".$phone."\n";
$message .= "Email: ".$email."\n";
$message .= "Повідомлення: ".$request."\n";
$message .= "Тип авто: ".$select_type."\n";
$message .= "Послуга: ".$select_services."\n";
$message .= "Згода: ".$privacy."\n";

// Заголовки для текстового листа
$headers = "From: {$email}" . "\r\n";  // Ваша email-адреса для відправлення

// Відправка email
if (mail($to, $subject, $message, $headers)) {
  if ($sendToTelegram) {
    // Якщо повідомлення в Telegram і email відправлено, показуємо спливаюче вікно
    echo "<script type='text/javascript'>
              alert('Letter sent!');
              // window.location.href = 'thank-you.html';  // Перенаправлення на сторінку подяки
          </script>";
  } else {
    echo "Помилка при відправці повідомлення в Telegram.";
  }
} else {
  echo "Помилка при відправці листа на email.";
}

// *****************************
  // if ($sendToTelegram) {
  //   echo "<script type='text/javascript'>
  //             alert('Letter sent!');
  //         </script>";
  // } else {
  //   echo "Error";
  // }

?>