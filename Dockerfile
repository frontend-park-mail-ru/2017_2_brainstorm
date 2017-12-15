FROM node:7

WORKDIR /app

COPY package.json /app
RUN npm install

# Add your source files 
COPY . /app

####################

RUN apt-get update
RUN apt-get install -y nginx

RUN rm /etc/nginx/sites-enabled/default
ADD brise.conf /etc/nginx/sites-available
RUN ln -s /etc/nginx/sites-available/brise.conf /etc/nginx/sites-enabled/
ADD ./ssl /etc/ssl

RUN nginx -v
RUN nginx -t
RUN service nginx restart

EXPOSE 80
EXPOSE 443

####################

CMD service nginx start && npm start

