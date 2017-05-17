docker run -d \
    -p ${KA_CLIENT_LISTEN:-0.0.0.0}:${KA_CLIENT_PORT:-8080}:80  \
    -v ${PWD}/app:/src/app                              \
    -v ${PWD}/gulp-tasks:/src/gulp-tasks                \
    -v ${PWD}/index.html:/src/index.html                \
    -v ${PWD}/app/css/styles.css:/src/lacuna/styles.css \
    -v ${PWD}/app/js/load.js:/src/lacuna/load.js        \
    --name=ka-web                                       \
    --network kaserver_default                          \
    -e DEBUG=express:*                                  \
    kenoantigen/ka-web gulp dev-with-server
