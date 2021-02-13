using InitiumTest.Functions;
using InitiumTest.Models;
using InitiumTest.Models.ViewsModels;
using InitiumTest.Utils;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace InitiumTest.Controllers
{
    [Route("api/[controller]")]
    public class QueueController : Controller
    {
        // Variable global para la función, donde maneja el context
        private readonly ApplicationDbContext _db;
        // Cargamos variables privadas de las funciones que vamos a utilizar
        private QueueFunctions queueFunctions;
        private ClientFuntions clientFuntions;

        // Contructor para cargar la variable global _db
        public QueueController(ApplicationDbContext db)
        {
            _db = db;
        }

        /*
            Function GetTurn
            Contiene las funciones principales para registrar/editar un cliente y asignarle un turno
        */
        [HttpGet("[action]")]
        public IActionResult Init()
        {
            return Json("Hello");
        }

        /*
            Function GetTurn
            Contiene las funciones principales para registrar/editar un cliente y asignarle un turno
        */
        [HttpPost("[action]")]
        public IActionResult GetTurn([FromBody]Client client)
        {
            ApiResponse response = new ApiResponse();
            queueFunctions = new QueueFunctions(_db);
            clientFuntions = new ClientFuntions(_db);
            try
            {
                ResponseIdExceptionFunction clientResponse = clientFuntions.CreateOrUpdate(client);
                if (clientResponse.Integer > 0)
                {
                    ResponseIdExceptionFunction turnResponse = queueFunctions.TurnAsing(clientResponse.Integer);
                    if (turnResponse.Integer > 0)
                    {
                        response.Success = true;
                        response.Data = turnResponse.Integer;
                    }
                    else
                    {
                        response.Success = false;
                        response.ErrorMessage = turnResponse.Exception;
                    }
                }
                else
                {
                    response.Success = false;
                    response.ErrorMessage = clientResponse.Exception;
                }
            } catch (Exception e)
            {
                // Guardamos la excepción encontrada en un archivo log
                Log.LOG("CONTROLADOR: QueueFunctions, FUNCIÓN: TurnAsing(), PARÁMETROS: Client.Identification = " + client.ClientIdentification.ToString() + ", "+ client.ClientName.ToString() + " ERROR: " + e.Message);
                response.ErrorMessage = e.Message;
            }

            return Json(response);
        }
    }
}
