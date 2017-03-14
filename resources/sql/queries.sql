-- :name create-genre! :! :n
-- :doc creates a new genre
INSERT INTO genres
(id, name)
VALUES (:id, :name);

-- :name get-genre-details :? :0
-- :doc retrieve all genres
SELECT * FROM genres;

-- :name clear-genre :! :n
-- :doc delete all genres
DELETE FROM genres;