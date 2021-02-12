using InitiumTest.Models;
using InitiumTest.Models.ViewsModels;
using InitiumTest.Utils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace InitiumTest.Functions
{
    /*
        Clase QueueFunctions
        Contiene las funciones que corresponden a colas
    */
    public class QueueFunctions
    {
        // Variable global para la función, donde maneja el context
        private readonly ApplicationDbContext _db;

        // Contructor para cargar la variable global _db
        public QueueFunctions(ApplicationDbContext db)
        {
            _db = db;
        }

        /*
            Function ResponseIdExceptionFunction
            Contiene asigna el turno al cliente
            @params ClientId ID del cliente previamente registrado
            @return 
        */
        public ResponseIdExceptionFunction TurnAsing (int ClientId)
        {
            // iniciamos el objeto a retornar
            ResponseIdExceptionFunction turnAsignResponse = new ResponseIdExceptionFunction();
            turnAsignResponse.Integer = 0;
            try
            {
                // Creamos el objeto de catálogo de colas
                QueueCat queueCat = new QueueCat();
                // Consultamos la cola que está más cerca
                Queue queue_closer = _db.Queue
                    .Where(
                        q => q.Processed == false && q.TurnAt < DateTime.Now
                    ).Include(q => q.QueueCat)
                    .OrderByDescending(o => o.Position)
                    .OrderBy(ob => ob.TurnAt)
                    .FirstOrDefault();
                // En caso de no existir consultamos directo del catálogo, con el menor tiempo de proceso
                if (queue_closer == null)
                {
                    queueCat = _db.QueueCat.OrderBy(o => o.QueueTime).FirstOrDefault();
                } 
                // Si existe una cola próxima, asignamos el objeto del query obtenido
                else
                {
                    queueCat = queue_closer.QueueCat;
                }
                // Creamos el objeto a guardar en la BD
                Queue newTurn = new Queue();
                /**
                 * Comenzamos a cargar de información que se va a registrar
                 */
                // Id correspondiente al catálogo que se va registrar
                newTurn.QueueId = queueCat.Id;
                // Id del cliente que viene como parámetro de la función
                newTurn.ClientId = ClientId;
                // Establecemos como procesado false
                newTurn.Processed = false;
                // Al turno asignado, aplicamos una triada, de existir una cola, agrega minutos desde el último turno, con la cola seleccionada, de lo contrario con DataTime.Now
                newTurn.TurnAt = queue_closer != null ? queue_closer.TurnAt.AddMinutes(queueCat.QueueTime) : DateTime.Now.AddMinutes(queueCat.QueueTime);
                // La posición cumple una triada, de existir una cola, le asigna la posición siguiente de lo contrario, inicia en 1
                newTurn.Position = queue_closer != null ? queue_closer.Position++ : 1;
                // Agregamos la cola
                _db.Queue.Add(newTurn);
                // Guardamos los cambios en la BD
                _db.SaveChanges();
                // Asignamos el valor entero que deseamos retornar
                turnAsignResponse.Integer = newTurn.Position;
            }
            // Capturamos la excepción
            catch (Exception e)
            {
                // Guardamos la excepción encontrada en un archivo log
                Log.LOG("CONTROLADOR: QueueFunctions, FUNCIÓN: TurnAsing(), PARÁMETROS: Client.Id = " + ClientId.ToString() + " ERROR: " + e.Message);
                turnAsignResponse.Exception = e.Message;
            }

            return turnAsignResponse;
        }
    }
}
