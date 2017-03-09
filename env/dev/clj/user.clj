(ns user
  (:require [mount.core :as mount]
            server.core))

(defn start []
  (mount/start-without #'server.core/http-server
                       #'server.core/repl-server))

(defn stop []
  (mount/stop-except #'server.core/http-server
                     #'server.core/repl-server))

(defn restart []
  (stop)
  (start))


