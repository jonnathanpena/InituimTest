using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InitiumTest.Models
{
    /*
        Clase Queue
        Contiene todos los atributos del modelo Queue, tabla detalle donde se concentran el catálogo de colas y de clientes
    */
    public class Queue
    {
        // Llave primaria de la clase y tabla
        [Key]
        public int Id { get; set; }
        // LLave foranea de la tabla de QueueCat
        [Required]
        public int QueueId { get; set; }
        // Objeto de QueueCat
        [ForeignKey("QueueId")]
        public QueueCat QueueCat { get; set; }
        // Llave foránea de Client
        [Required]
        public int ClientId { get; set; }
        // Objeto Client
        [ForeignKey("ClientId")]
        public Client Client { get; set; }
        // Status procesado del turno, false = pendiente, true = procesado 
        [Required]
        public bool Processed { get; set; }
        // Posición en la cola, número autoincrementable
        [Required]
        public int Position { get; set; }
        // DateTime para conocer el momento que le toca el turno
        [Required]
        public DateTime TurnAt { get; set; }
        // TimeStamp en la creación de la tupla en la tabla
        [Required]
        public DateTime CreatedAt { get; set; }
    }
}
