# livesearch

Live Search with React, NodeJS and Elasticsearch

```
├── api
│   ├── app
│   │   ├── config
│   │   │   └── connection.js
│   │   ├── controllers
│   │   │   └── search.controller.js
│   │   ├── middleware
│   │   │   └── verifyFields.js
│   │   ├── models
│   │   │   └── search.model.js
│   │   └── routes
│   │   └── search.route.js
│   ├── app.js
│   ├── package.json
│   └── package-lock.json
├── dataset
│   └── articles_data.csv
├── images
│   └── search.png
├── LICENSE
├── README.md
├── scripts
│   └── run_locally.sh
└── ui
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.css
│   ├── App.js
│   ├── components
│   │   ├── result-card.js
│   │   └── result-list.js
│   ├── index.css
│   ├── index.js
│   ├── pages
│   │   ├── list-view.js
│   │   └── not-found.js
│   └── services
│   └── search-service.js
└── yarn.lock
```

## How to run

1. Run elastic search instance locally e.g. [Elastic Search Guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html)
2. To serve backend at localhost:3000 `cd api && node api/models/search.model.js && node app.js #serves at localhost:3000`
3. To serve frontend `cd ui && npm start # serves at localhost:3001`

## API details

```
GET /search
      {
        term: the search query,
        offset: from which query to start,
      }

    # returns raw array of matching queries from elastic search
```

![livesearch using react nodejs and elasticsearch](https://github.com/kanurag94/livesearch/blob/main/images/search.png)

### Pending work

1. Dockerizing the files.
2. Should only return id, title, and texts. This would be simple but can make search slower.

### Thanks

1. Dataset (/datasets/article_data.csv) is taken from https://www.kaggle.com/szymonjanowski/internet-articles-data-with-users-engagement
2. Elastic Documentation https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
3. Useful for latest elastic implementation in nodejs (the official documentation was not very good) https://www.digitalocean.com/community/tutorials/how-to-build-a-real-time-search-engine-with-node-vue-and-elasticsearch
