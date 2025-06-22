# osu! mod calculator

[![chartjs](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/osumodcalculator)</br>
[![CodeFactor](https://www.codefactor.io/repository/github/sbrstrkkdwmdr/osumodcalculator/badge)](https://www.codefactor.io/repository/github/sbrstrkkdwmdr/osumodcalculator)

### to do list:

    [x] convert AR to DT & HT
    [x] convert OD to DT & HT
    [x] convert AR & OD to milliseconds
    [x] convert milliseconds to AR & OD
    [x] convert values to HR & EZ
    [x] convert mod integers to string and vice versa
    [x] convert circle size to object radius and vice versa

### to install:

run `npm i osumodcalculator`
in your main js file:

```js
const osumodcalc = require("osumodcalculator");
//code here
```

OR

```js
import * as osumodcalc from "osumodcalculator";
```

### notes:

    EZ & HR calculations should come before DT/HT calculations
    OD is listed as accuracy in the osu! api
    HP is listed as drain in the osu! api

# documentation

see [here](https://sbrstrkkdwmdr.github.io/projects/osumodcalcutor)

### credits:

[osu! accuracy wiki](https://osu.ppy.sh/wiki/en/Gameplay/Accuracy) <br/>
[osu! grades wiki](https://osu.ppy.sh/wiki/en/FAQ#grades) <br/>
[Difficulty Settings Table](https://www.reddit.com/r/osugame/comments/6phntt/difficulty_settings_table_with_all_values/) <br/>
