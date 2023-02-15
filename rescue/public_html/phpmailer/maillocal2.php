<?php 


require_once ('phpmailer/less/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';
$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'cpanel3.d.fozzy.com';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Включение актентификации на почтовом ящике
$mail->Username = 'contact@alexandrz.ru'; // Логин от почты с которой будут отправляться письма
$mail->Password = '20232023Qwe!'; // Пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = '465'; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('contact@alexandrz.ru'); 			// от кого будет уходить письмо?

$mail->addAddress('alexandrz071@mail.ru');     // Кому будет уходить письмо 

$mail->IsHTML(true);

$mail->Subject = 'Сообщение от формы обратной связи на сайте';
$mail->Body = 'Привет мир! <p>Это строка HTML кода</p>';
$mail->AltBody = 'Привет мир! Альтернативное письмо';


if($mail->send()) {
	echo 'СООБЩЕНИЕ ОТПРАВЛЕННО!!!';
} else {
   echo 'ОШИБКА!!!';
	echo 'ОШИБКА!!!' . $mail->ErrorInfo;
}
?>