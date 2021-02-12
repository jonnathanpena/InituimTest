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
        public int ClientIdentification { get; set; }
        // Nombre del cliente
        [Required]
        public string ClientName { get; set; }
    }

    /*
        Clase ClientInsertResponse
        Contiene los atributos necesarios para la respuesta en la función de crear/editar cliente
    */
    public class ClientInsertResponse
    {
        // Id del Client creado/editado
        public int Id { get; set; }
        // Respuesta del try (caso de producirse)
        public string Exception { get; set; }
    }
}
