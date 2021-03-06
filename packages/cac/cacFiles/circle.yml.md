```yml
version: 2
jobs:
  build:
    docker:
      - image: circleci/node:12
    branches:
      ignore:
        - gh-pages # list of branches to ignore
        - /release\/.*/ # or ignore regexes
    steps:
      - checkout
      - restore_cache:
          key: dependency-cache-{{ checksum "yarn.lock" }}
      - run:
          name: install dependences
          command: yarn
      - save_cache:
          key: dependency-cache-{{ checksum "yarn.lock" }}
          paths:
            - ./node_modules
      - run:
          name: test
          command: yarn test:cov
      - run:
          name: upload coverage
          command: bash <(curl -s https://codecov.io/bash)
      - run:
          name: Release
          command: yarn semantic-release
```
