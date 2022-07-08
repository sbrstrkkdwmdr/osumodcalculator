using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace osumodcalc
{
    public class objects
    {
        public class ARobj
        {
            public float ar;
            public int ms;
        };
        public class ODobj
        {
            public float range300;
            public float range100;
            public float range50;
            public float od;
        };
        public class AccGradeObj
        {
            public float accuracy;
            public string grade;
        };

        public class BasicMapVal
        {
            public float cs;
            public float ar;
            public float od;
            public float hp;
        };
    }
    public class functions
    {

        //AR section (Approach Rate)
        public static osumodcalc.objects.ARobj DoubleTimeAR(float ar)
        {
            int ms = 0;
            ms = (int)(ar > 5 ? 200 + (11 - ar) * 100 : 800 + (5 - ar) * 80);
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
            osumodcalc.objects.ARobj artoobj = new osumodcalc.objects.ARobj();
            artoobj.ar = newar;
            artoobj.ms = ms;
            return artoobj;
        }
        public static osumodcalc.objects.ARobj HalfTimeAR(float ar)
        {
            int oms = (int)((ar > 5 ? 1200 - (ar - 5) * 150 : 1800 - (ar * 10) * 12));
            double ms = (oms * 4) / (double)3;
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
            osumodcalc.objects.ARobj artoobj = new osumodcalc.objects.ARobj();
            artoobj.ar = newar;
            artoobj.ms = (int)ms;
            return artoobj;
        }

        public static int ARtoMS(float ar)
        {
            int ms = (int)(ar > 5 ? 1200 - (((ar - 5) * 10) * 15) : 1800 - (((ar) * 10) * 12));
            return ms;
        }

        public static float MStoAR(int ms)
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


        //OD section (Overall Difficulty)
        public static osumodcalc.objects.ODobj ODDT(float od)
        {
            double range300 = (79 - (od * 6) + 0.5) * 2 / (double)3;
            osumodcalc.objects.ODobj odo = new osumodcalc.objects.ODobj();
            odo.od = (float)((79.5 - range300) / (double)6);
            odo.range300 = (float)range300;
            odo.range100 = (float)((139 - (od * 8) + 0.5) * 2 / (double)3);
            odo.range50 = (float)((199 - (od * 10) + 0.5) * 2 / (double)3);
            return odo;
        }

        public static osumodcalc.objects.ODobj ODHT(float od)
        {
            double range300 = (79 - (od * 6) + 0.5) * 4 / (double)3;
            osumodcalc.objects.ODobj odo = new osumodcalc.objects.ODobj();
            odo.od = (float)((79.5 - range300) / (double)6);
            odo.range300 = (float)(range300);
            odo.range100 = (float)((139 - (od * 8) + 0.5) * 4 / (double)3);
            odo.range50 = (float)((199 - (od * 10) + 0.5) * 4 / (double)3);
            return odo;
        }


        public static osumodcalc.objects.ODobj ODtoMS(float od)
        {
            osumodcalc.objects.ODobj odo = new osumodcalc.objects.ODobj();
            odo.od = od;
            odo.range300 = (float)(79 - (od * 6) + 0.5);
            odo.range100 = (float)(139 - (od * 8) + 0.5);
            odo.range50 = (float)(199 - (od * 10) + 0.5);
            return odo;
        }

        public static dynamic MStoOD(float range300, float range100, float range50)
        {
            float od = 0;
            if (range300 != 0)
            {
                od = (float)(79.5 - range300) / (float)(6);
            }
            else if (range100 != 0)
            {
                od = (float)(139.5 - range100) / (float)(8);
            }
            else if (range50 != 0)
            {
                od = (float)(199.5 - range50) / (float)(10);
            }
            else
            {
                return "Error";
            }
            return od;
        }

        //Accuracy and grade calculation for all modes
        public static osumodcalc.objects.AccGradeObj CalcGradeSTD(int hit300, int hit100, int hit50, int miss)
        {
            int totalhits = hit300 + hit100 + hit50 + miss;
            float fulleq = ((300 * hit300) + (100 * hit100) + (50 * hit50)) / (float)(300 * totalhits) * 100;

            osumodcalc.objects.AccGradeObj acgrobj = new osumodcalc.objects.AccGradeObj();
            acgrobj.accuracy = (fulleq);
            acgrobj.grade = "D";
            if (hit300 / totalhits > 0.6)
            {
                acgrobj.grade = "C";
            }
            if ((hit300 / totalhits > 0.7 && miss == 0) || hit300 / totalhits > 0.8)
            {
                acgrobj.grade = "B";
            }
            if ((hit300 / totalhits > 0.8 && miss == 0) || hit300 / totalhits > 0.9)
            {
                acgrobj.grade = "A";
            }
            if (hit300 / totalhits > 0.9 && miss == 0 && hit50 / (float)totalhits < 0.01)
            {
                acgrobj.grade = "S";
            }
            if (hit300 == totalhits)
            {
                acgrobj.grade = "SS";
            }
            return acgrobj;
        }

        public static osumodcalc.objects.AccGradeObj CalcGradeTaiko(int hit300, int hit100, int miss)
        {
            int totalhits = hit300 + hit100 + miss;
            float fulleq = (hit300 + (hit100 / 2)) / (float)(totalhits);
            osumodcalc.objects.AccGradeObj acgrobj = new osumodcalc.objects.AccGradeObj();
            acgrobj.accuracy = (fulleq * 100);
            acgrobj.grade = "D";
            if (hit300 / totalhits > 0.8)
            {
                acgrobj.grade = "B";
            }
            if (hit300 / totalhits > 0.9)
            {
                acgrobj.grade = "A";
            }
            if (hit300 / totalhits > 0.95)
            {
                acgrobj.grade = "S";
            }
            if (hit300 == totalhits)
            {
                acgrobj.grade = "SS";
            }
            return acgrobj;
        }

        public static osumodcalc.objects.AccGradeObj CalcGradeCatch(int hit300, int hitkatu, int hit100, int hit50, int miss)
        {
            double totalhits = hit300 + hitkatu + hit100 + hit50 + miss;
            float fulleq = (float)((hit300 + hit100 + hit50) / totalhits);
            osumodcalc.objects.AccGradeObj acgrobj = new osumodcalc.objects.AccGradeObj();
            acgrobj.accuracy = (fulleq) * 100;
            acgrobj.grade = "D";
            if (fulleq > 0.85)
            {
                acgrobj.grade = "C";
            }
            if (fulleq > 0.9)
            {
                acgrobj.grade = "B";
            }
            if (fulleq > 0.94)
            {
                acgrobj.grade = "A";
            }
            if (fulleq > 0.98)
            {
                acgrobj.grade = "S";
            }
            if (hit300 + hit100 + hit50 == totalhits)
            {
                acgrobj.grade = "SS";
            }


            return acgrobj;
        }

        public static osumodcalc.objects.AccGradeObj CalcGradeMania(int hit300max, int hit300, int hitkatu, int hit100, int hit50, int miss)
        {
            float fulleq = (300 * (hit300max + hit300) + (200 * hitkatu) + (100 * hit100) + (50 * hit50)) / (float)(300 * (hit300max + hit300 + hitkatu + hit100 + hit50 + miss));
            osumodcalc.objects.AccGradeObj acgrobj = new osumodcalc.objects.AccGradeObj();
            acgrobj.accuracy = (fulleq) * 100;
            acgrobj.grade = "D";
            if (fulleq > 0.7)
            {
                acgrobj.grade = "C";
            }
            if (fulleq > 0.8)
            {
                acgrobj.grade = "B";
            }
            if (fulleq > 0.9)
            {
                acgrobj.grade = "A";
            }
            if (fulleq > 0.95)
            {
                acgrobj.grade = "S";
            }
            if (fulleq == 1)
            {
                acgrobj.grade = "SS";
            }
            return acgrobj;
        }

        //HR and EZ
        public static osumodcalc.objects.BasicMapVal ToHR(float cs, float ar, float od, float hp)
        {
            osumodcalc.objects.BasicMapVal hrobj = new osumodcalc.objects.BasicMapVal();
            hrobj.cs = (float)(cs * 1.3 > 10 ? 10 : cs * 1.3);
            hrobj.ar = (float)(ar * 1.4 > 10 ? 10 : ar * 1.4);
            hrobj.od = (float)(od * 1.4 > 10 ? 10 : od * 1.4);
            hrobj.hp = (float)(hp * 1.4 > 10 ? 10 : hp * 1.4);
            return hrobj;
        }

        public static osumodcalc.objects.BasicMapVal ToEZ(float cs, float ar, float od, float hp)
        {
            osumodcalc.objects.BasicMapVal ezobj = new osumodcalc.objects.BasicMapVal();
            ezobj.cs = cs / 2 > 10 ? 10 : cs / 2;
            ezobj.ar = ar / 2 > 10 ? 10 : ar / 2;
            ezobj.od = od / 2 > 10 ? 10 : od / 2;
            ezobj.hp = hp / 2 > 10 ? 10 : hp / 2;
            return ezobj;
        }

        //mod parsing

        public static int ModStringToInt(string mods)
        {
            int modint = 0;
            modint += mods.Contains("NF") ? 1 : 0;
            modint += mods.Contains("EZ") ? 2 : 0;
            modint += mods.Contains("TD") ? 4 : 0;
            modint += mods.Contains("HD") ? 8 : 0;
            modint += mods.Contains("HR") ? 16 : 0;
            modint += mods.Contains("SD") ? 32 : 0;
            modint += mods.Contains("DT") ? 64 : 0;
            modint += mods.Contains("RX") || mods.Contains("RLX") || mods.Contains("RL") ? 128 : 0;
            modint += mods.Contains("HT") ? 256 : 0;
            modint += mods.Contains("NC") ? 512 : 0;
            modint += mods.Contains("FL") ? 1024 : 0;
            modint += mods.Contains("AT") ? 2048 : 0;
            modint += mods.Contains("SO") ? 4096 : 0;
            modint += mods.Contains("AP") ? 8192 : 0;
            modint += mods.Contains("PF") ? 16384 : 0;
            modint += mods.Contains("4K") ? 32768 : 0;
            modint += mods.Contains("5K") ? 65536 : 0;
            modint += mods.Contains("6K") ? 131072 : 0;
            modint += mods.Contains("7K") ? 262144 : 0;
            modint += mods.Contains("8K") ? 524288 : 0;
            modint += mods.Contains("FI") ? 1048576 : 0;
            modint += mods.Contains("RD") || mods.Contains("RDM") ? 2097152 : 0;
            modint += mods.Contains("CN") ? 4194304 : 0;
            modint += mods.Contains("TP") ? 8388608 : 0;
            modint += mods.Contains("9K") ? 16777216 : 0;
            modint += mods.Contains("KC") ? 33554432 : 0;
            modint += mods.Contains("1K") ? 67108864 : 0;
            modint += mods.Contains("3K") ? 134217728 : 0;
            modint += mods.Contains("2K") ? 268435456 : 0;
            modint += mods.Contains("SV2") || mods.Contains("S2") ? 536870912 : 0;
            modint += mods.Contains("MR") ? 1073741824 : 0;
            return modint;
        }

        // do the inverse of above
        public static string ModIntToString(int mods)
        {
            string modString = "";
            modString += (mods & 1) > 0 ? "NF" : "";
            modString += (mods & 2) > 0 ? "EZ" : "";
            modString += (mods & 4) > 0 ? "TD" : "";
            modString += (mods & 8) > 0 ? "HD" : "";
            modString += (mods & 16) > 0 ? "HR" : "";
            modString += (mods & 32) > 0 ? "SD" : "";
            modString += (mods & 64) > 0 ? "DT" : "";
            modString += (mods & 128) > 0 ? "RX" : "";
            modString += (mods & 256) > 0 ? "HT" : "";
            modString += (mods & 512) > 0 ? "NC" : "";
            modString += (mods & 1024) > 0 ? "FL" : "";
            modString += (mods & 2048) > 0 ? "AT" : "";
            modString += (mods & 4096) > 0 ? "SO" : "";
            modString += (mods & 8192) > 0 ? "AP" : "";
            modString += (mods & 16384) > 0 ? "PF" : "";
            modString += (mods & 32768) > 0 ? "4K" : "";
            modString += (mods & 65536) > 0 ? "5K" : "";
            modString += (mods & 131072) > 0 ? "6K" : "";
            modString += (mods & 262144) > 0 ? "7K" : "";
            modString += (mods & 524288) > 0 ? "8K" : "";
            modString += (mods & 1048576) > 0 ? "FI" : "";
            modString += (mods & 2097152) > 0 ? "RD" : "";
            modString += (mods & 4194304) > 0 ? "CN" : "";
            modString += (mods & 8388608) > 0 ? "TP" : "";
            modString += (mods & 16777216) > 0 ? "9K" : "";
            modString += (mods & 33554432) > 0 ? "KC" : "";
            modString += (mods & 67108864) > 0 ? "1K" : "";
            modString += (mods & 134217728) > 0 ? "3K" : "";
            modString += (mods & 268435456) > 0 ? "2K" : "";
            modString += (mods & 536870912) > 0 ? "SV2" : "";
            modString += (mods & 1073741824) > 0 ? "MR" : "";
            if (modString.Contains("DT") && modString.Contains("NC"))
            {
                modString = modString.Replace("DT", "");
            }
            if (modString.Contains("SD") && modString.Contains("PF"))
            {
                modString = modString.Replace("SD", "");
            }
            return modString;
        }

        public static string OrderMods(string mods)
        {
            Array Order = new string[] { "AT", "RX", "AP", "TP", "SO", "EZ", "HD", "HT", "DT", "NC", "HR", "SD", "PF", "FL", "NF" };
            string[] modArray = Regex.Split(mods, "(?<=^(.{2})+)");

            string modString = "";
            foreach (string s in Order)
            {
                foreach (string mod in modArray)
                {
                    if (s == mod)
                    {
                        modString += mod;
                        break;
                    }
                }
            }
            return modString;
        }

        //circle size and object radius conversion
        public static double CircleSizeToRadius(float cs)
        {
            double r = (0.00005556 * Math.Pow(cs, 2) - 4.483 * cs + 54.42);
            return r;
        }

        public static double RadiusToCircleSize(float r)
        {
            double cs = (5000 / (double)8104533921) * Math.Pow(r, 2) - (1808448550 / (double)8104533921) * r + (8582285633270972 / (double)706821088118109);
            return cs;
        }


    }
}