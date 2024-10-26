FROM php:8.2.4

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
     --install-dir=/usr/local/bin --filename=composer

# Install required PHP extensions
RUN apt-get update && apt-get install -y zlib1g-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-install pdo pdo_mysql sockets zip

# Create the app directory
RUN mkdir /app

# Copy the application code to the container
ADD . /app

# Set the working directory
WORKDIR /app

# Install Composer dependencies
RUN composer install

# Start the PHP application
CMD php artisan serve --host=0.0.0.0 --port=8000

# Expose the application port
EXPOSE 8000
