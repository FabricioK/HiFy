# HiFy
Hify é uma dashboard pessoal para busca de músicas na plataforma spotify

### Ambiente de desenvolvimento

Necessário [Node.js](https://nodejs.org/) v4+ para rodar.
```sh
$ npm install
```
Antes de iniciar o ambiente de homologação, é necessário criar um arquivo .env no root do projeto, contendo as informações que o spotify vai usar. A porta padrão definida foi 8085, se alterada aqui, deve ser alterada no package.json conforme a próxima instrução

```sh
auth_api=https://accounts.spotify.com/authorize
client_id=CLIENT_ID_DO_SPOTIFY
redirect_uri=http://localhost:8085/callback
scopes=user-read-private user-read-email
```
O comando para executar em localhost já está configurado no package.json apontando para a porta 8085
```sh
$ npm run dev
```
