USE `burgers_db`;

INSERT INTO `burgers`
(`burger_name`,     `created_at`)
VALUES
('Double Double',   NOW()),
('Quarter Pounder', NOW()),
('Big Kahuna',      NOW()),
(DEFAULT,           NOW());
