<img src=/assets/img/readme_bg.png />

![圖片alt](/assets/img/readme_bg.png )

# bookingRooms

[![nuxt](https://img.shields.io/badge/nuxt-v2.15.8-blue)](https://nuxtjs.org/docs/get-started/installation)

This is a booking website.

This is a booking website that references Airbnb's UI/UX. You can choose the room, check-in and check-out dates, and the number of occupants. If you want to book a room, you need to log in to your account. If you don’t have one, you can register. After logging in, you can see the journey option in the menu on the top bar, click to enter see your reserved room.

## Table of Contents

- [Background](#background)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API](#aPI)
- [License](#license)

## Background

Airbnb is a website for renting accommodation and homestays. It provides short-term rental houses or rooms, allowing travelers to discover and book unique listings around the world through websites or mobile phones. It is one of the representatives of the sharing economy in recent years. I have booked a room on Airbnb before, and I can find a room with a high cp value. The room information is very complete, and the operation of booking a room on Airbnb is also very simple. Also, their UI/UX design is very good, so I want to use this as an exercise to make my own booking website.

## Demo

Check out the [demo](https://therooms.vercel.app/)

## Installation

This project uses [yarn](https://yarnpkg.com/). Go check them out if you don't have them locally installed.

```
$ yarn install
```

## Usage

##### Vercel Deployment

vercel.json
```
{
  "version": 2,
  "builds": [
    {
      "src": "nuxt.config.js",
      "use": "@nuxtjs/vercel-builder"
    }
  ]
}
```

## API

Check out the [server side](https://github.com/wen-pin/bookingRooms-server/tree/master)

## License

`UNLICENSED`
