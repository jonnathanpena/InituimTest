using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InitiumTest.Models
{
    /*
        Clase ApiResponse
        Contiene los atributos para todas las respuestas del sistema (objeto dinámico)
    */
    public class ApiResponse
    {
        // Atributo booleano, true cuando es exitoso, false cuando hay error
        public bool Success { get; set; }
        // Atributo de tipo string, para retornar el mensaje de error, fuera el caso
        public string ErrorMessage { get; set; }
        // Objeto a retornar por completo
        public object Data { get; set; }
    }
}
