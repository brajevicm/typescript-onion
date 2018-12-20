#!/usr/bin/env bash
docker container stop $(docker ps | grep "typescript")