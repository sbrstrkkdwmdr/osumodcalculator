import { toInt, toName } from "../mode";

{
    toInt('ctb'); // => 2
    toInt('std'); // => 0
    toInt('taiko'); // => 1
    toInt('m'); // => 3
}
{
    toName(0); // => osu
    toName(3); // => mania
}