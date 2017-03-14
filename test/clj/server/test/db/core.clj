(ns server.test.db.core
  (:require [server.db.core :refer [*db*] :as db]
            [luminus-migrations.core :as migrations]
            [clojure.test :refer :all]
            [clojure.java.jdbc :as jdbc]
            [server.config :refer [env]]
            [mount.core :as mount]))

(use-fixtures
  :once
  (fn [f]
    (mount/start
      #'server.config/env
      #'server.db.core/*db*)
    (migrations/migrate ["migrate"] (select-keys env [:database-url]))
    (f)))

(deftest test-genre-atom
  (jdbc/with-db-transaction [t-conn *db*]
    (jdbc/db-set-rollback-only! t-conn)
    (testing "genre-atom"
      (is (= 1 (db/create-genre!
                 t-conn
                 {:id         1
                  :name "Akash"})))
      (is (= {:id         1
              :name "Akash"}
           (-> (db/get-genre-details t-conn {})
               (first)))))
    (testing "genre-list")))