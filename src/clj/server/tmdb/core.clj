(ns server.tmdb.core
  (:require [clj-http.client :as client]
            [cemerick.url :refer (url url-encode)]
            [clojure.data.json :as json]
            [server.db.core :as db]))

(def tmdb-base-url "https://api.themoviedb.org/3/")

(def api_key "4805f78ea7163d5fdd1295926e07b2ac")

(defn prepare-genre-url []
  (str (-> tmdb-base-url
         (url "genre" "movie" "list")
         (assoc :query {:api_key api_key :language "en-US"}))))

(defn get-genre-list []
      (let
        [response (:body ((comp client/get prepare-genre-url)))]
        (-> response
            ((comp :genres json/read-str) :key-fn keyword))))

(defn save-genre-list []
  "persist genre list returned by tmdb in db"
  (let [genre-list (get-genre-list)]
    (db/clear-genre)
    (reduce + (map #(db/create-genre! %) genre-list))))