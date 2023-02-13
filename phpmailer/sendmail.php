<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

// От кого письмо
$mail->setFrom('alexandrz071@mail.ru', 'Форма обратной связи на сайте');
// Кому отправить (можно указать несколько адресатов)
$mail->addAddress('alexandrz071@mail.ru');
// Тема письма
$mail->Subject = 'Сообщение от формы обратной связи на сайте';

// Тело письма
$body = '<h1> Письмо с сайта </h1>';
if (trim(!empty($_POST['name']))){
	$body.=' <p><strong>Имя:</strong> '.$_POST['name']. '</p>';
}
if (trim(!empty($_POST['email']))){
	$body.=' <p><strong>E-mail:</strong> '.$_POST['email']. '</p>';
}
if (trim(!empty($_POST['phone']))){
	$body.=' <p><strong>Телефон:</strong> '.$_POST['phone']. '</p>';
}
if (trim(!empty($_POST['message']))){
	$body.=' <p><strong>Сообщение: </strong> '.$_POST['message']. '</p>';
}

// Отправляем
if (!$mail->send()){
	$message = 'Ошибка';
}
else {
	$message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>
