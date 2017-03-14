(ns server.test.tmdb.core
  (:require [clojure.test :refer :all]
            [server.tmdb.core :as tmdb]
            [server.handler :refer :all]
            [clj-http.client :as c]
            [server.db.core :refer [*db*] :as db]
            [clojure.java.jdbc :as jdbc])

  (:use clj-http.fake))


(deftest test-genre
  (let
    [genre-url "https://api.themoviedb.org/3/genre/movie/list?api_key=4805f78ea7163d5fdd1295926e07b2ac&language=en-US"]
    (testing "prepare url"
      (is (tmdb/prepare-genre-url) genre-url))

    (testing "fetching genres"
      (with-fake-routes {
                         genre-url {:get (fn [req]
                                           {:status 200
                                            :headers {}
                                            :body "{\n    \"genres\": [\n        {\n            \"id\": 28,\n            \"name\": \"Action\"\n        },\n        {\n            \"id\": 12,\n            \"name\": \"Adventure\"\n        },\n        {\n            \"id\": 16,\n            \"name\": \"Animation\"\n        },\n        {\n            \"id\": 35,\n            \"name\": \"Comedy\"\n        },\n        {\n            \"id\": 80,\n            \"name\": \"Crime\"\n        },\n        {\n            \"id\": 99,\n            \"name\": \"Documentary\"\n        },\n        {\n            \"id\": 18,\n            \"name\": \"Drama\"\n        },\n        {\n            \"id\": 10751,\n            \"name\": \"Family\"\n        },\n        {\n            \"id\": 14,\n            \"name\": \"Fantasy\"\n        },\n        {\n            \"id\": 36,\n            \"name\": \"History\"\n        },\n        {\n            \"id\": 27,\n            \"name\": \"Horror\"\n        },\n        {\n            \"id\": 10402,\n            \"name\": \"Music\"\n        },\n        {\n            \"id\": 9648,\n            \"name\": \"Mystery\"\n        },\n        {\n            \"id\": 10749,\n            \"name\": \"Romance\"\n        },\n        {\n            \"id\": 878,\n            \"name\": \"Science Fiction\"\n        },\n        {\n            \"id\": 10770,\n            \"name\": \"TV Movie\"\n        },\n        {\n            \"id\": 53,\n            \"name\": \"Thriller\"\n        },\n        {\n            \"id\": 10752,\n            \"name\": \"War\"\n        },\n        {\n            \"id\": 37,\n            \"name\": \"Western\"\n        }\n    ]\n}"})}})
      (is (= 19 (count (tmdb/get-genre-list)))))))



