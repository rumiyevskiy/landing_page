<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $request = isset($_POST['request']) ? $_POST['request'] : '';
    $select_type = isset($_POST['select_type']) ? $_POST['select_type'] : '';
    $select_services = isset($_POST['select_services']) ? $_POST['select_services'] : '';

    // Створюємо тіло листа
    $message = "Ім'я: $name\n";
    $message .= "Телефон: $phone\n";
    $message .= "Email: $email\n";
    $message .= "Запит: $request\n";
    $message .= "Тип авто: $select_type\n";
    $message .= "Послуга: $select_services\n";

    // Заголовки листа
    $to = "rumiyevskiy@gmail.com";
    $subject = "Нова заявка з форми";
    $headers = "From: no-reply@yourdomain.com" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "Content-Type: text/plain; charset=UTF-8";

    // Відправка листа
    if (mail($to, $subject, $message, $headers)) {
        // Якщо лист успішно відправлений
        echo json_encode(["success" => true]);
    } else {
        // Якщо сталася помилка при відправці
        echo json_encode(["success" => false]);
    }
}
?>
