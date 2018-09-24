#!/usr/bin/env bash

if [[ $OSTYPE == darwin* ]]
then
    cd ios
    rm -rf Pods/*
    pod install
    cd ../
fi