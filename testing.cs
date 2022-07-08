using System;
using osumodcalc;
//csc /t:exe /out:program.exe testing.cs osumodcalc.cs

namespace m
{
    public class m
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("TESTING");
            Console.WriteLine("METHOD DoubleTimeAR");
            osumodcalc.objects.ARobj dtar = osumodcalc.functions.DoubleTimeAR(9);
            Console.WriteLine("AR" + dtar.ar);
            Console.WriteLine(dtar.ms + "ms");
            Console.WriteLine("");


            Console.WriteLine("METHOD HalfTimeAR");
            osumodcalc.objects.ARobj htar = osumodcalc.functions.HalfTimeAR(9);
            Console.WriteLine("AR" + htar.ar);
            Console.WriteLine(htar.ms + "ms");
            Console.WriteLine("");


            Console.WriteLine("METHOD ARtoMS");
            Console.WriteLine(osumodcalc.functions.ARtoMS(9) + "ms");
            Console.WriteLine("");


            Console.WriteLine("METHOD MStoAR");
            Console.WriteLine("AR" + osumodcalc.functions.MStoAR(600));
            Console.WriteLine("");

            Console.WriteLine("METHOD ODDT");
            osumodcalc.objects.ODobj oddt = osumodcalc.functions.ODDT(9);
            Console.WriteLine("OD" + oddt.od);
            Console.WriteLine(oddt.range300 + "ms");
            Console.WriteLine(oddt.range100 + "ms");
            Console.WriteLine(oddt.range50 + "ms");
            Console.WriteLine("");

            Console.WriteLine("METHOD ODHT");
            osumodcalc.objects.ODobj odht = osumodcalc.functions.ODHT(9);
            Console.WriteLine("OD" + odht.od);
            Console.WriteLine(odht.range300 + "ms");
            Console.WriteLine(odht.range100 + "ms");
            Console.WriteLine(odht.range50 + "ms");
            Console.WriteLine("");

            Console.WriteLine("METHOD ODtoMS");
            osumodcalc.objects.ODobj odms = osumodcalc.functions.ODtoMS(9);
            Console.WriteLine("OD" + odms.od);
            Console.WriteLine(odms.range300 + "ms");
            Console.WriteLine(odms.range100 + "ms");
            Console.WriteLine(odms.range50 + "ms");
            Console.WriteLine("");

            Console.WriteLine("METHOD MStoOD");
            dynamic msod = osumodcalc.functions.MStoOD(0, 0, 0);
            Console.WriteLine("OD" + msod);
            Console.WriteLine("");

            Console.WriteLine("METHOD CalcGradeSTD");
            osumodcalc.objects.AccGradeObj std = osumodcalc.functions.CalcGradeSTD(298, 22, 11, 25);
            Console.WriteLine(std.grade);
            Console.WriteLine(std.accuracy + "%");
            Console.WriteLine("");

            Console.WriteLine("METHOD CalcGradeTaiko");
            osumodcalc.objects.AccGradeObj taiko = osumodcalc.functions.CalcGradeTaiko(193, 11, 1);
            Console.WriteLine(taiko.grade);
            Console.WriteLine(taiko.accuracy + "%");
            Console.WriteLine("");

            Console.WriteLine("METHOD CalcGradeCTB");
            osumodcalc.objects.AccGradeObj ctb = osumodcalc.functions.CalcGradeCatch(202, 1, 3, 235, 1);
            Console.WriteLine(ctb.grade);
            Console.WriteLine(ctb.accuracy + "%");
            Console.WriteLine("");

            Console.WriteLine("METHOD CalcGradeMania");
            osumodcalc.objects.AccGradeObj mania = osumodcalc.functions.CalcGradeMania(213, 170, 48, 7, 1, 0);
            Console.WriteLine(mania.grade);
            Console.WriteLine(mania.accuracy + "%");
            Console.WriteLine("");

            Console.WriteLine("METHOD ToHR");
            osumodcalc.objects.BasicMapVal hr = osumodcalc.functions.ToHR((float)4, (float)9.8, (float)9.1, (float)5);
            Console.WriteLine("CS" + hr.cs);
            Console.WriteLine("AR" + hr.ar);
            Console.WriteLine("OD" + hr.od);
            Console.WriteLine("HP" + hr.hp);
            Console.WriteLine("");

            Console.WriteLine("METHOD ToEZ");
            osumodcalc.objects.BasicMapVal ez = osumodcalc.functions.ToEZ((float)4, (float)9.8, (float)9.1, (float)5);
            Console.WriteLine("CS" + ez.cs);
            Console.WriteLine("AR" + ez.ar);
            Console.WriteLine("OD" + ez.od);
            Console.WriteLine("HP" + ez.hp);

            Console.WriteLine("METHOD ModStringToInt");
            Console.WriteLine(osumodcalc.functions.ModStringToInt("EZHDDT"));
            Console.WriteLine("");

            Console.WriteLine("METHOD ModIntToString");
            Console.WriteLine(osumodcalc.functions.ModIntToString(88));
            Console.WriteLine("");

            Console.WriteLine("METHOD OrderMods");
            Console.WriteLine(osumodcalc.functions.OrderMods("HDHDDTHDNFNFEZAT blhahblasblhsdbaslkhbdsahk"));
            Console.WriteLine("");

            Console.WriteLine("METHOD CircleSizeToRadius");
            Console.WriteLine(osumodcalc.functions.CircleSizeToRadius(5));
            Console.WriteLine("");

            Console.WriteLine("METHOD RadiusToCircleSize");
            Console.WriteLine(osumodcalc.functions.RadiusToCircleSize((float)32.01));
            Console.WriteLine("");

        }
    }
}