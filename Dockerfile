FROM bitnami/laravel:10

COPY . /app


WORKDIR /app

RUN composer install
RUN php artisan migrate:make


# VOLUME [ ".:/app" ]
# ENTRYPOINT [ "executable" ]
CMD ["php", "artisan", "serve"]

# VOLUME [ "/data" ]