# osu! mod calculator

[![NPM link](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/osumodcalculator)</br>
[![CodeFactor](https://www.codefactor.io/repository/github/sbrstrkkdwmdr/osumodcalculator/badge)](https://www.codefactor.io/repository/github/sbrstrkkdwmdr/osumodcalculator)

### Installation

`npm i osumodcalculator`

### Usage

```ts
import { types, mod } from "osumodcalculator";

const mods:types.Mod[] = mod.fromString('HDDTHR'); // => ['HD', 'DT', 'HR']
```

### notes:

-   EZ & HR calculations should come before DT/HT calculations
-   OD is listed as accuracy in the osu! api
-   HP is listed as drain in the osu! api

## documentation

[Full documentation is here](https://sbrstrkkdwmdr.github.io/projects/osumodcalculator)

### credits:

[osu! accuracy wiki](https://osu.ppy.sh/wiki/en/Gameplay/Accuracy) <br/>
[osu! grades wiki](https://osu.ppy.sh/wiki/en/FAQ#grades) <br/>
[Difficulty Settings Table](https://www.reddit.com/r/osugame/comments/6phntt/difficulty_settings_table_with_all_values/) <br/>

### Contact

[My website](https://sbrstrkkdwmdr.me)