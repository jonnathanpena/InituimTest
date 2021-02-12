using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InitiumTest.Models.ViewsModels
{
    /*
        Clase ResponseIdExceptionFunction
        Contiene los atributos necesarios para la respuesta en las funciones de int y exception
    */
    public class ResponseIdExceptionFunction
    {
        // Respuesta entera
        public int Integer { get; set; }
        // Respuesta del try (caso de producirse)
        public string Exception { get; set; }
    }
}
