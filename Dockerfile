FROM abiosoft/caddy

docker run -d \
    -v $(pwd)/Caddyfile:/etc/Caddyfile \
    -v $HOME/.caddy:/root/.caddy \
    -p 8080:8080 -p 2015:2015 \
    abiosoft/caddy

EXPOSE 2015
