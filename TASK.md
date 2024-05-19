
# Исходное задание.

Разработать сервис, который позволяет зашифровать переданные через REST API \
(POST запрос /encrypt) данные с использованием публичного ключа и сохранить \
их в Redis на 1 час, возвращая ID сохраненного в БД объекта. Затем, \
по отдельному запросу (POST запрос /decrypt) и с использованием секретного \
ключа и ID объекта, расшифровать содержимое, удалить данные из Redis и \
вернуть пользователю.

1. Шифрование данных.

    Реализовать REST API, принимающий POST запросы с объектом данных и публичным \
    ключом. Сервис должен шифровать данные с использованием предоставленного \
    публичного ключа. Зашифрованные данные следует сохранять в Redis на 1 час.

2. Расшифровка и возврат данных.

    Реализовать REST API для получения зашифрованных данных. 

    Пользователь отправляет секретный ключ и ID зашифрованного объекта, и сервис \
    находит соответствующие данные в Redis. Если данные найдены и секретный ключ \
    верный, сервис должен расшифровать данные и вернуть их пользователю.

    В случае истечения времени хранения или если данные не найдены, возвращать \
    соответствующее уведомление.

3. Ключи и шифрование.

    Использовать RSA или любой другой асимметричный алгоритм шифрования для работы \
    с ключами. Обеспечить безопасную генерацию и использование ключевых пар.

4. Общие требования.

    Реализовать обработку ошибок и безопасность API.

    Обеспечить логирование запросов и действий пользователя.

    Проект должен включать в себя документацию: 
    - описание API,
    - инструкцию по запуску сервиса,
    - описание использованных подходов к шифрованию.

    Код должен быть чистым, хорошо структурированным и соответствовать принципам \
    SOLID. Важно соблюдение лучших практик по работе с асинхронными операциями и \
    обработке ошибок.

    Технологический стек:
    - Node.js и express js для разработки серверной части.
    - Любая криптографическая библиотека, поддерживающая асимметричное шифрование \
        (например, crypto в Node.js).
    - Redis для хранения зашифрованных данных.

# Нормальное задание.

1. Конечные точки REST API.

    - `POST: /crypto`

        Сервис шифрует payload с помощью ключа public_key. \
        Зашифрованные данные храняться в Redis 1 час.

        ```
        request_body = {  
            payload     = { ... },
            public_key  = '...',
        }
        response_data = {
            status: 400, 201
            error       = ...,
        }
        ```

    - `POST: /decrypto`

        Расшифровать и вернуть данные из Redis. \ 
        Уведомления: истекло время хранения, данные не найдены, \
        не правильный ключ.

        ```
        request_body = {  
            private_key = '...',
            id_object   = '...',
        }
        response_data = {
            status: 400, 200
            error       = ...,
            payload     = { ... },
        }
        ```
        
2. Ключи и шифрование.

    При данной постановке задачи, ключи создаются клиентом.

3. Обработка ошибок.

4. Логирование.

5. Описание API.

6. Инструкция по запуску.

7. Ответ на вопрос: как используется шифрование?

8. `async/await`, `crypto`, `express`, `redis`