INSERT INTO contract_running_total (
created_at,
amount
) VALUES
(DATE_SUB(NOW(), INTERVAL 1 DAY), "1.234567"),
(DATE_SUB(NOW(), INTERVAL 4 DAY), "2.345678"),
(DATE_SUB(NOW(), INTERVAL 7 DAY), "3.456789"),
(DATE_SUB(NOW(), INTERVAL 10 DAY), "0.987654"),
(DATE_SUB(NOW(), INTERVAL 13 DAY), "1.876543"),
(DATE_SUB(NOW(), INTERVAL 16 DAY), "2.765432"),
(DATE_SUB(NOW(), INTERVAL 19 DAY), "3.654321"),
(DATE_SUB(NOW(), INTERVAL 22 DAY), "0.567890"),
(DATE_SUB(NOW(), INTERVAL 25 DAY), "1.678901"),
(DATE_SUB(NOW(), INTERVAL 28 DAY), "2.789012"),
(DATE_SUB(NOW(), INTERVAL 3 DAY), "3.890123"),
(DATE_SUB(NOW(), INTERVAL 9 DAY), "0.234567"),
(DATE_SUB(NOW(), INTERVAL 15 DAY), "1.345678"),
(DATE_SUB(NOW(), INTERVAL 21 DAY), "2.456789"),
(DATE_SUB(NOW(), INTERVAL 27 DAY), "3.567890");