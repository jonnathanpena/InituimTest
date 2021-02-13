using InitiumTest.Models;
using InitiumTest.Models.ViewsModels;
using InitiumTest.Utils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
            @return ResponseIdExceptionFunction con intero y excepción en caso de existir
        */
        public ResponseIdExceptionFunction TurnAsing (int ClientId)
        {
            // iniciamos el objeto a retornar
            ResponseIdExceptionFunction turnAsignResponse = new ResponseIdExceptionFunction();
            turnAsignResponse.Integer = 0;
            DateTime now = DateTime.Now;
            Queue newTurn = new Queue();
            newTurn.ClientId = ClientId;
            newTurn.Processed = false;
            newTurn.CreatedAt = now;
            try
            {
                // Seteamos la posición uno másde la cantidad registrada para las colas
                newTurn.Position = _db.Queue.Count() + 1;
                turnAsignResponse.Integer = newTurn.Position;
                // Seleccionamos el catálogo de colas ordenado ascendente por el tiempo de demora
                List<QueueCat> catalogs = _db.QueueCat.OrderBy(ob => ob.QueueTime).ToList();

                // Consultamos las colas pendientes
                var activesQueues = this.activesQueues(_db);

                // Si no existe ninguna cola por procesar, seteamos por defecto la primera del catálogo y pasaría de inmediato
                if (activesQueues.Count == 0)
                {
                    newTurn.QueueId = catalogs[0].Id;
                    newTurn.TurnAt = now;
                }
                // En caso de existir consultamos agrupadamente `por el catálogo de colas
                else
                {
                    List<Queue> comparationTimes = new List<Queue>();
                    foreach (QueueCat cat in catalogs)
                    {
                        Queue query = activesQueues.Where(fd => fd.QueueId == cat.Id).OrderByDescending(obd => obd.TurnAt).FirstOrDefault();
                        Queue comparationTime = new Queue { Id = 0, ClientId = 0, CreatedAt = now, Position = 0, Processed = true, QueueId = query != null ? query.QueueId : cat.Id, TurnAt = query != null ? query.TurnAt.AddMinutes(cat.QueueTime) : now };
                        comparationTimes.Add(comparationTime);
                    }
                    Queue lastOne = comparationTimes.OrderBy(od => od.TurnAt).FirstOrDefault();
                    // En caso de que la última haya pasado antes de ahora, quiere decir que no hay nadie en cola y puede pasar de inmediato
                    if (lastOne.TurnAt < now)
                    {
                        newTurn.QueueId = catalogs[0].Id;
                        newTurn.TurnAt = now;
                    } 
                    // Caso contrario se le asigna una cola y tiempo para ser atendido
                    else
                    {
                        newTurn.QueueId = lastOne.QueueId;
                        newTurn.TurnAt = lastOne.TurnAt;
                    }
                }
                // Guardamos la información
                _db.Queue.Add(newTurn);
                _db.SaveChanges();
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

        /*
            Function activesQueues
            Consulta las colas pendientes o activas, ordenadas por el tiempo de atención descendiente
            @params db ApplicationDbContext para tener el vínculo con la BD y hacer la consulta
            @return List<Queue> una lista (entera o vacía) de colas pendientes
        */
        protected List<Queue> activesQueues(ApplicationDbContext db)
        {
            return db.Queue.Where(q => q.Processed == false).OrderByDescending(ob => ob.TurnAt).ToList();
        }

        /*
            Function queueProcessed
            Actualiza por medio del ID de la Tabal Queue, la cola como procesada
            @params Id, llave principal de la tabla Queue
            @return ResponseIdExceptionFunction con intero y excepción en caso de existir
        */
        public ResponseIdExceptionFunction queueProcessed(int Id)
        {
            // Reutilizamos el modelo de respuestas con entero, donde el valor 1 corresponde a OK, y el 0 a error
            ResponseIdExceptionFunction response = new ResponseIdExceptionFunction() { Exception = "", Integer = 1 };
            try
            {
                // Consultamos la cola por su ID
                Queue queue = _db.Queue.Find(Id);
                // Evaluamos (para prevenir fallos) que esa cola si exista, sino, reportamos como no encontrada
                if (queue == null)
                {
                    response.Exception = "Cola no encontrada con el ID " + Id.ToString();
                    response.Integer = 0;
                } 
                // Ya existente la editamos
                else
                {
                    queue.Processed = false;
                    _db.Update(queue);
                    _db.SaveChanges();
                }
            }
            // Capturamos la excepción
            catch (Exception e)
            {
                // Guardamos la excepción encontrada en un archivo log
                Log.LOG("CONTROLADOR: QueueFunctions, FUNCIÓN: queueProcessed(), PARÁMETROS: Queue.Id = " + Id.ToString() + " ERROR: " + e.Message);
                response.Exception = e.Message;
                response.Integer = 0;
            }

            return response;
        }

        /*
            Function queueList
            Consulta las lista de las últimas 2 pendientes, y un límite de 5 procesadas
            @return ApiResponse con success false y da error o true si va bien, errormessage quien indica el error (en caso de que aplique), y la data en caso de ser exitoso
        */
        public ApiResponse queueList()
        {
            ApiResponse apiResponse = new ApiResponse() { Success = true, ErrorMessage = "" };
            DateTime startDateTime = DateTime.Today;
            DateTime endDateTime = DateTime.Today.AddDays(1).AddTicks(-1);
            try
            {
                List<Queue> pendingQueues = _db.Queue.Where(q => q.Processed == false).OrderBy(ob => ob.Position).Include(i => i.QueueCat).Include(i => i.Client).Take(2).ToList();
                List<Queue> lastQueues = _db.Queue.Where(q => q.Processed == true && q.CreatedAt >= startDateTime && q.CreatedAt <= endDateTime).OrderBy(ob => ob.Position).Include(i => i.QueueCat).Include(i => i.Client).Take(5).ToList();
                pendingQueues.AddRange(lastQueues);
                apiResponse.Data = pendingQueues;
            }
            // Capturamos la excepción
            catch (Exception e)
            {
                // Guardamos la excepción encontrada en un archivo log
                Log.LOG("CONTROLADOR: QueueFunctions, FUNCIÓN: queueList(), ERROR: " + e.Message);
                apiResponse.ErrorMessage = e.Message;
                apiResponse.Success = false;
            }

            return apiResponse;
        }
    }
}
