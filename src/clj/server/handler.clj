(ns server.handler
  (:require [server.layout :refer [error-page]]
            [compojure.route :as route]
            [server.routes.home :refer [api-routes]]
            [server.env :refer [defaults]]
            [mount.core :as mount]
            [ring.util.http-response :as response]
            [ring.middleware.cors :refer [wrap-cors]]
            [server.middleware :as middleware]
            [compojure.api.sweet :refer :all]
            [schema.core :as s]))

(mount/defstate init-app
                :start ((or (:init defaults) identity))
                :stop  ((or (:stop defaults) identity)))

(def app-routes
  (routes
    (wrap-cors #'api-routes :access-control-allow-origin ["*"]
                       :access-control-allow-methods [:get :put :post :delete])
    (route/not-found
      (:body
        (error-page {:status 404
                     :title "page not found"})))))


(defn app [] (middleware/wrap-base app-routes))
