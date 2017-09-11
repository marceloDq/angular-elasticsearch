# Angular/Elasticsearch

Example project to use angular with elasticsearch, the idea is to put several types of searches as an example.
Inspirational design [spalger/elasticsearch-angular-example](https://github.com/spalger/elasticsearch-angular-example)

## Prerequisites

In order to run this example, you will need to have the following installed
  1. [elasticsearch](http://www.elasticsearch.org/guide/en/elasticsearch/guide/current/_installing_elasticsearch.html)
  2. [node.js (with npm)](https://docs.npmjs.com/getting-started/installing-node)

You will also need to configure elasticsearch to accept requests from the browser using [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing). To enable CORS, add the following to elasticsearch's config file. Usually, this file is located near the elasticsearch executable at `config/elasticsearch.yml`.

```yml
http.cors:
  enabled: true
  allow-origin: /https?:\/\/localhost(:[0-9]+)?/
```

## Run:
1. Clone this repo locally.

  ```sh
  git clone https://github.com/marceloDq/elasticsearch-angular.git
  ```

2. Move into the project

  ```sh
  cd elasticsearch-angular
  ```

3. Install the node modules

  ```sh
  npm install
  ```

4. Open the index.html file in your browser.

