#!/usr/bin/bash
npm i -g typescript webpack typings
npm i
typings i
npm link typescript
cd projectbronze/php
composer install