FROM java:8-alpine
MAINTAINER Your Name <you@example.com>

ADD target/uberjar/server.jar /server/app.jar

EXPOSE 3000

CMD ["java", "-jar", "/server/app.jar"]
