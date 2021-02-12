using System;
using System.IO;

namespace InitiumTest.Utils
{
    public class Log
    {
        public static void LOG(string msj)
        {
            string directorio = $"{ Path.GetDirectoryName(Directory.GetCurrentDirectory())}\\LOG\\";
            if (!Directory.Exists(directorio))
                Directory.CreateDirectory(directorio);
            try
            {
                StreamWriter sw = File.AppendText(directorio + DateTime.Now.Date.ToShortDateString().Replace('/', '_') + "_LOG.log");
                sw.WriteLine("[" + DateTime.Now + "] " + msj);
                sw.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine("Exception: " + e.Message);
            }
        }
    }
}
