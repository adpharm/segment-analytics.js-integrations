FROM mcr.microsoft.com/devcontainers/base:jammy
# FROM mcr.microsoft.com/devcontainers/base:focal
# FROM mcr.microsoft.com/devcontainers/base:ubuntu-20.04


# use user "vscode"
# USER vscode

# install Bun
# RUN curl -fsSL https://bun.sh/install | bash

# install phantomjs for ARM

# 0.159 The following packages have unmet dependencies:
# 0.160  phantomjs : Depends: libqt5core5a (>= 5.7.0) but it is not installable
# 0.160              Depends: libqt5gui5 (>= 5.0.2) but it is not installable or
# 0.160                       libqt5gui5-gles (>= 5.0.2) but it is not installable
# 0.160              Depends: libqt5network5 (>= 5.3.0) but it is not installable
# 0.160              Depends: libqt5printsupport5 (>= 5.2.0) but it is not installable
# 0.160              Depends: libqt5webkit5 (>= 5.212.0~alpha3) but it is not installable
# 0.160              Depends: libqt5widgets5 (>= 5.0.2) but it is not installable
# 0.160 E: Unable to correct problems, you have held broken packages.

# RUN sudo apt-get update
# RUN sudo apt-get install -y wget libfontconfig1 libfreetype6
# RUN sudo apt-get install -y libqt5core5a libqt5gui5 libqt5network5 libqt5printsupport5 libqt5webkit5 libqt5widgets5


# RUN wget https://launchpad.net/ubuntu/+source/phantomjs/2.1.1+dfsg-2ubuntu1/+build/19118060/+files/phantomjs_2.1.1+dfsg-2ubuntu1_arm64.deb
# RUN sudo apt install ./phantomjs_2.1.1+dfsg-2ubuntu1_arm64.deb
# RUN sudo apt install -f # if dependencies are not happy

# RUN apt-get update && apt-get install -y wget libfontconfig1 libfreetype6
# RUN wget https://github.com/piksel/phantomjs-raspberrypi/releases/download/v2.1.1-r/phantomjs-2.1.1-armhf.tar.xz \
#   && tar -xvf phantomjs-2.1.1-armhf.tar.xz \
#   && mv phantomjs-2.1.1-armhf /usr/local/share/phantomjs \
#   && ln -s /usr/local/share/phantomjs/bin/phantomjs /usr/local/bin/phantomjs

# $ sudo -s
# echo 'deb [arch=arm64] http://archive.ubuntu.com/ubuntu focal main universe' >> /etc/apt/sources.list.d/phantomjs.list
# apt update
# apt policy phantomjs

# RUN sudo echo 'deb [arch=arm64] shttp://archive.ubuntu.com/ubuntu focal main universe' >> /etc/apt/sources.list.d/phantomjs.list
# RUN sudo apt update
# RUN sudo apt install phantomjs

