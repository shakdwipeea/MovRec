(ns server.routes.home
  (:require [server.layout :as layout]
            [compojure.core :as router]
            [ring.util.http-response :as response]
            [clojure.java.io :as io]
            [compojure.api.sweet :refer :all]
            [schema.core :as s]))

(defn search-handler [])

(def api-routes
  (api
    {:swagger
     {:ui "/api-docs"
      :spec "/swager.json"
      :data {:info {:title "Rest Apis"
                    :description "Apis for goose"}
             :tags [{:name "api", :description "search api"}]}}}
    (context "/api" []
             :tags ["api"]
             (GET "/search" []
                  :return {:name String}
                  :query-params [movie :- String]
                  :summary "Returns search results for movie"
                  (response/ok {:name movie})))))
