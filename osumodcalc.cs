using System;


namespace osumodcalc
{
    public class osumodcalc
    {
        class ODobj
        {
            float range300;
            float range100;
            float range50;
            float od;
        }

        public static float DoubleTimeAR(float ar)
        {
            int ms = 0;
            ms = (int)(ar > 5 ? 200 + (11 - ar) * 100 : 800 + (5 - ar) * 80);
            Console.WriteLine(ms);
            float newar = 0;
            if (ms < 300)
            {
                newar = (float)(11);
            }
            else if (ms < 1200)
            {
                newar = (float)(((11 - (ms - 300) / (float)150) * 100) / (float)100);
            }
            else
            {
                newar = (float)(((5 - (ms - 1200) / (float)120) * 100) / (float)100);
            }
            return newar;
        }
        public static float HalfTimeAR(float ar)
        {
            int ms = 0;
            int oms = (int)(ar > 5 ? 1200 - (ar - 5) * 150 : 1800 - (ar * 10) * 12);
            ms = oms * (4 / 3);
            float newar = 0;
            if (ms < 300)
            {
                newar = (float)(11);
            }
            else if (ms < 1200)
            {
                newar = (float)(((11 - (ms - 300) / (float)150) * 100) / (float)100);
            }
            else
            {
                newar = (float)(((5 - (ms - 1200) / (float)120) * 100) / (float)100);
            }
        }

        public static int ARtoms(float ar)
        {
            int ms = (int)(ar > 5 ? 200 + (11 - ar) * 100 : 800 + (5 - ar) * 80);
            return ms;
        }

        public static float msToAR(int ms)
        {
            float ar = 0;
            if (ms < 300)
            {
                ar = (float)(11);
            }
            else if (ms < 1200)
            {
                ar = (float)(((11 - (ms - 300) / (float)150) * 100) / (float)100);
            }
            else
            {
                ar = (float)(((5 - (ms - 1200) / (float)120) * 100) / (float)100);
            }
            return ar;
        }

        public static ODobj odDT(float od)
        {
            ODobj odo = new ODobj();
            odo.od = od* 4 / 3;
            odo.range300 = (79 - (od * 6) + 0.5) * 2 / 3;
            odo.range100 = (139 - (od * 8) + 0.5) * 2 / 3;
            odo.range50 = (199 - (od * 10) + 0.5) * 2 / 3;
            return odo;
        }


        public static ODobj ODtoms(float od)
        {
            ODobj odo = new ODobj();
            odo.od = od;
            odo.range300 = 79 - (od * 6) + 0.5;
            odo.range100 = 139 - (od * 8) + 0.5;
            odo.range50 = 199 - (od * 10) + 0.5;
            return odo;
        }

        public static float msToOD(float range300, float range100, float range50)
        {
            float od = 0;
            if (range300)
            {
                od = (float)(79.5 - range300) / (float)(6);
            }
            else if (range100)
            {
                od = (float)(139.5 - range100) / (float)(8);
            }
            else
            {
                od = (float)(199.5 - range50) / (float)(10);
            }
            return od;
        }




    }
}