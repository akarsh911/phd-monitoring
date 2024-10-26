FROM php:8.2.25-zts-alpine3.20
WORKDIR /var/www/html

RUN apk update 
RUN curl -sS https://getcomposer.org/installer | php -- --version=2.4.3 --install-dir=/usr/local/bin --filename=composer

COPY . .
RUN composer install

CMD ["php","artisan","serve","--host=0.0.0.0"]
