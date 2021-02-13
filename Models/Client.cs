using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace InitiumTest.Models
{
    /*
        Clase Client
        Contiene todos los atributos del modelo Client
    */
    public class Client
    {
        // Llave primaria de la tabla y del modelo
        [Key]
        public int Id { get; set; }
        // Identificación del cliente, Cédula, RUC, Pasaporte,...
        [Required]
        public string ClientIdentification { get; set; }
        // Nombre del cliente
        [Required]
        public string ClientName { get; set; }
    }
}
