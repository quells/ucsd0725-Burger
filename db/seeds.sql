USE `burgers_db`;

INSERT INTO `burgers`
(`burger_name`,     `created_at`)
VALUES
('Quarter Pounder', NOW()),
('Royale with Cheese', NOW() + 1),
('Big Kahuna',      NOW() + 2),
(DEFAULT,           NOW() + 3);
