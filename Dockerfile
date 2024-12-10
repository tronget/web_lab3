FROM ubuntu:latest
LABEL authors="trong"

ENTRYPOINT ["top", "-b"]