using System;
using System.ComponentModel.DataAnnotations;

namespace InitiumTest.Models
{
    /*
        Clase QueueCat
        Contiene todos los atributos del modelo QueueCat, que sería el catálogo de colas (para esta prueba Cola1, Cola2)
    */
    public class QueueCat
    {
        // Llave primaria del modelo y de la tabla
        [Key]
        public int Id { get; set; }
        // Nombre que se le asigna a la cola
        [Required]
        public string QueueName { get; set; }
        // Tiempo de duración (minutos)
        [Required]
        public int QueueTime { get; set; }
    }
}
