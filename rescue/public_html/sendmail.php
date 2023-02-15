<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/Exception.php';

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$message = $_POST['message'];

$body = $name . ' ' .$phone. ' ' .$email. ' ' .$message;

$theme = '[Заявка с формы]';

/* Подключение файла разметки для формы обратной связи */
$email_template = 'template__mail.html';
/* Считывание  шаблона разметки*/
$body = file_get_contents($email_template);

/* Замена строки с файла разметки на значения с полей*/
$body = str_replace('%name%', $name, $body);
$body = str_replace('%phone%', $phone, $body);
$body = str_replace('%email%', $email, $body);
$body = str_replace('%message%', $message, $body);

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';										// Указываем кодовую страницу
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->Host = 'cpanel3.d.fozzy.com';  						// Указываем ХОСТ SMTP сервера исходящей почты
$mail->SMTPAuth = true;                               // Включаем аутентификацию
$mail->Username = 'contact@alexandrz.ru'; 				// Логин от почты с которой будут отправляться письма
$mail->Password = '20232023Qwe!'; 							// Пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Включаем шифрование SSL
$mail->Port = 465; 												// Указываем порт исходящего сервера SMTP

// От кого письмо
$mail->setFrom('contact@alexandrz.ru', 'Форма обратной связи на сайте');
// Кому отправить (можно указать несколько адресатов)
$mail->addAddress('contact@alexandrz.ru');
// Тема письма
$mail->Subject = 'Сообщение от формы обратной связи на сайте';

/* Поддержка HTML тегов */
$mail->IsHTML(true);

$mail->Body = $body;
// Тело письма
$body = '<h1> Письмо с сайта </h1>';
if (trim(!empty($_POST['name']))){
	$body.='<p><strong>Имя:</strong> '.$_POST['name']. '</p>';
}
if (trim(!empty($_POST['email']))){
	$body.='<p><strong>E-mail:</strong> '.$_POST['email']. '</p>';
}
if (trim(!empty($_POST['phone']))){
	$body.='<p><strong>Телефон:</strong> '.$_POST['phone']. '</p>';
}
if (trim(!empty($_POST['message']))){
	$body.='<p><strong>Сообщение: </strong> '.$_POST['message']. '</p>';
}

// Отправляем
if (!$mail->send()){
	$message = 'Ошибка';
}
else {
	$message = 'Данные отправлены!';
}

$response = ["message" => $message];

header('Content-type: application/json');
echo json_encode($response);
?>
